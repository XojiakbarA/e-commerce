import { Stack } from "@mui/material"
import NavigationItem from "./NavigationItem"

const navs = [
    {id: 1, title: 'Home', link: '/'},
    {id: 2, title: 'Shop', link: '/shop'},
    {id: 3, title: 'About', link: '/about'},
    {id: 4, title: 'Contact', link: '/contact'}
]

const Navigation = () => {
    return(
        <Stack spacing={2} direction='row'>
            {
                navs.map((nav, i) => (
                    <NavigationItem key={i} nav={nav} />
                ))
            }
        </Stack>
    )
}

export default Navigation