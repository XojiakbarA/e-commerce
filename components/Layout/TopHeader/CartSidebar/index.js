import { Box, Typography, Stack, Divider, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SidebarButtons from './SidebarButtons'
import SidebarProductCard from './SidebarProductCard'
import { closeCartSidebar } from '../../../../redux/actions/main'
import { connect } from 'react-redux'


const CartSidebar = ({closeCartSidebar}) => {

    return(
        <Box sx={{padding: 1, width: 350}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h5'>
                        17 items
                    </Typography>
                    <IconButton onClick={closeCartSidebar}>
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

const mapDispatchToProps = dispatch => ({
    closeCartSidebar: () => dispatch(closeCartSidebar())
})

export default connect(null, mapDispatchToProps)(CartSidebar)