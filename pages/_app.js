import { CssBaseline } from '@mui/material'

import Layout from '../components/Layout/Layout'

import '../styles/globals.css'

const MyApp = ({Component, pageProps}) => {
    return(
        <Layout>
            <CssBaseline />
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp