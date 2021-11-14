import {useState} from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { connect } from 'react-redux'

const MenuCategories = ({categories}) => {

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

const mapStateToProps = (state) => ({
    categories: state.categories
})

export default connect(mapStateToProps)(MenuCategories)