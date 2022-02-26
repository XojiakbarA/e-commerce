import { Box, CircularProgress, Collapse, IconButton, List, ListItem, ListItemText, ListSubheader, TextField } from "@mui/material"
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SaveIcon from '@mui/icons-material/Save'
import { useState } from "react"
import { useAddCategory } from "../../../app/hooks/useFormik/useAddCategory"
import { FieldArray, FormikProvider } from "formik"
import { useRipple } from "../../../app/hooks/useRipple"

const AddCategoryListItem = () => {

    const [ripple, events] = useRipple()
    const [ edit, setEdit ] = useState(false)

    const formik = useAddCategory(setEdit)

    const {
        handleSubmit, getFieldProps, resetForm, submitForm,
        touched, errors, values, isSubmitting, isValid
    } = formik

    const handleEditClick = () => {
        resetForm()
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        if (!ripple) setEdit(false)
    }
    const handleSubmitClick = async () => {
        await submitForm()
    }

    return (
        <form onSubmit={handleSubmit}>
        <ListItem selected={edit}>
            {
                isSubmitting
                ?
                <>
                <CircularProgress size={20}/>
                <Box sx={{ flexGrow: 1 }}/>
                </>
                :
                edit
                ?
                <TextField
                    fullWidth
                    variant='standard'
                    autoFocus
                    placeholder='Category Title'
                    error={ touched.category && Boolean(errors.category?.title) }
                    helperText={ (touched.category && errors.category?.title) || ' ' }
                    { ...getFieldProps('category.title') }
                    onBlur={handleBlur}
                />
                :
                <ListItemText primary='Add Category'/>
            }
            {
                edit && isValid &&
                <IconButton
                    size='small'
                    onClick={handleSubmitClick}
                    disabled={isSubmitting}
                    { ...events }
                >
                    <SaveIcon fontSize='small'/>
                </IconButton>
            }
            <IconButton
                size='small'
                onClick={handleEditClick}
                disabled={isSubmitting}
            >
                {edit ? <RemoveCircleIcon fontSize='small'/> : <AddCircleIcon fontSize='small'/>}
            </IconButton>
            {edit ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={edit} timeout="auto" unmountOnExit>
            <FormikProvider value={formik}>
            <FieldArray name='sub_categories'>
                    {
                        ({remove, push}) => (
                            <List component="div" disablePadding { ...events }>
                                <ListSubheader>Sub Categories</ListSubheader>
                                {
                                    values.sub_categories.map((sub_category, i) => (
                                        <ListItem key={i} sx={{ pl: 4 }}>
                                            {
                                                isSubmitting
                                                ?
                                                <>
                                                <CircularProgress size={20}/>
                                                <Box sx={{ flexGrow: 1 }}/>
                                                </>
                                                :
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
                                            }
                                            <IconButton
                                                size='small'
                                                color='error'
                                                onClick={e => remove(i)}
                                                disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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