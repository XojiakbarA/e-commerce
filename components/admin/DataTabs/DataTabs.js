import { useState } from 'react'
import { Tabs, Tab, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AddCategoryForm from '../../forms/AddCategoryForm'
import EditCategoryForm from '../../forms/EditCategoryForm'

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const DataTabs = ({ categories }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Paper>
            <Tabs
                variant='scrollable'
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                {
                    categories.map((category, i) => (
                        <Tab key={category.id} label={category.title} {...a11yProps(i)} />
                    ))
                }
                <Tab icon={<AddIcon/>} iconPosition='start' {...a11yProps(categories.length)}/>
            </Tabs>
            {
                categories.map((category, i) => (
                    <div
                        key={category.id}
                        role="tabpanel"
                        hidden={value !== i}
                        id={`vertical-tabpanel-${i}`}
                        aria-labelledby={`vertical-tab-${i}`}
                    >
                        <EditCategoryForm category={category}/>
                    </div>
                ))
            }
            <div
                role="tabpanel"
                hidden={value !== categories.length}
                id={`vertical-tabpanel-${categories.length}`}
                aria-labelledby={`vertical-tab-${categories.length}`}
            >
                <AddCategoryForm/>
            </div>
        </Paper>
    )
}

export default DataTabs