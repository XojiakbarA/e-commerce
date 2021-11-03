import {useState} from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Link from 'next/link'

const categories = [
    {id: 1, title: 'Category1'},
    {id: 2, title: 'Category2'},
    {id: 3, title: 'Category3'},
    {id: 4, title: 'Category4'},
    {id: 5, title: 'Category5'},
    {id: 6, title: 'Category6'}
]

const MenuCategories = () => {
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
                    categories.map((category, i) => (
                        <MenuItem
                            key={i}
                        >
                            <Link href='#'>
                                <a>{category.title}</a>
                            </Link>
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    );
}

export default MenuCategories