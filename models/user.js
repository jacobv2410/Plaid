// //var bcrypt = require("bcrypt");

// module.exports = function (sequelize, DataTypes) {
//   var User = sequelize.define('User', {
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     instanceMethods: {
//       generateHash(password){
//         return bcrypt.hash(password, bcrypt.genSaltSync(8));
//       },
//       validPassword(password){
//         return bcrypt.compare(password, this.password);
//       }
//     }
//   });

//   return User;
// }

//var bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING 
  });

  return User;
}