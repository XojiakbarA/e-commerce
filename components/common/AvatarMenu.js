import {Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Input, CircularProgress} from '@mui/material'
import {useState} from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserImage } from '../../app/store/actions/async/user'

const AvatarButton = ({ handleUploadChange, value, src}) => {

    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const user = useSelector(state => state.user)
    const isLoading = useSelector(state => state.toggle.isLoading)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDeleteImage = () => {
        dispatch(deleteUserImage(user.image.id))
    }

    return (
        <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Change Image" placement='right'>
                <IconButton
                    onClick={handleClick}
                    size="large"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disabled={isLoading}
                >
                    <Avatar
                        sx={{ width: 70, height: 70 }}
                        src={src}
                    />
                    {
                        isLoading &&
                        <CircularProgress sx={{position: 'absolute'}}/>
                    }
                </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem
                onClick={e => {
                    handleDeleteImage()
                    handleClose()
                }}
                disabled={!Boolean(user.image)}
            >
                <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                Delete
            </MenuItem>
            <label htmlFor={value}>
                <Input
                    accept="image/*"
                    id={value}
                    type="file"
                    sx={{display: 'none'}}
                    name={value}
                    onChange={e => {
                        handleUploadChange(e)
                        handleClose()
                    }}
                />
                <MenuItem aria-label="upload picture" component="span">
                    <ListItemIcon>
                        <AddAPhotoIcon fontSize="small" />
                    </ListItemIcon>
                    Add
                </MenuItem>
            </label>
            
        </Menu>
        </>
    );
}

export default AvatarButton