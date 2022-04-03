import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import BaseLink from '../../../common/Link/BaseLink'
import { useSelector } from 'react-redux'

const MenuCategories = () => {

    const categories = useSelector(state => state.categories)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='contained'
                sx={{display: {xs: 'none', sm: 'block'}}}
            >
                Categories
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {
                    categories.map(category => (
                        <MenuItem
                            key={category.id}
                            href={`search?cat_id=${category.id}`}
                            component={BaseLink}
                        >
                                {category.title}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    );
}

export default MenuCategories