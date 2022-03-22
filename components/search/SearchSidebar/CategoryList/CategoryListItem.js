import { useState } from 'react'
import { IconButton, List, ListItemButton, ListItemText, Collapse } from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useRipple } from '../../../../app/hooks/useRipple'

const CategoryListItem = ({ category }) => {

    const router = useRouter()
    const cat_id = router.query.cat_id
    const sub_cat_id = router.query.sub_cat_id
    const [open, setOpen] = useState(false || Boolean(category.sub_categories.find(sub => sub.id == sub_cat_id)))

    const [ripple, events] = useRipple()

    const handleOpenClick = (e) => {
        e.stopPropagation()
        setOpen(!open)
    }
    const handleCategoryClick = (id, isCat) => {
        const query = router.query

        if (isCat) {
            query.sub_cat_id ? delete query.sub_cat_id : null
            query.cat_id = id
        } else {
            query.cat_id ? delete query.cat_id : null
            query.sub_cat_id = id
        }

        router.push({
            query: { ...query, page: 1 },
        }, null, {scroll: false})
    }

    return(
        <>
            <ListItemButton
                selected={cat_id == category.id}
                disableRipple={ripple}
                onClick={ e => handleCategoryClick(category.id, true) }
            >
                <ListItemText primary={category.title} />
                <IconButton
                    size='small'
                    onClick={handleOpenClick}
                    { ...events }
                >
                    { category.sub_categories && (open ? <ExpandLess /> : <ExpandMore />) }
                </IconButton>
            </ListItemButton>
            { category.sub_categories &&
                <Collapse in={open} key={category.id} timeout="auto" unmountOnExit>
                    {
                        category.sub_categories.map(sub => (
                            <List
                                component="div"
                                disablePadding
                                key={sub.id}
                            >
                                <ListItemButton
                                    selected={sub_cat_id == sub.id}
                                    sx={{ pl: 4 }}
                                    onClick={ e => handleCategoryClick(sub.id)}
                                >
                                    <ListItemText primary={sub.title} />
                                </ListItemButton>
                            </List>
                        ))
                    }
                </Collapse>
            }
        </>
    )
}

export default CategoryListItem