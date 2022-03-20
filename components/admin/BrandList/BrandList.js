import { List, ListSubheader, Paper } from "@mui/material"
import BrandListItem from "./BrandListItem"
import AddBrandListItem from "./AddBrandListItem"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import { useToggle } from "../../../app/hooks/useToggle"
import { useFieldTitle } from "../../../app/hooks/useFormik/useFieldTitle"
import { useDispatch } from "react-redux"
import { deleteBrand } from "../../../app/store/actions/async/admin"

const BrandList = ({ brands }) => {

    const dispatch = useDispatch()

    const { deleteBrandDialog, closeDeleteBrandDialog } = useToggle()

    const { isOpen, text, payload } = deleteBrandDialog

    const { isSubmitting, setSubmitting } = useFieldTitle()

    const handleDeleteClick = () => {
        dispatch(deleteBrand(payload.id, setSubmitting))
    }

    return (
        <Paper>
            <List>
                <ListSubheader>Brands</ListSubheader>
                {
                    brands.map(brand => (
                        <BrandListItem key={brand.id} brand={brand}/>
                    ))
                }
                <AddBrandListItem/>
            </List>
            <ConfirmDialog
                open={isOpen}
                loading={isSubmitting}
                content={text}
                handleCancelClick={closeDeleteBrandDialog}
                handleConfirmClick={handleDeleteClick}
            />
        </Paper>
    )
}

export default BrandList