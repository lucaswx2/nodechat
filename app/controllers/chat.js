module.exports.iniciaChat = (application,req,res) =>{
    let dadosForm = req.body;
    
    req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len(3,15);

    let errors = req.validationErrors();
    console.log(errors);
    if(errors){
        res.render('index',{validacao:errors})
        return;
    }
    
    application.get('io').emit('conectado',{apelido:dadosForm.apelido,mensagem: 'Conectou ao chat'});

    res.render('chat',{dadosForm:dadosForm});
}

module.exports.enviaMsg = (application,req,res)=>{
    let dadosMsg = req.body;

    application.get('io').emit('novaMsg',{apelido:dadosMsg.apelido,mensagem: dadosMsg.mensagem});
}