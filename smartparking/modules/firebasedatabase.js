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

        database.ref('park/' + body.id).update({
            id: body.id,
            name: body.name,
            address: body.address,
            email: body.email,
            contact: body.contact,
            profile_picture: body.img,
            price: body.price,
            capacity: body.capacity,
            used: 0,
            space: 0,
        });
    }

    function captureImage(body) {

        database.ref('camera' + body.id).update({

        });
    }
    function getUrlImg(id, next, err) {
        database.ref('camera/' + id).once('value', function (snapshot) {

                //logs everything that is under /user
                console.log(snapshot.val());
                next(snapshot.val())


        });
    }
    function getParkInfo(id, next, err) {
        database.ref('park/' + id).once('value', function (snapshot) {

            //logs everything that is under /user
            console.log(snapshot.val());
            next(snapshot.val())


        });
    }
    function signPark(body) {
        console.log("FIRE" + body);
        database.ref("ticket/" + body.id + "/" + body.id_user).update({list_license: body.license});

    }



    function updatePark(body) {
        console.log("FIRE" + body);
        database.ref('park/' + body.id).update({
            capacity: body.capacity,
            used: body.used,
            space: body.space
        });

    }

    return {
        getParkInfo,
        getUrlImg,
        updatePark,
        writeParkDataInfo,
        signPark
    };

}


module.exports = firebase;