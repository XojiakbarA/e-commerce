import { Box, Typography, Stack, Divider, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SidebarButtons from './SidebarButtons'
import SidebarProductCard from './SidebarProductCard'
import { toggleCartSidebar } from '../../../../redux/actions/main'
import { useDispatch } from 'react-redux'


const CartSidebar = () => {

    const dispatch = useDispatch()

    const closeSidebar = () => dispatch(toggleCartSidebar())

    return(
        <Box sx={{padding: 1, width: 350}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h5'>
                        17 items
                    </Typography>
                    <IconButton onClick={ closeSidebar }>
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