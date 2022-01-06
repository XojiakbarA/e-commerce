import { PhotoCamera } from "@mui/icons-material"
import { IconButton, Input, Tooltip } from "@mui/material"
import { Box } from "@mui/system"

const UploadButton = ({setFieldValue, styles, title}) => {
    return (
        <Box sx={styles}>
        <label htmlFor="icon-button-file">
            <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                sx={{display: 'none'}}
                name='image'
                onChange={e => setFieldValue('image', e.target.files[0])}
            />
            <Tooltip title={title ?? ''}>
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </Tooltip>
        </label>
        </Box>
    )
}

export default UploadButton