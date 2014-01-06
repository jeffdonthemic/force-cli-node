var  nforce = require("nforce"),
  Q = require("q"),
  request = require('request'),
  config = require("../config.js").config;

var org = nforce.createConnection({
    clientId: config.sfdc.client_id,
    clientSecret: config.sfdc.client_secret,
    redirectUri: 'http://localhost:3000/oauth/_callback',  
    environment: config.sfdc.environment,
    mode: 'multi' 
  });   

// authenticate to force.com and returns connection object
function login() {
  var deferred = Q.defer();
  org.authenticate({ username: config.sfdc.username, password: config.sfdc.password}, function(err, resp){
    if(!err) {
      console.log('Access Token: ' + resp.access_token);
      deferred.resolve(resp);
    } else {
      console.log('Error connecting to Salesforce: ' + err.message);
      deferred.reject(err);
    }
  });      
  return deferred.promise;
} 

// qeuries for 5 records by the specified sObject
function query(sobject) {

  login()
    .then(function(connection) {

      var q = 'select id, name from '+sobject+' limit 5';
      org.query(q, connection, function(err, resp){
        if(!err) {
          resp.records.forEach(function(item) {
            console.log(item.getId() + " -- " + item.Name);  
          });            
        } 
        if (err) console.log("ERROR: " + err.message); 
      });             

    });

}

// returns a specific record
function fetch(sobject, id) {

  login()
    .then(function(connection) {

      var record = nforce.createSObject(sobject, {id: id});

      org.getRecord(record, connection, function(err, resp){
        if(!err) console.log(resp.getId() + " -- " + resp.Name);  
        if (err) console.log("ERROR: " + err.message); 
      });             

    });

}

// inserts a new record for specified sObject (name field only)
function insert(sobject, name) {

  login()
    .then(function(connection) {

      var record = nforce.createSObject(sobject);
      record.name = name;

      org.insert(record, connection, function(err, resp){
        if(!err) console.log(resp);  
        if (err) console.log("ERROR: " + err.message); 
      });             

    });

}

// updates a specific record with a new name value
function update(sobject, id, newName) {

  login()
    .then(function(connection) {

      var record = nforce.createSObject(sobject, {id: id, name: newName});

      org.update(record, connection, function(err, resp){
        if(!err) console.log("Record updated.");  
        if (err) console.log("ERROR: " + err.message); 
      });             

    });

}

exports.login = login;
exports.query = query;
exports.fetch = fetch;
exports.insert = insert;
exports.update = update;