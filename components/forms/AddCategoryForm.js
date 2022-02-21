import { Button, CircularProgress, Grid, IconButton, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { FieldArray, FormikProvider } from "formik"
import { useAddCategory } from "../../app/hooks/useFormik/useAddCategory"

const AddCategoryForm = () => {

    const formik = useAddCategory()

    const { handleSubmit, getFieldProps, touched, errors, values, isSubmitting } = formik

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} padding={2}>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label='Category Title'
                        size='small'
                        error={ touched.category && Boolean(errors.category?.title) }
                        helperText={ touched.category && errors.category?.title }
                        { ...getFieldProps('category.title') }
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormikProvider value={formik}>
                    <FieldArray name='sub_categories'>
                        {
                            ({remove, push}) => (
                                <Grid container spacing={2}>
                                    {
                                        values.sub_categories.map((item, i) => (
                                            <Grid item xs={12} key={i} display='flex' alignItems='center'>
                                                <TextField
                                                    fullWidth
                                                    label={`Sub Category Title ${i+1}`}
                                                    size='small'
                                                    error={
                                                        touched.sub_categories
                                                        &&
                                                        errors.sub_categories ?
                                                        Boolean(errors.sub_categories[i]?.title) :
                                                        null
                                                    }
                                                    helperText={
                                                        touched.sub_categories
                                                        &&
                                                        errors.sub_categories ?
                                                        errors.sub_categories[i]?.title :
                                                        null
                                                    }
                                                    { ...getFieldProps(`sub_categories[${i}].title`) }
                                                />
                                                <IconButton size='small' onClick={ e => remove(i) }>
                                                    <RemoveCircleIcon color='error' fontSize='small'/>
                                                </IconButton>
                                            </Grid>
                                        ))
                                    }
                                    <Grid item xs={12} display='flex' justifyContent='end' alignItems='center'>
                                        <TextField
                                            fullWidth
                                            label='Add Sub Category'
                                            size='small'
                                            disabled
                                        />
                                        <IconButton size='small' onClick={ e => push({title: ''}) }>
                                            <AddCircleIcon color='success' fontSize='small'/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </FieldArray>
                    </FormikProvider>
                </Grid>
                <Grid item xs={8} display='flex' justifyContent='end'>
                    <Button
                        variant='contained'
                        type='submit'
                        endIcon={
                            isSubmitting
                            ?
                            <CircularProgress color='inherit' size={20}/>
                            :
                            <AddIcon/>
                        }
                        disabled={isSubmitting}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddCategoryForm