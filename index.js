const { spawn } = require('child_process');
const ls = spawn('ping', ['192.168.1.6','-t']);

ls.stdout.on('data', (data) => {

 //let details= `${data}`;
 let details= `${data}`;
 //let part = details.replace(/\D/g,'');
 let part = details;
 //console.log(part);
 console.log(part);
 
});
