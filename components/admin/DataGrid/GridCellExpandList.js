import * as React from 'react'
import PropTypes from 'prop-types'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Box, Paper, Popper } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import { appURL } from '../../../utils/utils'

const GridCellExpandList = React.memo(function GridCellExpand(props) {
    const { width, value, children } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        setShowPopper(true);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

    function handleKeyDown(nativeEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
            setShowFullCell(false);
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
}, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: 1,
                height: 1,
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            {children}
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <List>
                            {
                                value.map(product => (
                                    <ListItem
                                        key={product.id}
                                        dense
                                    >
                                        <ListItemAvatar>
                                        <Avatar
                                            variant='rounded'
                                            sx={{ width: 35, height:35, marginRight: 1 }}
                                            src={ product.main_image ? appURL + product.main_image : undefined }
                                        >
                                            <PhotoIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={product.title}
                                            secondary={`${product.quantity} x $${product.price}`}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

GridCellExpandList.propTypes = {
    width: PropTypes.number.isRequired,
}

export default GridCellExpandList