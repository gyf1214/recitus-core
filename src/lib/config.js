export var algo = {
  maxEF: 2.5,
  minEF: 1.3,
  defaultEF: 2.5,
  defaultI: 1
};

export function newEF(ef, q) {
  var ret = ef - 0.8 + 0.28 * q - 0.02 * q * q;
  ret = ret <= algo.maxEF ? ret : algo.maxEF;
  ret = ret >= algo.minEF ? ret : algo.minEF;
  return ret;
}

export function newI(i, ef) {
  return i * ef;
}
