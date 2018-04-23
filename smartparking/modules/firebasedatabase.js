"use strict";
const firebasedatabase = require("firebase");


const config = {
    apiKey: "AIzaSyAo3kHPkK4rePDzbEWGSkqgMBSHRt1pT5k",
    authDomain: "smartparking-42276.firebaseapp.com",
    databaseURL: "https://smartparking-42276.firebaseio.com",
    projectId: "smartparking-42276",
    storageBucket: "",
    messagingSenderId: "950290644859"
};

firebasedatabase.initializeApp(config);
const database = firebasedatabase.database();

////-----------------------coment----------------------------------------------------------------------------------------------------------------
function firebase() {
    function writeParkDataInfo(body) {

        database.ref('park/' + body.id).set({
            id: body.id,
            name: body.name,
            address: body.address,
            email: body.email,
            contact: body.contact,
            profile_picture: body.img,
            price: body.price,
            capacity: body.capacity,
            used:0,
        });
    }

    function writeUpdatePark(body) {
        console.log("FIRE"+body);
        database.ref("park/" + body.id).update({list_license: body.license});

    }

    return {
        writeParkDataInfo,
        writeUpdatePark
    };

}


module.exports = firebase;