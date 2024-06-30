self.addEventListener('notificationclick', function(event) {
  const url = 'https://next-pwa-test-sage.vercel.app'
  event.notification.close() // Android needs explicit close.

  event.waitUntil(
    clients.matchAll({type: 'window'}).then( windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i]
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus()
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    })
  )
})

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

  self.registration.showNotification(payload.data.title, JSON.parse(payload.data.options))
})
