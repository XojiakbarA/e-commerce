import { CssBaseline } from '@mui/material'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { setCat } from '../redux/actions/main'
import { wrapper } from '../redux/store'
import { fetchCategories } from '../api/api'

const MyApp = ({Component, pageProps}) => {
    return(
            <Layout>
                <CssBaseline />
                <Component {...pageProps} />
            </Layout>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {
    
    try {
        const res = await fetchCategories()
        store.dispatch(setCat(res.data))
    } catch (e) {
        console.log(e.errno, e.code)
    }
    
    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
            pathname: ctx.pathname,
        },
    }
})

export default wrapper.withRedux(MyApp)