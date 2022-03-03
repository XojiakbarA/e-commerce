import { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'
import EditBannerForm from '../../forms/EditBannerForm'
import AddBannerForm from '../../forms/AddBannerForm'
import ConfirmDialog from '../../dialogs/ConfirmDialog'
import { useEditBanner } from '../../../app/hooks/useFormik/useEditBanner'
import { useToggle } from '../../../app/hooks/useToggle'

function TabPanel({children, value, index, ...other}) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ p: 2 }}>
                {children}
            </Box>
        )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const BannersFormTabs = ({ banner, handleBannerChange }) => {

    const { deleteBannerDialog, closeDeleteBannerDialog } = useToggle()

    const { isOpen, text, payload } = deleteBannerDialog

    const { isSubmitting, handleDeleteConfirmClick } = useEditBanner(payload, handleBannerChange)

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        icon={<EditIcon fontSize='small'/>}
                        {...a11yProps(0)}
                    />
                    <Tab
                        icon={<AddIcon fontSize='small'/>}
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <EditBannerForm banner={banner}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AddBannerForm/>
            </TabPanel>
            <ConfirmDialog
                open={isOpen}
                content={text}
                loading={isSubmitting}
                handleCancelClick={closeDeleteBannerDialog}
                handleConfirmClick={handleDeleteConfirmClick}
            />
        </Box>
    )
}

export default BannersFormTabs