import { CssBaseline } from '@mui/material'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { setCat } from '../redux/actions/main'

import { wrapper } from '../redux/store'

const MyApp = ({Component, pageProps}) => {
    return(
            <Layout>
                <CssBaseline />
                <Component {...pageProps} />
            </Layout>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {
    const res = await fetch('http://127.0.0.1:8000/api/categories')
    const data = await res.json()
    store.dispatch(setCat(data))
    
    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
            pathname: ctx.pathname,
        },
    }
})

export default wrapper.withRedux(MyApp)