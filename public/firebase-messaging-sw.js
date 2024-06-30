importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')

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

messaging.onBackgroundMessage((payload) => {
  console.log('收到 firebase 背景訊息 ', payload)
  const notificationTitle = '[fb bg msg]' + payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-512x512.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

messaging.onMessage((payload) => {
  console.log('收到 firebase 前景訊息 ', payload)
  const notificationTitle = '[fb fg msg]' + payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-512x512.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})