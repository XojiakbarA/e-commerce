import { Button, CircularProgress, Grid, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

const EditCategoryForm = ({ category }) => {

    return (
        <form>
            <Grid container spacing={2} padding={2}>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label='Category Title'
                        size='small'
                        value={category.title}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={2}>
                    {
                        category.sub_categories.map((sub_category, i) => (
                            <Grid item xs={12} key={sub_category.id}>
                                <TextField
                                    fullWidth
                                    label={`Sub Category Title ${i+1}`}
                                    size='small'
                                    value={sub_category.title}
                                />
                            </Grid>
                        ))
                    }
                    </Grid>
                </Grid>
                <Grid item xs={8} display='flex' justifyContent='end'>
                    <Button
                        variant='contained'
                        type='submit'
                        endIcon={
                            // isSubmitting
                            // ?
                            // <CircularProgress color='inherit' size={20}/>
                            // :
                            <SaveIcon/>
                        }
                        // disabled={isSubmitting}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default EditCategoryForm