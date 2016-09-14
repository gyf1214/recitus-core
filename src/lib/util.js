export function random(i, j) {
  return i + Math.floor((j - i) * Math.random());
}

export function sample(arr, n = 1) {
  var ret = [];
  for (--n; n >= 0 && arr.length > 0; --n) {
    var i = random(0, arr.length);
    ret.push(arr.splice(i, 1)[0]);
  }
  return ret;
}
