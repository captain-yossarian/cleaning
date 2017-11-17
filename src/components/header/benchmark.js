export function benchmark() {
  var buffer = new ArrayBuffer(1024 * 1024)
  var view = new Uint8Array(buffer) // view the buffer as bytes
  var numPrimes = 0;

  console.log('test start')
  for (var i = 0; i < view.length; i++) {
    var primeCandidate = i + 2; // 2 is the smalles prime number
    var result = isPrime(primeCandidate);
    if (result)
      numPrimes++;
    view[i] = result;
  }
  console.log('test end');
}


export function isPrime(candidate) {
  for (var n = 2; n <= Math.floor(Math.sqrt(candidate)); n++) {
    if (candidate % n === 0) {
      return false;
    }
  }
  return true
}
