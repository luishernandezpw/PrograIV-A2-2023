const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http, {
        allowEIO3: true,
        cors:{
            origin: ['http://localhost:8000'],
            credential:true,
        }
    }),
    { MongoClient } = require('mongodb'),
    url = 'mongodb://127.0.0.1:27017',
    client = new MongoClient(url),
    dbname = 'chatUGB';
    port = 3001;
app.use(express.json());

async function conectarMongoDb(){
    await client.connect();
    return client.db(dbname);
}
io.on('connect', socket=>{
    console.log('Chat conectado...');

    socket.on('chat', async chat=>{
        let db = await conectarMongoDb(),
            collection = db.collection('chat');
        collection.insertOne(chat);
        socket.broadcast.emit('chat', chat); //envia todos menos a mi..., es decir a los demas.
    });
    socket.on('historial', async ()=>{
        let db = await conectarMongoDb(),
            collection = db.collection('chat'),
            chats = await collection.find().toArray();
        socket.emit('historial', chats); //se envia solo a mi...
    });
});

app.get('/', (req, resp)=>{
    resp.sendFile(__dirname + '/index.html');
});
app.get('/usuarios/listar', async (req, resp) => {
    let db = await conectarMongoDb(),
        collection = db.collection('usuarios'),
        usuarios = await collection.find().toArray();
    resp.send(usuarios);
});
app.post('/usuarios/guardar', async(req, resp)=>{
    let db = await conectarMongoDb(),
        collection = db.collection('usuarios');
    collection.insertOne(req.body);
    console.log(req.body);
    resp.send(req.body);
});

http.listen(port,event=>{
    console.log('Servidor escuchando en el puerto ', port);
});
