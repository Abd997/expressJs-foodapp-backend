const FCM = require("fcm-node");
exports.androidPushNotification = async (deviceToken, messageBody) => {
    const fcm = new FCM("333334826527");
    const message = {
        to: deviceToken,
        collapse_key: "TEST",
        notification: {
            title: messageBody.title,
            body: messageBody.body,
            delivery_receipt_requested: true
        },
        data: {
            message: messageBody,
        }
    }
    await fcm.send(message, function(err, response){
        if (err) {
           return false;
        } else {
            return true;
        }
    });
}
