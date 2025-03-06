"use strict";

exports.post = async (req, res, next) => {          
    res.status(201).send(req.body);
}

exports.put = async (req, res, next) => {   
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body,
        message: `o usuário com id ${id} foi atualizado com sucesso!`
    });
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        message: `o usuário com id ${id} foi excluído com sucesso!`
    });
}

exports.get = async (req, res, next) => {
    res.status(200).send(req.body);
}

exports.getById = async (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body,
        message: `o usuário com id ${id} foi encontrado com sucesso!`
    });
}   

exports.postLogin = async (req, res, next) => {
    res.status(201).send(req.body);
}

exports.postRefreshToken = async (req, res, next) => {
    res.status(201).send(req.body);
}

