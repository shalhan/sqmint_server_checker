var FCM = require('fcm-node')
    
var fcm = new FCM("AAAAOt710yc:APA91bHhdfIC80ImxOj6ZG8TNT0XY7LKNCgscwT9yMv4CiU4y2S4gcARScIdki9lV1Kl_OQruXnQxZz71YHplGHq0j3vXh1IjlJFgaTGXyWt10vuJvHGYOUNGJscrFmxHokyQz6_NIv9");

module.exports = {

    sendNotifications: function(status, token, ipaddress)
    {
        let title;
        let body;
        if(status)
        {
            title = "Server is good";
            body = "Server " + ipaddress + " has been in a good condition. Keep it up";
        }
        else
        {
            title = "Server have some trouble";
            body = "Server " + ipaddress + " has down. Check the server immediately";
        }



        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: token, 
            // collapse_key: '',
            
            notification: {
                title: title, 
                body: body 
            },
            
            // data: {  //you can send only notification or only data(or include both)
            //     my_key: '',
            //     my_another_key: ''
            // }
        }

        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!")
            } else {
                console.log("Successfully sent with response: ", response)
            }
        })        
    }
};