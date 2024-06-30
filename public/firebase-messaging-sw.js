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
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icons/icon-512x512.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)

  // 检查是否已经显示了相同的通知
  // self.registration.getNotifications().then((notifications) => {
  //   if (notifications.some(notification => notification.icon)) {
  //     self.registration.showNotification(notificationTitle, notificationOptions)
  //   }


  //   const existingNotification = notifications.find(notification => notification.title === notificationTitle && notification.body === notificationOptions.body)
  //   if (!existingNotification) {
  //     self.registration.showNotification(notificationTitle, notificationOptions)
  //   }
  // })
})
