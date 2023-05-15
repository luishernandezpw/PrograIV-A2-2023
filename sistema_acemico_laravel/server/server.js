const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    port = 3001;
app.use(express.json());
app.get('/', (req, resp)=>{
    resp.sendFile(__dirname + '/index.html');
});
app.post('/usuarios/guardar', (req, resp)=>{
    console.log(req.body);
    resp.send(req.body);
});

http.listen(port,event=>{
    console.log('Servidor escuchando en el puerto ', port);
});
