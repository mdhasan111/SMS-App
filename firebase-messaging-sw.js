// Firebase SDKs আমদানি করুন
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// আপনার Firebase প্রোজেক্ট কনফিগারেশন এখানে যোগ করুন
const firebaseConfig = {
  apiKey: "AIzaSyBVMR27muXlAJ2t8WkxAwTLVVJfpVDP4Zs",
  authDomain: "calling-app-16370.firebaseapp.com",
  databaseURL: "https://calling-app-16370-default-rtdb.firebaseio.com",
  projectId: "calling-app-16370",
  storageBucket: "calling-app-16370.firebasestorage.app",
  messagingSenderId: "363225713231",
  appId: "1:363225713231:web:f1778dbf2846fed71f783a"
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
