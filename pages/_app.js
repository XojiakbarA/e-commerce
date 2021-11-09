import { CssBaseline } from '@mui/material'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'

const MyApp = ({Component, pageProps}) => {
    return(
        <Provider store={store}>
            <Layout>
                <CssBaseline />
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default MyApp