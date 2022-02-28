import { Grid } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { wrapper } from "../../app/store"
import AdminPageHead from "../../components/common/AdminPageHead"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import RegionList from "../../components/admin/RegionList/RegionList"
import { getRegions } from "../../app/store/actions/async/admin"
import { useSelector } from "react-redux"
import DistrictList from "../../components/admin/DistrictList/DistrictList"
import { useState } from "react"
import FormSnackbar from "../../components/admin/FormSnackbar"

const Regions = () => {

    const regions = useSelector(state => state.regions)
    const { isOpen, text } = useSelector(state => state.toggle.formSnackbar)

    const [selected, setSelected] = useState(regions[0])

    const handleSelectedClick = (region) => {
        setSelected(region)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Regions & Districts'
                    titleIcon={<LocationOnIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={4}>
                <RegionList
                    regions={regions}
                    selected={selected}
                    handleSelectedClick={handleSelectedClick}
                />
            </Grid>
            <Grid item xs={4}>
                <DistrictList
                    districts={selected.districts}
                />
            </Grid>
            <FormSnackbar open={isOpen} text={text}/>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query, req}) => {

    const cookie = req?.headers.cookie

    await dispatch(getRegions(cookie))

})

export default Regions

Regions.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}