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
    const cookies = ctx.req?.headers.cookie
    const cookieCart = ctx.req.cookies['cart'] ? JSON.parse(ctx.req.cookies['cart']) : undefined
    const cookieWishlist = ctx.req.cookies['wishlist'] ? JSON.parse(ctx.req.cookies['wishlist']) : undefined

    await dispatch(getCategories())
    await dispatch(getBrands())

    if (cookies) {
        await dispatch(getUser(cookies))
    }
    if (cookieCart) {
        await dispatch(getCart(cookieCart))
    }
    if (cookieWishlist) {
        await dispatch(getWishlist(cookieWishlist))
    }

    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
            pathname: ctx.pathname,
        },
    }
})

export default wrapper.withRedux(MyApp)