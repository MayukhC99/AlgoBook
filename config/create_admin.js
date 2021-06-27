const users = require('../server/models/users').users;

function create_admin(){
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};

    users.findOneAndUpdate({"username" : "admin"},{
        username: "admin",
        password: "9433250196",
        first_name: "Admin",
        last_name: "Admin",
        email_id: "mayukhchakrabarti@yahoo.com"
    },
    options,
    function(err,docs){
        if(err){
            console.log("The error is: ")
            console.error(err);
            return;
        }
        else 
            return docs;
    })
}


module.exports = {
    create_admin
}
