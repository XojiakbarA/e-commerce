import { Stack, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import NextLink from '../../common/Link'
import { toggleCartSidebar } from '../../../redux/actions'

const SidebarButtons = () => {

    const dispatch = useDispatch()

    const handleCloseSidebar = () => dispatch(toggleCartSidebar(false))

    return(
        <Stack
            spacing={2}
            alignItems='center'
            sx={{position: 'sticky', right: 0, bottom: 0, padding: 1, backgroundColor: 'white'}}
        >
            <Button variant='contained' fullWidth >Checkout Now</Button>
            <NextLink href='/cart' style={{width: '100%'}}>
                <Button variant='outlined' fullWidth onClick={handleCloseSidebar}>View Cart</Button>
            </NextLink>
        </Stack>
    )
}

export default SidebarButtons