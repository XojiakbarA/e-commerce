import { useState } from 'react'
import { IconButton, Box, List, ListItemButton, ListItemText, Collapse } from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import { useRouter } from 'next/router'

const CategoryListItem = ({ category }) => {

    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [ripple, setRipple] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation()
        setOpen(!open);
    };

    function handleEnter() {
        setRipple(true)
    }
    function handleLeave() {
        setRipple(false)
    }

    function handleCatClick(id, value) {
        router.push({
            pathname: '/search',
            query: { ...router.query, cat_id: id, is_sub: value, page: 1 }
        })
    }

    return(
        <Box>
            <ListItemButton disableRipple={ripple} onClick={ () => handleCatClick(category.id, 'no') }>
                <ListItemText primary={category.title} />
                <IconButton onClick={handleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                    { category.sub_categories && (open ? <ExpandLess /> : <ExpandMore />) }
                </IconButton>
            </ListItemButton>
            { category.sub_categories &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {
                        category.sub_categories.map(sub => (
                            <List component="div" disablePadding key={sub.id} onClick={ () => handleCatClick(sub.id, 'yes') }>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary={sub.title} />
                                </ListItemButton>
                            </List>
                        ))
                    }
                </Collapse>
            }
        </Box>
    )
}

export default CategoryListItem