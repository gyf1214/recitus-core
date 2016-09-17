import Bank from '../lib/bank';
import Wordlist from '../lib/wordlist';
import {newEF, newI} from '../lib/config';
import {random} from '../lib/util';
import {vocabPath} from './helpers/helper';

describe('Wordlist', () => {
  var bank = new Bank(vocabPath);
  var list;
  var word;
  const cnt = 5;

  beforeEach(() => {
    list = new Wordlist(bank.pickList(cnt));
    word = list.pick();
  });

  it('picks a word at random', () => {
    word.should.have.properties('index', 'ef', 'i');
    list.list.should.not.containEql(word);
  });

  it('updates ef', () => {
    var q = random(0, 6);
    var ef = word.ef;
    list.update(q);
    word.should.have.property('ef', newEF(ef, q));
  });

  it('put back word with q <= 3', () => {
    var q = random(0, 4);
    list.update(q);
    list.list.should.containEql(word);
  });

  it('remove the word and update i & expire with q > 3', () => {
    var q = random(4, 6);
    var i = word.i;
    list.update(q);
    list.list.should.not.containEql(word);
    word.should.have.property('i', newI(i, word.ef));
    word.should.have.property('expire', Date.today().addDays(Math.round(word.i)));
  });

  it('reset i to 1 with q < 3', () => {
    word.i = 10;
    var q = random(0, 3);
    list.update(q);
    word.should.have.property('i', 1);
  });
});
