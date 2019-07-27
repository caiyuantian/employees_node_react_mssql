const Employee = require('../models').Employee;
const Role = require('../models').Role;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        let result1 = Employee.build(req.body);
        result = await result1.save();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getAll = async (req, res) => {
    console.log(req.query);
    let pageSize = 5,
        pageNo = 1,
        offset = 0,
        orderby = null,
        whereObj = {},
        whereArr = [];
    if (Object.keys(req.query).length !== 0) {
        if(!!req.query.pageSize) {
            pageSize = parseInt(req.query.pageSize)
        }
        if(!!req.query.pageNo) {
            pageNo = parseInt(req.query.pageNo)
        }

        offset = (pageNo - 1) * pageSize;
        if (!!req.query.orderby) {
            orderby = [[req.query.orderby, 'ASC']];
            if (req.query.orderby === 'employeeName') {
                orderby = [['FirstName', 'ASC'],
                ['LastName', 'ASC']];
            }

            if (req.query.orderby === 'RoleName') {
                orderby = [[Role, 'RoleName', 'ASC']];
            }
        }

        if(!!req.query.employeeName) {
            whereArr.push (
                Sequelize.where(Sequelize.fn("concat", Sequelize.col("FirstName"), ' ', Sequelize.col("LastName")), {
                    [Op.like]: '%'+req.query.employeeName+'%'
                }) );
        }
        
        if(!!req.query.EmployeeNumber) {
            
            whereArr.push(Sequelize.where(Sequelize.cast(Sequelize.col('EmployeeNumber'), 'varchar'), {
                [Op.like]: '%'+req.query.EmployeeNumber+'%'}))
            //whereArr.push({EmployeeNumber: req.query.EmployeeNumber})
        }
        if(!!req.query.Extension) {
            whereArr.push(Sequelize.where(Sequelize.cast(Sequelize.col('Extension'), 'varchar'), {
                [Op.like]: '%'+req.query.Extension+'%'}))
            //whereArr.push({Extension: req.query.Extension})
        }
        if(!!req.query.DateJoined) {
            whereArr.push(Sequelize.where(Sequelize.cast(Sequelize.col('DateJoined'), 'varchar'), {
                [Op.like]: '%'+req.query.DateJoined+'%'}))
            //whereArr.push({DateJoined: req.query.DateJoined})
        }
        if(!!req.query.RoleName) {
            whereArr.push(Sequelize.where(Sequelize.col('Role.RoleName'), {
                [Op.like]: '%'+req.query.RoleName+'%'}))
            //whereArr.push({RoleName: req.query.RoleName})
        }
    }


    if(whereArr.length > 0) {
        whereObj = {
            [Op.and]: whereArr
        }
    }

    try {
        let count = await Employee.count({
            include: [{ model: Role, attributes: ['RoleID', 'RoleName'], as: 'Role' }],
            where: whereObj
        })
        if (count < offset) {
            pageNo = Math.ceil(count / pageSize);
            offset = Math.floor(count / pageSize);
        }
        let employees = await Employee.findAll({
            attributes: ['EmployeeID', 'EmployeeNumber', 'FirstName', 'LastName', 'DateJoined', 'Extension', 'RoleID', 
            //[Sequelize.fn('concat', Sequelize.col('FirstName'), ' ', Sequelize.col('LastName')), 'employeeName']
        ],
            include: [{ model: Role, attributes: ['RoleID', 'RoleName'], as: 'Role' }],
            limit: pageSize, offset: offset, subQuery: false, order: orderby, raw: true,
            where: whereObj
        });


        res.status(200).send({ employees: employees, pageInfo: { count: count, pageSize: pageSize, pageNo: pageNo } });
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getOne = async (req, res) => {
    try {
        let result = await Employee.findAll({
            include: [{ model: Role, attributes: ['RoleID', 'RoleName'] }],
            where: { EmployeeID: req.params.id }, limit: 1
        });
        res.status(200).send(result[0]);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.update = async (req, res) => {
    //console.log(JSON.stringify(req.body));
    try {
        let result = await Employee.findAll({ where: { EmployeeID: parseInt(req.params.id) } });
        if (!result) {
            return res.status(404).send({ message: 'Employee not found', });
        }
        try {
            result = await Employee.update(req.body, { where: { EmployeeID: parseInt(req.params.id) } });
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
        let result = await Employee.findAll({ where: { EmployeeID: req.params.id } });
        if (!result) {
            return res.status(404).send({ message: 'Employee not found', });
        }
        try {
            result = await Employee.destroy({ where: { EmployeeID: req.params.id } });
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}