'use client'
import * as React from 'react'
import Image from 'next/image'
import styles from './page.module.css'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function Home() {
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

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />

        <ul className={styles.logs}>
          {
            logs.map((log, index) => (
              <li key={index}>{ log }</li>
            ))
          }
        </ul>
      </div>

      <div className={styles.grid}>
        <button
          className={styles.card}
          onClick={() => handlePwaInstall()}
        >
          <h2>
            安裝 PWA
          </h2>
        </button>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
