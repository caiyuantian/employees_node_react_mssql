const Role = require('../models').Role;

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        let result1 = Role.build(req.body);
        result = await result1.save();
        //let Role = await Role.create(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getAll = async (req, res) => {
    var result;
    try {
        result = await Role.findAll();
        res.status(200).send(result);
    } catch (error) {
        console.log(result);
        res.status(400).send(error);
    }
}

exports.getOne = async (req, res) => {
    try {
        let result = await Role.findAll({
            where: { RoleID: req.params.id }, limit: 1
        });
        res.status(200).send(result[0]);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.update = async (req, res) => {
    try {
        let result = await Role.findAll({ where: { RoleID: req.params.id } });
        if (!result) {
            return res.status(404).send({ message: 'Role not found', });
        }
        try {
            result = await Role.update(req.body, {where: { RoleID: req.params.id }});
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error);
        }

    } catch (error) {
        res.status(400).send(error);
    }
}

exports.destroy = async (req, res) => {
    try {
        let result = await Role.findAll({ where: { RoleID: req.params.id } });
        if (!result) {
            return res.status(404).send({ message: 'Role not found', });
        }
        try {
            result = await Role.destroy({ where: { RoleID: req.params.id } });
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}