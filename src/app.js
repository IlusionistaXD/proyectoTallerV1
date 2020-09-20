const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require ('mysql');
const myConnection = require('express-myconnection');
const app = express();
const fs = require('fs-extra');
const SocketIO = require('socket.io');
const {spawn} = require('child_process');
//Importando rutas
const rutas = require('./routes/rutas');
const moment = require('moment');

//Configuraciones express----------------------------------------
app.set('port', process.env.PORT || 3000); //Define el puerto del server
app.set('view engine', 'ejs'); //usaremos un motor de plantillas
app.set('views', path.join(__dirname, 'views'));// carpeta donde estaran las vistas

//MIDDELWARES----------------------------------------------------
//Con este middelware podremos monitorear peticiones http
app.use(morgan('dev'));

//----------------
app.locals.moment = moment; // this makes moment available as a variable in every EJS page

//con esta funxion, ahora los objetos "req" en las peticiones 
//tendran un nuevo metodo mas llamado myConnection
//Esto solo nos ayudara cuando trabajemps con las peticiones HTTP
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'personal'
}, 'single'));
//usaremos otro middleware nos permitira tener el
//metodo "body" en el "req" que tendre los datos del formulario
app.use(express.urlencoded({extended: false}));
//rutas
app.use('/', rutas);

//Archivos estaticos------------------------------------------
app.use("/css", express.static(path.join(__dirname + "/css")));
app.use("/scripts", express.static(path.join(__dirname + "/scripts")));
app.use("/images", express.static(path.join(__dirname + "/images")));
app.use("/models", express.static(path.join(__dirname + "/models")));

//Iniciando el servidor----------------------------------------
const server = app.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto 3000');
});

//inicializamos los sockets--------------------------------------
const io = SocketIO(server);

function borrarMuestras(){
        //Eliminamos anteriores Imagenes y luego reemplazamos
        // With Promises:
        const pathM = path.join(__dirname, 'images', data.nameM);
        fs.remove(pathM)
        .then(() => {
        console.log('success!');
        })
        .catch(err => {
        console.error(err)
        })
}

//inicializamos una conexion-------------------------------------
io.on('connection', (socket)=>{
    console.log('Hay una nueva Conexion! ' + socket.id);

    //escuchamos la orden de capturar las fotos para el dataset
    socket.on('obtenerDataset', (data)=>{
        const pathImg = path.join(__dirname, 'images', data.FotoID);
        fs.ensureDirSync(pathImg);

        console.log(pathImg);
        const idObtein = data.FotoID;
        console.log(idObtein);
        
        
        const python = spawn('python3', ['dataset.py', idObtein,'python']);

        python.on('close', (code) => {
            console.log('El dataset para el usuario ' +  idObtein + ' se ha creado con exito');
        });
        
    });

    //escuchamos la orden para Capturar fotos para el registro
    socket.on('obtenerFotosRegistro', (data)=>{

        const pathImg = path.join(__dirname, 'images', data.nameM);
        fs.ensureDirSync(pathImg);
        console.log('empezando a sacar muestras');
        
        const python = spawn('python3', ['muestra.py', data.nameM,'python']);

        python.on('close', (code) => {
            console.log('Las muestras para el login se tomaron satisfactoriamente');
            io.to(socket.id).emit('obtenerResultado');
        });
        
    });

    //Damos la orden de reemplzar los archivos model.son
    socket.on('reemplazar', (data)=>{
        console.log('Reemplazar archivos!!!!');

        //Borrar model anterior
        fs.remove('/models/model.json', err => {
            if (err) return console.error(err)
            console.log('success!')
        })

        fs.remove('/models/model.weights.bin', err => {
            if (err) return console.error(err)
            console.log('success!')
        })
        //Movemos el nuevo modelo
    });
});








