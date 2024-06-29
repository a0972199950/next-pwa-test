self.addEventListener('message', event => {
  if (event.data === 'trigger-notification') {
    const options = {
      body: 'This is a notification sent from Service Worker!',
      icon: 'icons/icon-512x512.png',
    }

    event.waitUntil(
      self.registration.showNotification('Notification Title', options)
    )
  }
})