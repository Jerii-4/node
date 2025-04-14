const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2;
setTimeout(() => console.log('timer 1 finished'), 0);
setImmediate(() => console.log('immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('i/o finished');

  setTimeout(() => console.log('timer 2 finished'), 0);
  setTimeout(() => console.log('timer 3 finished'), 3000);
  setImmediate(() => console.log('immediate 2 finished'));

  process.nextTick(() => console.log('Processing.nextTick'));

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'encrypted');
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'encrypted');

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'encrypted');
});
console.log('from topcode');
