import {unlink} from 'fs';
import should from 'should';
import Recitus from '../lib/recitus';
import {random} from '../lib/util';
import {vocabPath, bankPath} from './helpers/helper';

describe('recitus', () => {
  it('combines everything', () => {
    var recitus = new Recitus(vocabPath, bankPath);
    recitus.start();
    var list = recitus.list.list;
    while (!recitus.empty()) {
      var word = recitus.pick();
      word.should.have.properties('q', 'a');
      var q = random(0, 6);
      recitus.update(q);
    }
    for (let word of list) {
      should.exist(word.expire);
    }
    recitus.stop();
  });

  afterEach((done) => {
    unlink(bankPath, () => done());
  });
});
