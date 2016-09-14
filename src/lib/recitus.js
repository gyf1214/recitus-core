import Bank from './bank';
import Wordlist from './wordlist';
import {delta} from './config';

export default class Recitus {
  constructor(vocabPath, bankPath) {
    this.bank = new Bank(vocabPath, bankPath);
  }

  start() {
    var list = this.bank.pickList(delta);
    this.list = new Wordlist(list);
  }

  empty() {
    return this.list.empty();
  }

  pick() {
    var cur = this.list.pick();
    return this.bank.vocab[cur.index];
  }

  update(q) {
    this.list.update(q);
  }

  stop() {
    this.bank.update();
  }
}
