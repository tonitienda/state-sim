const server = require('http').createServer();

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

const InitialPopulation = 40000000
const birthRate = 372777 / InitialPopulation
const deathRate =  915.3 / 100000



let year = 2000;
// 1. listen for socket connections
io.on('connection', client => {

  let currentPopulation = InitialPopulation

  
  setInterval(() => {
    // 2. every second, emit a 'cpu' event to user
   
      const births = currentPopulation * birthRate
      const deaths = currentPopulation * deathRate
      currentPopulation += births - deaths
console.log({currentPopulation})
      client.emit('population', {
        name: year++,
        births,
        deaths,
        population: currentPopulation
      });
    
  }, 1000);
  
});

server.listen(3000);
