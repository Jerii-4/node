const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmiter = new Sales();
myEmiter.on('new sale', () => {
  console.log('sale done');
});

myEmiter.on('new sale', () => {
  console.log('customer name jonas');
});

myEmiter.on('new sale', (stock) => {
  console.log(`there is ${stock} left in stock`);
});

myEmiter.emit('new sale', 9);

const server = http.createServer();
server.on('request', (req, res) => {
  console.log('recieved');
  console.log(req.url);
  res.end('recieved');
});
server.on('request', (req, res) => {
  console.log('recieved');
});
server.on('close', () => {
  console.log('closed');
});
server.listen(8000, '127.0.0.1', () => {
  console.log('waiting...');
});
