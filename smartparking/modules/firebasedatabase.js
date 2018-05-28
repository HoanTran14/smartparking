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
const firemess= firebasedatabase.messaging();
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
            used: 0

        });
    }

    function captureImage(body) {

        database.ref('camera' + body.id).update({});
    }

    function getUrlImg(id, next, err) {
        database.ref('camera/' + id+"/plate").once('value', function (snapshot) {

            //logs everything that is under /user
            console.log(snapshot.val());
            next(snapshot.val())


        });
    }
    function upUrlImg(id,data, next, err) {

        database.ref('camera/' +id).update( {plate:data});

    }

    function getParkInfo(id, next, err) {
        database.ref('park/' + id).once('value', function (snapshot) {
            if (snapshot.val() == null) {
                err();
            } else {
                next(snapshot.val())
            }
            //logs everything that is under /user
            console.log(snapshot.val());


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
        upUrlImg,
        getParkInfo,
        getUrlImg,
        updatePark,
        writeParkDataInfo,
        signPark
    };

}


module.exports = firebase;