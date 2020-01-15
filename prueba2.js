const { spawn } = require('child_process');
const grep = spawn('ping', ['192.168.1.1']);

console.log(`Spawned child pid: ${grep.pid}`);
grep.stdin.end();