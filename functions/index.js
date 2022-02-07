const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const firebase = require('firebase');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var accesstoken;

const config = {
  apiKey: "AIzaSyClezkD_qoyFjeEPr5cyyduYY9MOdVvh3k",
  authDomain: "rest-api-5afca.firebaseapp.com",
  projectId: "rest-api-5afca",
  storageBucket: "rest-api-5afca.appspot.com",
  messagingSenderId: "322205123490",
  appId: "1:322205123490:web:86729bf87ba20d259e68fb",
  measurementId: "G-Z11T3RJS74"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

//All Data Read from Database
app.get('/datas', urlencodedParser, function(req, res) {
  db.collection("Appointment")
  .get()
  .then(doc =>{
    if(!doc.exists) throw new Error('Data not found');
    var arr = [];
    for(let i = 0; i< doc.docs.length; i++){
      const data = doc.docs[i].data()
      arr.push(data)
    }
    res.json(arr);
  })
  .catch((error) =>{
    res.send("Error is " + error);
  })
})
//Create Database
app.post("/", urlencodedParser, function(req, res) {
  const { 
    locationId, 
    email,
    lastname,
    phone,
    customerId,
    serviceId,
    calendarId,
    resourceId,
    serviceAllocationId,
    startDate,
    endDate,
    status,
    bookedBy,
    offset,
    limit} = req.body;
  db.collection('Appointment')
  .doc()
  .set({
    locationId, 
    email,
    lastname,
    phone,
    customerId,
    serviceId,
    calendarId,
    resourceId,
    serviceAllocationId,
    startDate,
    endDate,
    status,
    bookedBy,
    offset,
    limit
  })
  .then(() =>{
    res.send("Database Save Successfully");
  })
  .catch((error) =>{
    res.send("Error is " + error);
  })
})

//Read Select Data from Database
app.get('/datas/:uid', urlencodedParser, function(req, res) {
  const uid = req.params.uid;
  db.collection("Appointment")
  .doc(uid)
  .get()
  .then(alldata =>{
    if(!alldata.exists) throw new Error('Data not found');
    console.log('aaa',alldata);
    console.log(alldata.data());
    res.send(alldata.data());
  })
  .catch((error) =>{
    res.send("Error is " + error);
  })
})

//Update Select Data from Database
app.put('/:uid', urlencodedParser, function(req, res) {
  const uid = req.params.uid;
  const { 
    locationId, 
    email,
    lastname,
    phone,
    customerId,
    serviceId,
    calendarId,
    resourceId,
    serviceAllocationId,
    startDate,
    endDate,
    status,
    bookedBy,
    offset,
    limit} = req.body;
    console.log(uid);
    console.log(req.body);
    db.collection('Appointment')
    .doc(uid)
    .update({
      locationId, 
      email,
      lastname,
      phone,
      customerId,
      serviceId,
      calendarId,
      resourceId,
      serviceAllocationId,
      startDate,
      endDate,
      status,
      bookedBy,
      offset,
      limit
    })
    .then(() =>{
      res.send("Select Data update successfully");
    })
    .catch(error=>{
      res.send("Error is " + error);
    })

})

//Delete Data from Database
app.delete('/:uid', urlencodedParser, function(req, res) {
  const uid = req.params.uid;
  db.collection('Appointment')
  .doc(uid)
  .delete()
  .then(() =>{
    res.send("Selete Data delete Successfully");
  })
  .then((error) =>{
    res.send("Error is " + error);
  })
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
