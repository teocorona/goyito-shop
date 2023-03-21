import { CssBaseline, ThemeProvider } from '@mui/material'
import 'components/styles/globals.css'
import { lightTheme } from 'components/themes'
import type { AppProps } from 'next/app'
// import { Roboto_Flex } from 'next/font/google'

// const roboto = Roboto_Flex({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
  )
}
