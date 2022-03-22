import { Grid } from "@mui/material"
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { wrapper } from "../../app/store"
import AdminPageHead from "../../components/common/AdminPageHead"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import RegionList from "../../components/admin/RegionList/RegionList"
import { deleteDistrict, deleteRegion, getRegions } from "../../app/store/actions/async/admin"
import { useDispatch, useSelector } from "react-redux"
import DistrictList from "../../components/admin/DistrictList/DistrictList"
import { useState } from "react"
import ConfirmDialog from "../../components/dialogs/ConfirmDialog"
import { toggleDeleteDistrictDialog, toggleDeleteRegionDialog } from "../../app/store/actions/dialogActions"

const Regions = () => {

    const dispatch = useDispatch()

    const regions = useSelector(state => state.regions)
    const {
        loading, text, region_id, district_id,
        deleteRegionDialog, deleteDistrictDialog
    } = useSelector(state => state.dialog)

    const [selected, setSelected] = useState(regions[0])

    const handleSelectedClick = (region) => {
        setSelected(region)
    }
    const closeDeleteRegionDialog = () => {
        dispatch(toggleDeleteRegionDialog(false, null, null))
    }
    const closeDeleteDistrictDialog = () => {
        dispatch(toggleDeleteDistrictDialog(false, null, null))
    }
    const handleRegionDeleteClick = () => {
        dispatch(deleteRegion(region_id, handleSelectedClick))
    }
    const handleDistrictDeleteClick = () => {
        dispatch(deleteDistrict(district_id))
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
                <DistrictList region={selected}/>
            </Grid>
            <ConfirmDialog
                open={deleteRegionDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeDeleteRegionDialog}
                handleConfirmClick={handleRegionDeleteClick}
            />
            <ConfirmDialog
                open={deleteDistrictDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeDeleteDistrictDialog}
                handleConfirmClick={handleDistrictDeleteClick}
            />
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