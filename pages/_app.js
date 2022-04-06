import { CssBaseline, ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { wrapper } from '../app/store'
import { getUser, getCart, getWishlist } from '../app/store/actions/async/user'
import { getCategories, getBrands } from '../app/store/actions/async/common'
import { useEffect } from 'react'
import { setToken } from '../api/common'
import PageLoader from '../components/common/PageLoader'
import CustomSnackbar from '../components/common/CustomSnackbar'
import createEmotionCache from '../utils/createEmotionCache'
import { useTheme } from '../app/hooks/useTheme'
import { setTheme } from '../app/store/actions/actionCreators'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const clientSideEmotionCache = createEmotionCache()

const MyApp = ({Component, emotionCache = clientSideEmotionCache, pageProps}) => {

    const { theme } = useTheme()

    useEffect(() => {
        setToken()
    }, [])

    const getLayout = Component.getLayout || ((page) => page)

    return (
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    {
                        getLayout(
                            <>
                            <PageLoader/>
                            <CssBaseline />
                            <Component {...pageProps} />
                            <CustomSnackbar/>
                            </>
                        )
                    }
                </ThemeProvider>
            </CacheProvider>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {

    const {dispatch} = store
    const cookies = ctx.req?.headers.cookie
    const cookieCart = ctx.req?.cookies['cart'] ? JSON.parse(ctx.req.cookies['cart']) : undefined
    const cookieWishlist = ctx.req?.cookies['wishlist'] ? JSON.parse(ctx.req.cookies['wishlist']) : undefined
    const theme = ctx.req?.cookies['theme']

    await dispatch(getCategories())
    await dispatch(getBrands())

    if (theme) {
        dispatch(setTheme(theme))
    }
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