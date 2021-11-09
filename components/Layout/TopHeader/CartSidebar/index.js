import { Box, Typography, Stack, Divider, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import SidebarButtons from './SidebarButtons'
import SidebarProductCard from './SidebarProductCard'

import { useDispatch } from 'react-redux'
import { cartClose } from '../../../../redux/cartSidebarState/cartSidebarState'

const CartSidebar = () => {

    const dispatch = useDispatch()

    return(
        <Box sx={{padding: 1, width: 350}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h5'>
                        17 items
                    </Typography>
                    <IconButton onClick={ () => dispatch(cartClose()) }>
                        <ChevronRightIcon />
                    </IconButton>
                </Box>
                
                <Stack spacing={1}>
                    <SidebarProductCard />
                    <SidebarProductCard />
                    <SidebarProductCard />
                    <SidebarProductCard />
                    <SidebarProductCard />
                    <SidebarProductCard />
                    <SidebarProductCard />
                    <SidebarProductCard />
                </Stack>
            </Stack>
            <SidebarButtons />
        </Box>
    )
}

export default CartSidebar