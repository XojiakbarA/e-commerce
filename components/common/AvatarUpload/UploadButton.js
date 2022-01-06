import { PhotoCamera } from "@mui/icons-material"
import { IconButton, Input, Tooltip } from "@mui/material"
import { Box } from "@mui/system"

const UploadButton = ({setFieldValue, value, styles, title}) => {
    return (
        <Box sx={styles}>
        <label htmlFor={value}>
            <Input
                accept="image/*"
                id={value}
                type="file"
                sx={{display: 'none'}}
                name={value}
                onChange={e => setFieldValue(value, e.target.files[0])}
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