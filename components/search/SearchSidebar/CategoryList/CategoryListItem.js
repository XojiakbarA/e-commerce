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

    function handleCatClick(id, value = 'cat') {
        const query = router.query

        if (value == 'cat') {
            query.sub_cat_id ? delete query.sub_cat_id : null
            query.cat_id = id
        } else {
            query.cat_id ? delete query.cat_id : null
            query.sub_cat_id = id
        }

        router.push({
            pathname: '/search',
            query: { ...query, page: 1 }
        })
    }

    return(
        <Box>
            <ListItemButton disableRipple={ripple} onClick={ () => handleCatClick(category.id) }>
                <ListItemText primary={category.title} />
                <IconButton onClick={handleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                    { category.sub_categories && (open ? <ExpandLess /> : <ExpandMore />) }
                </IconButton>
            </ListItemButton>
            { category.sub_categories &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {
                        category.sub_categories.map(sub => (
                            <List component="div" disablePadding key={sub.id} onClick={ () => handleCatClick(sub.id, 'sub') }>
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