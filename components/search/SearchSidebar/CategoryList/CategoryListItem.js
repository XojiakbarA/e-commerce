import { useState } from 'react'
import { IconButton, List, ListItemButton, ListItemText, Collapse } from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useRipple } from '../../../../app/hooks/useRipple'
import BaseLink from '../../../common/Link/BaseLink'

const CategoryListItem = ({ category }) => {

    const router = useRouter()
    const cat_id = router.query.cat_id
    const sub_cat_id = router.query.sub_cat_id
    const [open, setOpen] = useState(false || Boolean(category.sub_categories.find(sub => sub.id == sub_cat_id)))

    const [ripple, events] = useRipple()

    const handleOpenClick = (e) => {
        e.preventDefault()
        setOpen(!open)
    }

    return(
        <>
            <ListItemButton
                selected={cat_id == category.id}
                disableRipple={ripple}
                href={{query: { cat_id: category.id, page: 1 }}}
                component={BaseLink}
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
                                    href={{query: { sub_cat_id: sub.id, page: 1 }}}
                                    component={BaseLink}
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