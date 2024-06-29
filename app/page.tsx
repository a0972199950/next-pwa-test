'use client'
import * as React from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { useInstallPwa, useSyncLogToScreen, useNotification } from './utils'


export default function Home() {
  const { logs } = useSyncLogToScreen()
  const { handlePwaInstall } = useInstallPwa()
  const { requestPermission, pushNotification } = useNotification()

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

        <button
          className={styles.card}
          onClick={() => requestPermission()}
        >
          <h2>
            開啟通知權限
          </h2>
        </button>

        <button
          className={styles.card}
          onClick={() => pushNotification()}
        >
          <h2>
            顯示通知
          </h2>
        </button>

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
