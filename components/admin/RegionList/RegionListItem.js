import { Box, CircularProgress, IconButton, ListItemButton, ListItemText, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEditRegion } from "../../../app/hooks/useFormik/useEditRegion"

const RegionListItem = ({ region, selected, handleSelectedClick }) => {

    const {
        ripple, events, edit, values, isSubmitting, touched, errors, getFieldProps,
        handleSubmit, handleEditClick, handleSubmitClick, handleBlur, handleDeleteClick
    } = useEditRegion(region)

    return (
        <ListItemButton
            disableRipple={ripple}
            selected={selected.id === region.id || edit}
            onClick={e => handleSelectedClick(region)}
        >
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
                        error={ touched.name && Boolean(errors.name) }
                        { ...getFieldProps('name') }
                        onBlur={handleBlur}
                        { ...events }
                    />
                </form>
                :
                <ListItemText primary={region.name}/>
            }
            {
                edit &&
                <IconButton
                    size='small'
                    disabled={Boolean(errors.name) || values.name == region.name}
                    onClick={ handleSubmitClick }
                    { ...events }
                >
                    <SaveIcon fontSize='small'/>
                </IconButton>
            }
            <IconButton
                size='small'
                onClick={handleEditClick}
                { ...events }
            >
                {edit ? <EditOffIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
            </IconButton>
            <IconButton
                size='small'
                onClick={handleDeleteClick}
                { ...events }
            >
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </ListItemButton>
    )
}

export default RegionListItem