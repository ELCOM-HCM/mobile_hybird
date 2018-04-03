const connect = require('./connection');
const assert = require('assert');
const Database = function(){
	this.insertUsers = function(callback){
		connect.getConnection(function(db){
			// Get the documents collection
			var collection = db.collection('users');
			 // Insert some documents
			collection.insertMany(
			 [{
				  "fullname": "Trần Minh Đang",
				  "username": "dangtm",
				  "password":"321",
				  "avatar": "",
				  "role":"",
				  "logo":"",
				  "date": new Date()
				}]
			).then(function(result){
				callback(result);
			})
		});
	}
	this.insertUser = function(userObject, callback){
		connect.getConnection(function(db){
			// Get the documents collection
			var collection = db.collection('users');
			 // Insert some documents
			collection.insertOne({
				  "fullname": userObject.fullname,
				  "username": userObject.username,
				  "password":userObject.password,
				  "avatar": userObject.avatar,
				  "role": userObject.role,
				  "logo": userObject.logo,
				  "date": new Date()
				}).then(function(result){
				callback(result);
			})
		});
	}
	this.findUser = function(username, password, callback){
		connect.getConnection(function(db){
			// Get the documents collection
			var collection = db.collection('users');
			collection.find({
				$and:[{'username':{'$eq': username}}, {'password':{'$eq': password}}]
			}).toArray(function(err, result) {
				assert.equal(err, null);
				console.dir(result);
				callback(result);
			});;
			
		});
	}
	this.deleteUsers = function(callback){
		connect.getConnection(function(db){
			// Get the documents collection
			var collection = db.collection('users');
			// Insert some documents
			collection.deleteMany({}).then(function(result) {
				callback(result);
			});
		});
	}
}
module.exports = new Database();