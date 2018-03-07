let app = require('./config/server');

let server = app.listen(80,()=>{
    console.log('Servidor Rodando...');
});

var io = require('socket.io').listen(server);

app.set('io',io);

io.on('connection',(socket)=>{
    socket.emit('conectou',{});
    socket.on('disconnect',()=>{
        console.log('O usuário desconectou');
    });

    socket.on('msgParaServidor',(data)=>{
        
        io.emit('msgParaCliente',{apelido:data.apelido,mensagem: data.mensagem});
    })
    

    
});