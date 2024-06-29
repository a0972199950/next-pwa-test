import * as React from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}


export const useInstallPwa = () => {
  const [deferredPrompt , setDeferredPrompt] = React.useState<null | BeforeInstallPromptEvent>(null)

  React.useLayoutEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    })
  }, [])

  const handlePwaInstall = () => {
    console.log('點擊安裝 PWA')

    if (!deferredPrompt) {
      console.log('A2HS 尚未出現' + Date.now())
      return
    }

    deferredPrompt.prompt()

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('使用者同意安裝 PWA')
      } else {
        console.log('使用者拒絕安裝 PWA')
      }
      
      setDeferredPrompt(null)
    })
  }

  return { handlePwaInstall }
}

export const useSyncLogToScreen = () => {
  const [logs, setLogs] = React.useState<string[]>(['初始化完成'])

  const pushLog = (...msgs: string[]) => {
    setLogs((val) => ([
      ...val,
      ...msgs.map(msg => `[${Date.now()}] ${msg}`)
    ]))
  }

  React.useEffect(() => {
    const _log = console.log
    console.log = (...msgs) => {
      pushLog(...msgs)
      _log(...msgs)
    }
  }, [])

  return { logs, pushLog }
}

export const useNotification = () => {  
  const requestPermission = () => {
    console.log('requestPermission')

    if (Notification.permission === 'granted') {
      console.log('您已開啟通知權限')
      return
    }

    Notification.requestPermission((permission) => {
      console.log(permission)
    })
  }

  return { requestPermission }
}