import {unlink} from 'fs';
import Bank from '../lib/bank';
import {vocabPath, bankPath} from './helpers/helper';

describe('Bank', () => {
  var bank;

  beforeEach(() => {
    bank = new Bank(vocabPath, bankPath);
  });

  it('persists', () => {
    bank.should.have.properties('bank', 'vocab');
    var cnt = bank.vocab.length;
    bank.bank.should.have.lengthOf(cnt);
    bank.bank[0].expire = Date.today();
    bank.update();
    bank = new Bank(vocabPath, bankPath);
    bank.should.have.property('bank').with.lengthOf(cnt);
    bank.bank[0].should.have.property('expire', Date.today());
  });

  it('picks a wordlist', () => {
    const cnt = 2;
    var list = bank.pickList(cnt);
    list.should.have.lengthOf(cnt);
  });

  it('picks all expired words and filters not expired', () => {
    const cnt = 2;
    bank.bank[0].expire = Date.today();
    bank.bank[1].expire = Date.tomorrow();
    var list = bank.pickList(cnt);
    list.should.have.lengthOf(cnt + 1);
    list.should.containEql(bank.bank[0]);
    list.should.not.containEql(bank.bank[1]);
  });

  afterEach((done) => {
    unlink(bankPath, () => done());
  });
});
