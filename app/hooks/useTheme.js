import { useMediaQuery } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../store/actions/actionCreators"
import cookie from "js-cookie"

export const useTheme = () => {

    const dispatch = useDispatch()

    const isDark = useMediaQuery('(prefers-color-scheme: dark)')

    const mode = useSelector(state => state.toggle.theme)

    const handleModeChange = (e, newMode) => {
        if (newMode !== null) {
            cookie.set('theme', newMode)
            dispatch(setTheme(newMode))
        }
    }

    const theme = createTheme({
        palette: { mode: mode ? mode : isDark ? 'dark' : 'light' }
    })

    return { theme, mode, handleModeChange }
}