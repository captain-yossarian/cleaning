import {benchmark} from './benchmark.js';
import {Map,List} from 'immutable';

onmessage = (msg) => {
  console.log('Worker received message',msg)
  var start = performance.now()
  var next = msg.data[0].map((elem, index) => elem + index)

  var end = performance.now() - start
  postMessage([next,start])
  console.log('Worker send back message to main script')
 //benchmark()
}
