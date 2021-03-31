const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const app = express();

const port = 3000;

app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post ("/", function (req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members : [
      {
        email_adress: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url ="https://us7.api.mailchimp.com/3.0/lists/716dd5faa3";
  const options = {
    method:"POST",
    auth:"const1:45b18143ad62d18056eb6e3cc37a9e83-us7"
  }


  const request = https.request(url, options, function(response){
    response.on ("data", function (data){
      console.log(JSON.parse(data));
    });
  });
request.write(jsonData);
request.end();

});




app.listen(port, function() {
     console.log("Server is running on port 3000");
});
