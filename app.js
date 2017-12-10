var schedule = require('node-schedule');
var server = require('./server-list.js');
var ping = require ("net-ping");
var notif = require('./fcm.js');

//
var j = schedule.scheduleJob('00 * * * * *', function(){


	server.getServerLists(function(serverLists){
		var session = ping.createSession ();

		let length = serverLists.length;
		for(let i = 0; i<length; i++)
		{

			session.pingHost (serverLists[i].IPAddress, function (error, target) {
			    if (error)
			    {
			        console.log (target + ": " + error.toString ());
			    	if(serverLists[i].IsActive)
			    	{
			    		server.updateServerStatus(function(adminLists){
		    				let adminLength = adminLists.length;
		    				for(let j = 0; j<adminLength; j++)
		    				{
		    					console.log("ADMIN => " + adminLists[j].Name + " TOKEN => " + adminLists[j].FirebaseToken);
		    					notif.sendNotifications(false, adminLists[j].FirebaseToken, serverLists[i].IPAddress);
		    				}
			    		}, serverLists[i].Id, false);
			    	}
			    }
			    else{
			        console.log (target + ": Alive");
			    	if(!serverLists[i].IsActive)
			    	{
			    		server.updateServerStatus(function(adminLists){
		    				let adminLength = adminLists.length;
			    			for(let j = 0; j<adminLength; j++)
		    				{
		    					console.log("ADMIN => " + adminLists[j].Name + " TOKEN => " + adminLists[j].FirebaseToken);
		    					notif.sendNotifications(true, adminLists[j].FirebaseToken, serverLists[i].IPAddress);
		    				}
			    		}, serverLists[i].Id, true);
			    	}
			    }
			});
		}
	});

});


