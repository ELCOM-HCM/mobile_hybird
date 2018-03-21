const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/portal';
const dbName = 'esmile_portal';

function Connection() {
	var connect = null;
	var db = null;
	this.getConnection = function(callback){
		// Use connect method to connect to the server
		if(db != null){
			callback(db);
			return;
		}
		MongoClient.connect(url, function(err, client) {
		  assert.equal(null, err);
		  console.log("Connected successfully to server");
		  db = client.db(dbName);
		  connect = client;
		  callback(db);
		});
	}
	this.closeConnection = function(){
		if(connect != null){
			connect.close();
		}
	}
}
module.exports = new Connection();