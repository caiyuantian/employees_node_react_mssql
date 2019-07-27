const Sequelize = require('sequelize');
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

module.exports = function(sequelize, DataTypes) {
  const Role =  sequelize.define('Role', {
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    RoleName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Role',
    timestamps: false
  });

  return Role;
};
