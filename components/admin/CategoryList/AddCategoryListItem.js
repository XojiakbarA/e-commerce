import { Collapse, IconButton, List, ListItem, ListItemText, ListSubheader, TextField } from "@mui/material"
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from "react"
import { useAddCategory } from "../../../app/hooks/useFormik/useAddCategory"
import { FieldArray, FormikProvider } from "formik"

const AddCategoryListItem = () => {

    const [ open, setOpen ] = useState(false)

    const formik = useAddCategory()

    const {
        handleSubmit, getFieldProps, resetForm, submitForm,
        touched, errors, values, isSubmitting, isValid
    } = formik

    const handleOpenClick = () => {
        resetForm()
        setOpen(prev => !prev)
    }
    const handleSubmitClick = async () => {
        await submitForm() 
        resetForm()
        setOpen(false)
    }

    return (
        <form onSubmit={handleSubmit}>
        <ListItem selected={open}>
            {
                open
                ?
                <TextField
                    fullWidth
                    variant='standard'
                    autoFocus
                    placeholder='Category Title'
                    error={ touched.category && Boolean(errors.category?.title) }
                    helperText={ (touched.category && errors.category?.title) || ' ' }
                    { ...getFieldProps('category.title') }
                />
                :
                <ListItemText primary='Add Category'/>
            }
            {
                (isValid && open) &&
                <IconButton
                    size='small'
                    onClick={handleSubmitClick}
                >
                    <SaveIcon fontSize='small'/>
                </IconButton>
            }
            <IconButton
                size='small'
                onClick={handleOpenClick}
            >
                {open ? <RemoveCircleIcon fontSize='small'/> : <AddCircleIcon fontSize='small'/>}
            </IconButton>
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <FormikProvider value={formik}>
            <FieldArray name='sub_categories'>
                    {
                        ({remove, push}) => (
                            <List component="div" disablePadding>
                                <ListSubheader>Sub Categories</ListSubheader>
                                {
                                    values.sub_categories.map((sub_category, i) => (
                                        <ListItem key={i} sx={{ pl: 4 }}>
                                            <TextField
                                                fullWidth
                                                variant='standard'
                                                placeholder='Sub Category Title'
                                                error={
                                                    touched.sub_categories
                                                    &&
                                                    errors.sub_categories ?
                                                    Boolean(errors.sub_categories[i]?.title) :
                                                    null
                                                }
                                                helperText={
                                                    (touched.sub_categories
                                                    &&
                                                    errors.sub_categories ?
                                                    errors.sub_categories[i]?.title :
                                                    null) || ' '
                                                }
                                                { ...getFieldProps(`sub_categories[${i}].title`) }
                                            />
                                            <IconButton
                                                size='small'
                                                color='error'
                                                onClick={e => remove(i)}
                                            >
                                                <RemoveCircleOutlineIcon fontSize='small'/>
                                            </IconButton>
                                        </ListItem>
                                    ))
                                }
                                <ListItem sx={{ pl: 4 }}>
                                    <ListItemText>
                                        Add Sub Category
                                    </ListItemText>
                                    <IconButton
                                        size='small'
                                        color='primary'
                                        onClick={e => push({title: ''})}
                                    >
                                        <AddCircleOutlineIcon fontSize='small'/>
                                    </IconButton>
                                </ListItem>
                            </List>
                        )
                    }
            </FieldArray>
            </FormikProvider>
        </Collapse>
        </form>
    )
}

export default AddCategoryListItem