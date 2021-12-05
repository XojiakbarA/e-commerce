import { CssBaseline, Backdrop, CircularProgress } from '@mui/material'
import MainLayout from '../components/layout/MainLayout'
import '../styles/globals.css'
import { wrapper } from '../redux/store'
import { getCategories, getBrands, getUser, getCart } from '../redux/actions'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

const MyApp = ({Component, pageProps}) => {

    const router = useRouter()
    const dispatch = useDispatch()
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

    useEffect( () => {
        dispatch(getUser())
        dispatch(getCart())
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
    
    await getCategories(store.dispatch)
    await getBrands(store.dispatch)
    
    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
            pathname: ctx.pathname,
        },
    }
})

export default wrapper.withRedux(MyApp)