
const OpenalprApi = require('openalpr_api');

const apiInstance = new OpenalprApi.DefaultApi();


const secretKey = "sk_181f5714097c3359e6697da4";
const opts = {
    'recognizeVehicle': 0, // Integer | If set to 1, the vehicle will also be recognized in the image This requires an additional credit per request
    'state': "", // String | Corresponds to a US state or EU country code used by OpenALPR pattern  recognition.  For example, using \"md\" matches US plates against the  Maryland plate patterns.  Using \"fr\" matches European plates against  the French plate patterns.
    'returnImage': 0, // Integer | If set to 1, the image you uploaded will be encoded in base64 and  sent back along with the response
    'topn': 10, // Integer | The number of results you would like to be returned for plate  candidates and vehicle classifications
    'prewarp': "" // String | Prewarp configuration is used to calibrate the analyses for the  angle of a particular camera.  More information is available here http://doc.openalpr.com/accuracy_improvements.html#calibration
};
const country = "eu"; // {String} Defines the training data used by OpenALPR.  \"us\" analyzes  North-American style plates.  \"eu\" analyzes European-style plates.  This field is required if using the \"plate\" task  You may use multiple datasets by using commas between the country  codes.  For example, 'au,auwide' would analyze using both the  Australian plate styles.  A full list of supported country codes  can be found here https://github.com/openalpr/openalpr/tree/master/runtime_data/config

function openAlpr() {
    function callImg(imageUrl, next, err) {


        var callback = function(error, data, response) {
            if (error) {

                err(error.message);
            } else {
                console.log('API called successfully. Returned data: ' + data.results[0]);
                next(data.results[0].plate);
            }
        };
        apiInstance.recognizeUrl(imageUrl, secretKey, country, opts, callback);

    }

    return {
        callImg
    };
}

module.exports = openAlpr


