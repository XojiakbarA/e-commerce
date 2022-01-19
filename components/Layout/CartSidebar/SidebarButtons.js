import { Stack, Button } from "@mui/material"
import { useToggle } from "../../../app/hooks/useToggle"
import NextLink from '../../common/Link'

const SidebarButtons = () => {

    const { closeSidebar } = useToggle()

    return(
        <Stack
            spacing={2}
            alignItems='center'
            sx={{position: 'sticky', right: 0, bottom: 0, padding: 1, backgroundColor: 'white'}}
        >
            <NextLink href='/checkout' style={{width: '100%'}}>
                <Button variant='contained' fullWidth onClick={closeSidebar}>Checkout Now</Button>
            </NextLink>
            <NextLink href='/cart' style={{width: '100%'}}>
                <Button variant='outlined' fullWidth onClick={closeSidebar}>View Cart</Button>
            </NextLink>
        </Stack>
    )
}

export default SidebarButtons