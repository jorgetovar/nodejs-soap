var soap = require('soap');
var Validator = require('jsonschema').Validator;
var jsonValidator = new Validator();
var utils = require('./utils');

var debitCardRqSchema = {
  "id": "/DebitCardRqSchema",
  "type": "object",
  "properties": {
    "customer": {"$ref": "/Customer"},
    "requestId": {"type": "string"},
    "currentDate": {"type": "string"},
    "numCard": {"type": "string"},
    "bankId": {"type": "string"},
    "ipAddress": {"type": "string"},

  },
  "required": ["customer", "requestId", "currentDate", "numCard", "bankId", "ipAddress"]
};

  // Person
  var customer = {
    "id": "/Customer",
    "type": "object",
    "properties": {
      "identificationType": {"type": "string"},
      "identificationNumber": {"type": "string"},
    },
    "required": ["identificationType", "identificationNumber"]
  };

//'http://10.130.2.131:7812/Customer/Services/CustAuthInq?wsdl'
var url = process.env.URL;


exports.handler = (event, context, callback) => {
  var args = JSON.parse(event.body);
  utils.printJson(args);
  jsonValidator.addSchema(customer, '/Customer');
  utils.printJson(jsonValidator.validate(args, debitCardRqSchema));
  soap.createClient(url, function(err, client) {
  if(err){
        callback({});
  }
  console.log("***");
  var request = client.describe().IFXCustAuthInqService.IFXCustAuthInq.addCustomer.input;
  utils.printJson(request);
  console.log("***");

 client.addCustomer(args, function(err, result) {
    if(err){
      callback({});
   
    }
    utils.printJson(result);
    utils.printJson(client.lastRequest);
  
    var response = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(result),
        "isBase64Encoded": false
    };
    callback(null, response);

  });
});
}