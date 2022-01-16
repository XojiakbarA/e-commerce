import { CssBaseline, Backdrop, CircularProgress } from '@mui/material'
import MainLayout from '../components/layout/MainLayout'
import '../styles/globals.css'
import { wrapper } from '../redux/store'
import { getCategories, getBrands, getUser, getCart, getWishlist } from '../redux/actions'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

    return (
            <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={routing}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <MainLayout>
                <CssBaseline />
                <Component {...pageProps} />
            </MainLayout>
            </>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {

    const {dispatch} = store

    await dispatch(getCategories())
    await dispatch(getBrands())
    await dispatch(getUser(ctx.req?.headers.cookie))
    await dispatch(getCart(ctx.req?.headers.cookie))
    await dispatch(getWishlist(ctx.req?.headers.cookie))

    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
            pathname: ctx.pathname,
        },
    }
})

export default wrapper.withRedux(MyApp)