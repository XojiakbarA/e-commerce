import PropTypes from 'prop-types'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { AppBar, Toolbar, Slide, Box, Tooltip } from '@mui/material'
import MenuCategories from './MenuCategories'
import ButtonMenu from '../../common/Menu/ButtonMenu'
import ToggleThemeButton from '../../common/ToggleThemeButton'

function HideOnScroll({ children, window }) {
    
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    })

    return (
        <Slide appear={true} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
}

const navMenu = [
    {title: 'Home', href: '/'},
    {title: 'Shop', href: '/shops'},
    {title: 'About', href: '/about'},
    {title: 'Contact', href: '/contact'}
]


const BottomHeader = (props) => {
    return (
        <HideOnScroll {...props}>
            <AppBar color='inherit'>
                <Toolbar sx={{display: {xs: 'none', sm: 'block'}}} variant='dense'/>
                <Toolbar>
                    <MenuCategories />
                    <ButtonMenu menu={navMenu}/>
                    <Box sx={{flexGrow: 1}} />
                    <ToggleThemeButton/>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}

export default BottomHeader