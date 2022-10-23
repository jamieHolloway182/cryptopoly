import '../styles/globals.css'
import Layout from '../components/Layout/Layout'

function MyApp({ Component, pageProps }) {

  return (
    <Layout className={Layout.card}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
