var express = require('express');
var router = express.Router();
const exec = require('child_process').exec;
const { spawn } = require('child_process');
const informeModel = require('../model/monitoreo');
var pingResults = null;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ip-conectadas', function(req, res, next) {
  const ls = spawn('arp', ['-a']);

  ls.stdout.on('data', (data) => {

    //let details= `${data}`;
   
    let details= `${data}`;
    console.log(details);
    //let part = details.replace(/\D/g,'');
    let part = details;
    //console.log(part);
    console.log(part);
    res.status(200).json({ips: JSON.stringify(part)})
   });
});

function guardarRegsitro(nombre,velocidad,medida){
    informeModel.guardar(nombre,velocidad,medida,function(err,result){
      if(err){
          console.log('no se guardo los datos');
      } else{
        console.log('datos guardados',result);
      }
    })
}


var pinger = function(hostaddr,callback) {    
  let pingstat = '';
  const child = exec('ping ' + hostaddr + ' -l 2000 -n 1',
  (error, stdout, stderr) => {
      if (error !== null) {
          pingstat = "ERROR";
      } else {
          pingstat = stdout;
      }
      callback (pingstat);   
  });
}

router.get('/informe',function(req,res){
    nombreIP=[req.query.nombreIP]
    console.log(nombreIP);
    informeModel.consulta(nombreIP,function(err,result){
        if(err){
            console.log('error al recibir datos');
        }else{
            console.log(result);
            res.status(200).json({datos:result});
        }
    })
});


router.get('/ping',  function(req, res, next) {
  hostaddr = [req.query.ip];
  console.log(hostaddr);
  var medida = '';
  pinger(hostaddr, function(results) {
     
      if (results == 'ERROR'){
          medida = 'bps';
         // res.end(JSON.stringify({ab: '0 bps'}));
         console.log('La velocidad es: ', toReturn)
         guardarRegsitro(hostaddr,0,medida);
          res.status(200).json({velocidad: 0 , medida: medida})
      }else{
          console.log(results);
          tiempo = results.split('tiempo=')[1].split('ms')[0];
          console.log('el tiempo es: ', tiempo)
          bits = 16000;
          ab = bits*1000/tiempo;
          ab = ab.toFixed(2);
          medida = 'bps';
          //toReturn = ab + ' bps';
          toReturn = ab ;
          if(ab>1024){
              ab = ab/1024;
              ab = ab.toFixed(2);
              medida = 'kbps'
              //toReturn = ab + ' Kbps';
              toReturn = ab ;
          }
          if(ab>1024){
              ab = ab/1024;
              ab = ab.toFixed(2);
              //toReturn = ab + ' Mbps';
              medida = 'Mbps'
              toReturn = ab;
          }
         // res.end(JSON.stringify({ab: toReturn}));
         console.log('La velocidad es: ', toReturn)
         guardarRegsitro(hostaddr,parseFloat(toReturn),medida);
          res.status(200).json({velocidad: parseFloat(toReturn), medida: medida})
      }
  });
});



module.exports = router;
