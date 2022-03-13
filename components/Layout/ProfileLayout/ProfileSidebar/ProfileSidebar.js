import { Grid, Paper, Stack, Divider, List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory'
import BaseLink from '../../../common/Link/BaseLink'
import { useRouter } from "next/dist/client/router"
import { useSelector } from "react-redux"

const ProfileSidebar = ({menu}) => {

    const router = useRouter()
    const isVendorPage = router.route.indexOf('/vendor') == 0
    const shop = useSelector(state => state.user.shop)

    return (
        <Grid item lg={3}>
            <Paper>
                <Stack padding={2} divider={<Divider orientation='horizontal' />}>
                    <List>
                        <ListSubheader>Menu</ListSubheader>
                        {
                            menu.map(item => (
                                <ListItemButton
                                    key={item.title}
                                    selected={
                                        item.path == router.asPath
                                        ||
                                        item.path == '/profile/orders' && router.route == '/profile/orders/[id]'
                                    }
                                    href={item.path}
                                    component={BaseLink}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title}/>
                                </ListItemButton>
                            ))
                        }
                    </List>
                    {
                    !isVendorPage &&
                    <List>
                        <ListSubheader>Shop</ListSubheader>
                        <ListItemButton
                            selected={router.asPath == '/profile/create-shop'}
                            href={shop ? '/vendor' : '/profile/create-shop'}
                            component={BaseLink}
                        >
                            <ListItemIcon>
                                {shop ? <StoreMallDirectoryIcon/> : <AddBusinessIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={shop?.title ?? 'Create Shop'}/>
                        </ListItemButton>
                    </List>
                    }
                </Stack>
            </Paper>
        </Grid>
    )
}

export default ProfileSidebar