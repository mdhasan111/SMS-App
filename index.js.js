const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendCallNotification = functions.database.ref("/activeCalls/{calleeId}")
    .onCreate(async (snapshot, context) => {
      const callData = snapshot.val();
      const calleeId = context.params.calleeId;

      // যদি কল ডেটা না থাকে বা অফার না থাকে, তবে কিছুই করবেন না
      if (!callData || !callData.offer) {
        return console.log("Call data or offer is missing.");
      }

      const callerInfo = callData.callerInfo;
      const callType = callData.isVideo ? "Video" : "Voice";

      // রিসিভারের FCM টোকেন ডেটাবেস থেকে নিন
      const calleeUserRef = admin.database().ref(`/users/${calleeId}`);
      const calleeUserSnap = await calleeUserRef.once("value");
      const calleeUser = calleeUserSnap.val();

      if (!calleeUser || !calleeUser.fcmToken) {
        return console.log("Callee user or FCM token not found.");
      }

      const token = calleeUser.fcmToken;

      // নোটিফিকেশন মেসেজ তৈরি করুন
      const payload = {
        notification: {
          title: `Incoming ${callType} Call`,
          body: `${callerInfo.name} is calling you.`,
          // এখানে একটি কাস্টম সাউন্ড বা আইকন যুক্ত করতে পারেন
        },
        token: token,
      };

      try {
        const response = await admin.messaging().send(payload);
        console.log("Successfully sent message:", response);
      } catch (error) {
        console.log("Error sending message:", error);
      }

      return null;
    });