import {writeFileSync, readFileSync, existsSync} from 'fs';
import 'date-utils';
import {algo} from './config';
import {sample} from './util';

export default class Bank {
  constructor(vocabPath, bankPath) {
    this.bankPath = bankPath;
    this.vocab = JSON.parse(readFileSync(vocabPath));
    if (existsSync(bankPath)) {
      this.bank = JSON.parse(readFileSync(bankPath));
      for (let k = 0; k < this.bank.length; ++k) {
        if (this.bank[k].expire) {
          this.bank[k].expire = new Date(this.bank[k].expire);
        }
      }
    } else {
      this.bank = [];
      for (let k = 0; k < this.vocab.length; ++k) {
        this.bank.push({index: k, ef: algo.defaultEF, i: algo.defaultI});
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
    writeFileSync(this.bankPath, JSON.stringify(this.bank));
  }
}
