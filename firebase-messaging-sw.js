// Firebase SDKs আমদানি করুন
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// আপনার Firebase প্রোজেক্ট কনফিগারেশন এখানে যোগ করুন
const firebaseConfig = { 
    apiKey: "AIzaSyBkjWUY9kWP28Hgu2HDd9jge_d8-YV5RI4", 
    authDomain: "calling-app-6df8a.firebaseapp.com", 
    databaseURL: "https://calling-app-6df8a-default-rtdb.firebaseio.com", 
    projectId: "calling-app-6df8a", 
    storageBucket: "calling-app-6df8a.firebasestorage.app", 
    messagingSenderId: "756155662995", 
    appId: "1:756155662995:web:46d61e5f14c3224ceac366" 
};

// Firebase শুরু করুন
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// অ্যাপ ব্যাকগ্রাউন্ডে বা বন্ধ থাকলে নোটিফিকেশন হ্যান্ডেল করুন
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/your-app-icon.png' // এখানে আপনার অ্যাপের আইকনের লিঙ্ক দিন
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});