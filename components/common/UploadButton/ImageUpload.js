import { Box, IconButton, Badge, CardMedia, CardActionArea, Avatar } from '@mui/material'
import { useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import ImageIcon from '@mui/icons-material/Image'
import UploadMenu from './UploadMenu'

const ImageUpload = ({
    handlePrewiewDeleteClick, handleUploadChange, handleDeleteImage,
    isLoading, name, src, preview, width, height, ...others
}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box {...others}>
            <Badge
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                badgeContent={
                    preview &&
                    <IconButton
                        color='error'
                        onClick={handlePrewiewDeleteClick}>
                        <RemoveCircleIcon/>
                    </IconButton>
                }
                sx={{width: '100%'}}
            >
                <CardActionArea
                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disabled={isLoading}
                    sx={{width: '100%', borderRadius: 1}}
                >
                    {
                        preview || src
                        ?
                        <Avatar
                            variant='rounded'
                            src={preview || src}
                            alt={preview || src}
                            sx={{ width: width ?? '100%', height: height, borderRadius: 1 }}
                        />
                        :
                        <Box
                            width={width}
                            height={height}
                            display='flex' justifyContent='center' alignItems='center'
                        >
                            <ImageIcon fontSize='large' color='action'/>
                        </Box>
                    }
                </CardActionArea>
            </Badge>
            <UploadMenu
                open={open}
                anchorEl={anchorEl}
                name={name}
                disabled={!src}
                handleClose={handleClose}
                handleDeleteImage={handleDeleteImage}
                handleUploadChange={handleUploadChange}
            />
        </Box>
    );
}

export default ImageUpload