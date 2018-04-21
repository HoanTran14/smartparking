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
    function writeUserData(id, name, email, imageUrl) {
        console.log("321321321321");
        database.ref('park/' + id).set({
            username: name,
            email: email,
            profile_picture : imageUrl
        });
    }


	return {
    writeUserData
	};

}


module.exports = firebase;