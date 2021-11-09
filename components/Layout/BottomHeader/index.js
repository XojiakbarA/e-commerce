import PropTypes from 'prop-types'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import { Container, AppBar, Toolbar, Slide, Box } from '@mui/material'

import Navigation from './Navigation'
import MenuCategories from './MenuCategories'

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
};

const BottomHeader = (props) => {
    return (
        <HideOnScroll {...props}>
            <AppBar sx={{zIndex: 10}} color='inherit'>
                <Toolbar sx={{display: {xs: 'none', sm: 'block'}}} />
                <Container maxWidth='xl'>
                    <Toolbar>
                        <MenuCategories />
                        <Box sx={{flexGrow: 1}} />
                        <Navigation />
                    </Toolbar>
                </Container>
            </AppBar>
        </HideOnScroll>
    );
}

export default BottomHeader