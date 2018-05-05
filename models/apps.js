module.exports = function (sequelize, DataType) {
  var Burger = sequelize.define('Burger', {
    burger_name: DataType.STRING,
    devoured: DataType.BOOLEAN
  })
  return Burger
}