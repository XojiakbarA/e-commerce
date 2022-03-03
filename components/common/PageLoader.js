import { Backdrop, CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


const PageLoader = () => {

    const router = useRouter()

    const [routing, setRouting] = useState(false)

    const handleStart = () => {
        setRouting(true)
    }
    const handleComplete = () => {
        setRouting(false)
    }
    
    useEffect(() => {
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
        }
    }, [router])

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={routing}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default PageLoader