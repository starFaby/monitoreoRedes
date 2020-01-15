const db = require('./conexion.js');
const moment = require('moment');
const informeModel = function(){};

informeModel.guardar=function(nombre ,velocidad,medida,hora,callback){
    const data = {
        nombre:nombre,
        velocidad:velocidad,
        medida:medida,
        hora:moment().format('LTS')
    }
    console.log(data);
    return db.query('INSERT INTO informe SET ?',data,callback);
}


informeModel.consulta=function(nombreIP,callback){
    return db.query('SELECT * FROM informe WHERE nombre=?',nombreIP,callback);
}
module.exports = informeModel;
