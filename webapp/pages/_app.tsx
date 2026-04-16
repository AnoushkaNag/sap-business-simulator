import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { AppStateProvider } from '../context/AppState'
// lightweight toasts implemented in components when needed

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  )
}
