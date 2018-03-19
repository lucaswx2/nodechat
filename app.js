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
        console.log('msgParaServidor running...' );
        console.log(data);
        socket.emit('msgParaCliente',{apelido:data.apelido,mensagem: data.mensagem});
        socket.broadcast.emit('msgParaCliente',{apelido:data.apelido,mensagem: data.mensagem});


        if(parseInt(data.statusLogin) == 0){
            socket.emit('participantesParaCliente',{apelido:data.apelido});
            socket.broadcast.emit('participantesParaCliente',{apelido:data.apelido});
        }
       
    })
    

    
});