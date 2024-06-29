importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyBzd0TZVhj3hOKHrVsOak2cERYijuCA_o8',
  authDomain: 'next-pwa-test-e0b4d.firebaseapp.com',
  projectId: 'next-pwa-test-e0b4d',
  storageBucket: 'next-pwa-test-e0b4d.appspot.com',
  messagingSenderId: '876598000685',
  appId: '1:876598000685:web:f34efd0021b1d5f5c04ca4'
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-512x512.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-512x512.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})