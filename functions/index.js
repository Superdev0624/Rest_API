const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require("express");
const bodyParser = require("body-parser");
const sdk = require('api')('@onsched/v1.0#1sd3skrh87mn3');
//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();
const main = express();
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
const authtoken = "restapi_testmode"
//initialize the database and the collection 
const db = admin.firestore();
const userCollection = 'users';
const PORT = process.env.PORT || 3001;

sdk.auth(authtoken);
sdk.get('/consumer/v1/appointments')
  .then(res=> {
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  });
//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
