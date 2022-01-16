import { Grid, Paper, Stack, Divider, List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import NextLink from '../../../common/Link'
import { useRouter } from "next/dist/client/router"
import UserShopList from "./UserShopList"
import { useSelector } from "react-redux"

const ProfileSidebar = ({menu}) => {

    const router = useRouter()
    const shops = useSelector(state => state.user.shops)

    return (
        <Grid item lg={3}>
            <Paper>
                <Stack padding={2} divider={<Divider orientation='horizontal' />}>
                    <List>
                        <ListSubheader>Menu</ListSubheader>
                        {
                            menu.map((item, i) => (
                                <NextLink key={i} href={item.path}>
                                    <ListItemButton
                                        key={i}
                                        selected={
                                            item.path == router.asPath
                                            ||
                                            item.path == '/profile/orders' && router.route == '/profile/orders/[id]'
                                        }
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.title}/>
                                    </ListItemButton>
                                </NextLink>
                            ))
                        }
                    </List>
                    {
                        router.pathname.indexOf('/profile') == 0 && shops.length > 0
                        ?
                        <UserShopList shops={shops}/>
                        :
                        null
                    }
                </Stack>
            </Paper>
        </Grid>
    )
}

export default ProfileSidebar