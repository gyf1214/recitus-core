import {writeFileSync, readFileSync, existsSync} from 'fs';
import {defaultEF, defaultI} from './config';
import {sample} from './util';

export class Bank {
  constructor(vocabPath, bankPath) {
    this.bankPath = bankPath;
    this.vocab = JSON.parse(readFileSync(vocabPath));
    if (existsSync(bankPath)) {
      this.bank = JSON.parse(readFileSync(bankPath));
    } else {
      for (var k = 0; k < vocabPath.length; ++k) {
        this.bank.push({index: k, ef: defaultEF, i: defaultI});
      }
    }
  }

  pickList(delta) {
    var ret = [];
    var other = [];
    for (var word of this.bank) {
      if (word.expire && word.expire <= Date.today()) {
        ret.push(word);
      } else if (!word.expire) {
        other.push(word);
      }
    }
    Array.prototype.push.apply(ret, sample(other, delta));
    return ret;
  }

  update() {
    writeFileSync(this.bankPath, JSON.stringify(this.Bank));
  }
}
