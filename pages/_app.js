import { CssBaseline, Backdrop, CircularProgress } from '@mui/material'
import MainLayout from '../components/layout/MainLayout'
import Snackbar from '../components/layout/Snackbar/Snackbar'
import '../styles/globals.css'
import { wrapper } from '../app/store'
import { getUser, getCart, getWishlist } from '../app/store/actions/async/user'
import { getCategories, getBrands } from '../app/store/actions/async/common'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { setToken } from '../api/common'

const MyApp = ({Component, pageProps}) => {

    const router = useRouter()
    const [routing, setRouting] = useState(false)
    
    useEffect(() => {
        router.events.on('routeChangeStart', () => {
            setRouting(true)
        })
        router.events.on('routeChangeComplete', () => {
            setRouting(false)
        })

        return () => {
            router.events.off('routeChangeStart', () => {
                setRouting(true)
            })
            router.events.off('routeChangeComplete', () => {
                setRouting(false)
            })
        }
    })

    const getLayout = Component.getLayout || ((page) => page)

    useEffect(() => {
        setToken()
    }, [])

    return getLayout(
            <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={routing}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* <MainLayout> */}
                <CssBaseline />
                <Component {...pageProps} />
                <Snackbar/>
            {/* </MainLayout> */}
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