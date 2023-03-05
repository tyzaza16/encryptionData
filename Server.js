const { getRandomValues } = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
var forge = require('node-forge');

const app = express();
const app2 = express();

app.use(bodyParser.json()); 

var serverPrivateKey; 

var rsa = forge.pki.rsa;

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST, PUT, GET,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next();
})

app.get('/keys', (req, res) => {
    rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
        // keypair.privateKey, keypair.publicKey
        publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
        serverPrivateKey = keypair.privateKey;
    
        console.log("PublicKey : ", publicKeyPem);
        res.json({publicKeyPem: publicKeyPem})
    });
});

decryptingData = (ciphertext,privateKey) =>{
    var decryptedData = privateKey.decrypt(ciphertext);
    return decryptedData;
}


app.put('/sendData', (req,res) => {
    const data = req.body;
    console.log("Encrypt Data (Server Side) : ", data.encryptedData);
    console.log("Real Data (Server Side) :", decryptingData(data.encryptedData, serverPrivateKey));

});

app.listen(9000, () => {
    console.log('Application is running on port 9000');
  });