"use strict";

exports.post = async (req, res, next) => {  
    res.status(201).send(req.body);
}

exports.put = async (req, res, next) => {  
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body,
        message: `O Usuário com id ${id}  foi atualizado com sucesso!`
    });
}

exports.delete = async (req, res, next) => {    
    const id = req.params.id;
    res.status(200).send({
        message: ` O Usuário com id ${id} foi excluído com sucesso!`
    });
}
