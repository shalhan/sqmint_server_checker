var sql = require('mssql');
var emitter = require('events');

var config = {
	user: 'sa',
	password: 'sukaati',
	server: 'shalhan',
	database: 'MSSQLScreen'
};


module.exports = {
	getServerLists: function(callback){
		let serverLists;
		console.log("ACCESSING SERVER DB");
		sql.connect(config, function (err) {

		    if (err) console.log(err);

		    // create Request object
		    var request = new sql.Request();

		    // query to the database and get the records
		    request.query('select * from dbo.ServerLists', function (err, recordset) {

		        if (err) console.log(err)

		        // send records as a response
		    	serverLists = recordset.recordset;
				callback(serverLists);  
				sql.close();  	
		    });
		});
	},

	updateServerStatus: function(callback, id, status){
		console.log("SERVER ID =>  " + id + "  => " + status);
		sql.connect(config, function (err) {

		    if (err) console.log(err);

		    // create Request object
		    var request = new sql.Request();

		    // query to the database and get the records
		    request.query("update dbo.ServerLists set IsActive = '" + status + "' where id = " + id, function (err, recordset) {
		        if (err) console.log(err)
		        // send records as a response
			    request.query("select * from dbo.AdminAccounts", function (err, recordset) {
			    	 if (err) console.log(err)

			        // send records as a response
			    	adminLists = recordset.recordset;
					callback(adminLists);  
					sql.close(); 
			    });
		    });
		    
		});
	}
};