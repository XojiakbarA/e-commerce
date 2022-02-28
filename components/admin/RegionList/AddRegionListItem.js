import { Box, CircularProgress, IconButton, ListItem, ListItemText, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SaveIcon from '@mui/icons-material/Save'
import { useAddRegion } from "../../../app/hooks/useFormik/useAddRegion"

const AddRegionListItem = ({ handleSelectedClick }) => {

    const {
        edit, values, errors, touched, events, isSubmitting,
        getFieldProps, handleSubmit, handleEditClick, handleSubmitClick, handleBlur
    } = useAddRegion(handleSelectedClick)

    return (
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
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        autoFocus
                        variant='standard'
                        placeholder='Region Name'
                        error={ touched.name && Boolean(errors.name) }
                        { ...getFieldProps('name') }
                        onBlur={handleBlur}
                    />
                </form>
                :
                <ListItemText primary='Add Region'/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    onClick={handleSubmitClick}
                    disabled={Boolean(errors.name) || !values.name}
                    { ...events }
                >
                    <SaveIcon fontSize='small'/>
                </IconButton>
            }
            <IconButton
                size='small'
                onClick={handleEditClick}
            >
                {edit ? <RemoveCircleIcon fontSize='small'/> : <AddCircleIcon fontSize='small'/>}
            </IconButton>
        </ListItem>
    )
}

export default AddRegionListItem