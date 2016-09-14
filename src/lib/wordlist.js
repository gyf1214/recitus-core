import {sample} from './util';
import {newEF, newI} from './config';

export default class Wordlist {
  constructor(list) {
    this.list = list;
  }

  pick() {
    this.current = sample(this.list, 1)[0];
    return this.current;
  }

  update(q) {
    var cur = this.current;
    cur.ef = newEF(cur.ef, q);
    if (q < 3) {
      cur.i = 1;
    } else {
      cur.i = newI(cur.i, cur.ef);
    }
    if (q <= 3) {
      this.list.push(cur);
    } else {
      cur.expire = Date.today().addDays(cur.i);
    }
  }

  empty() {
    return this.list.length > 0;
  }
}
