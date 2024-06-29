/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa'
import fs from 'fs'

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
}

const withPwa = nextPwa({
  dest: 'public',
  register: true
})

export default withPwa(nextConfig)
