module.exports = function isIDUnique(email, model){
    debugger
    model.findOne({
        where: {email: email}
    }).then(function(r){
        //console.log(r);/
        if(r !== null){
            return true;
        }
        return false;
    })
}

//// search for attributes
// Project.findOne({ where: {title: 'aProject'} }).then(project => {
//     // project will be the first entry of the Projects table with the title 'aProject' || null
//   })