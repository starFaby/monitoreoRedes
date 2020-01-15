// On Windows Only ...
const { spawn } = require('child_process');
const bat = spawn('ping', ['192.168.1.1', '-t']);

bat.stdout.on('data', (data) => {
  let datos= data.toString();
  let salida=datos.length;
  console.log(salida);
});

