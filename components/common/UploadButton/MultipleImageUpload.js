import { Avatar, Badge, Box, Grid, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

const Input = styled('input')({
    display: 'none'
})

const MultipleImageUpload = ({ preview, size, onDeleteClick, onUploadChange, hideUploadButton }) => {

    return (
        <>
            {
                preview.map((url, i) => (
                    <Grid item key={url}>
                        <Badge
                            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                            badgeContent={
                                <IconButton
                                    size="small"
                                    color='error'
                                    onClick={() => onDeleteClick(i)}
                                >
                                    <RemoveCircleIcon fontSize='small'/>
                                </IconButton>
                            }
                        >
                            <Avatar
                                src={url}
                                alt={url}
                                variant="rounded"
                                sx={{width: size, height: size}}
                            />
                        </Badge>
                    </Grid>
                ))
            }
            <Grid item>
                <Box sx={{
                        width: size,
                        height: size,
                        display: hideUploadButton ? 'none' : 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <label htmlFor="images">
                        <Input
                            accept="image/*"
                            id="images"
                            multiple
                            type="file"
                            onChange={onUploadChange}
                        />
                        <IconButton component='span'>
                            <AddPhotoAlternateIcon fontSize="large"/>
                        </IconButton>
                    </label>
                </Box>
            </Grid>
        </>
    )
}

export default MultipleImageUpload