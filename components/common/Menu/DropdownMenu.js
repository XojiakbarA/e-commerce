import { ListItemIcon, Menu, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { toggleAccountMenu } from "../../../app/store/actions/actionCreators"

const DropdownMenu = ({ menu }) => {

    const dispatch = useDispatch()

    const { accountMenu } = useSelector(state => state.toggle)

    const closeAccountMenu = () => {
        dispatch(toggleAccountMenu(null))
    }

    return (
        <Menu
            anchorEl={accountMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            autoFocus={false}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(accountMenu)}
            onClose={closeAccountMenu}
        >
            {
                menu.map(item => (
                    <MenuItem
                        key={item.title}
                        onClick={item.onClick}
                        href={item.href}
                        component={item.component}
                    >
                        <ListItemIcon>
                            { item.icon }
                        </ListItemIcon>
                        { item.title }
                    </MenuItem>
                ))
            }
        </Menu>
    )
}

export default DropdownMenu