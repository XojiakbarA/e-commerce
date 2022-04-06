import { IconButton, Popover, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto'
import { useState } from 'react'
import { useTheme } from '../../app/hooks/useTheme'

const ToggleThemeButton = () => {

    const { mode, handleModeChange } = useTheme()

    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'toggle-theme' : undefined

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Tooltip title='Switch Theme'>
                <IconButton aria-describedby={id} onClick={handleClick}>
                    {
                        mode === 'light' ?
                        <LightModeIcon/>
                        :
                        mode === 'dark' ?
                        <DarkModeIcon/>
                        :
                        <BrightnessAutoIcon/>
                    }
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={handleModeChange}
                    aria-label="change mode"
                >
                    <ToggleButton value="light" aria-label="left aligned">
                        <LightModeIcon/>
                    </ToggleButton>
                    <ToggleButton value="dark" aria-label="centered">
                        <DarkModeIcon/>
                    </ToggleButton>
                    <ToggleButton value="" aria-label="right aligned">
                        <BrightnessAutoIcon/>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Popover>
        </div>
    )
}

export default ToggleThemeButton