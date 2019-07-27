const Sequelize = require('sequelize');
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};


module.exports = function(sequelize, DataTypes) {
  const Employee =  sequelize.define('Employee', {
    EmployeeID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EmployeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DateJoined: {
      type: "SMALLDATETIME",
      defaultValue: new Date().toISOString().slice(0, 19).replace('T', ' '),
      allowNull: false
    },
    Extension: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Role',
        key: 'RoleID'
      }
    }
  }, {
    tableName: 'Employee',
    timestamps: false
  });

  
  Employee.associate = function (models) {
    Employee.belongsTo(models.Role, {foreignKey: 'RoleID', targetKey:'RoleID'});
  };

  return Employee;
};
