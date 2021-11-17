import { CssBaseline } from '@mui/material'
import Layout from '../components/layout'
import '../styles/globals.css'
import { wrapper } from '../redux/store'
import { getCategories } from '../redux/actions/main'

const MyApp = ({Component, pageProps}) => {
    return(
            <Layout>
                <CssBaseline />
                <Component {...pageProps} />
            </Layout>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {
    
    await getCategories(store.dispatch)
    
    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
            pathname: ctx.pathname,
        },
    }
})

export default wrapper.withRedux(MyApp)