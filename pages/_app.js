import { CssBaseline } from '@mui/material'
import '../styles/globals.css'
import { wrapper } from '../app/store'
import { getUser, getCart, getWishlist } from '../app/store/actions/async/user'
import { getCategories, getBrands } from '../app/store/actions/async/common'
import { useEffect } from 'react'
import { setToken } from '../api/common'
import PageLoader from '../components/common/PageLoader'
import CustomSnackbar from '../components/common/CustomSnackbar'

const MyApp = ({Component, pageProps}) => {

    useEffect(() => {
        setToken()
    }, [])

    const getLayout = Component.getLayout || ((page) => page)

    return getLayout(
            <>
            <PageLoader/>
            <CssBaseline />
            <Component {...pageProps} />
            <CustomSnackbar/>
            </>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {

    const {dispatch} = store
    const cookie = ctx.req?.headers.cookie

    await dispatch(getCategories())
    await dispatch(getBrands())

    if (cookie) {
        await dispatch(getUser(cookie))
        await dispatch(getCart(cookie))
        await dispatch(getWishlist(cookie))
    }

    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
            pathname: ctx.pathname,
        },
    }
})

export default wrapper.withRedux(MyApp)