module.exports = function (sequelize, DataType) {
  var Users = sequelize.define('Users', {
    Users_name: DataType.STRING,
    devoured: DataType.BOOLEAN
  })
  return Users
}