"use strict";
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smartparking-42276.firebaseio.com"
});


function firebaseAdmin() {
    function sendmes(token, mes, title,key, next, err) {

        console.log("1312312312 :  " + token)
// See documentation on defining a message payload.
        var message = {
            data: {
                MyKey1: key
            },
            notification: {
                title: title,
                body: mes
            }

        };
        var op = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        }

// Send a message to the device corresponding to the provided
// registration token.
        admin.messaging().sendToDevice(token, message, op)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                next(response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                err(error);
            });

    }

    return {sendmes}
}

module.exports = firebaseAdmin;