module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    //confirm: DataTypes.BOOLEAN
  });

  return User;
}