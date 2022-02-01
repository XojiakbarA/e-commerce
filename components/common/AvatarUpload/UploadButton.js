import { PhotoCamera } from "@mui/icons-material"
import { IconButton, Input, Tooltip } from "@mui/material"
import { Box } from "@mui/system"

const UploadButton = ({onChange, value, styles, title}) => {
    return (
        <Box sx={styles}>
        <label htmlFor={value}>
            <Input
                accept="image/*"
                id={value}
                type="file"
                sx={{display: 'none'}}
                name={value}
                onChange={onChange}
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