import { List, ListSubheader, Paper } from "@mui/material"
import BrandListItem from "./BrandListItem"
import AddBrandListItem from "./AddBrandListItem"
import ConfirmDialog from "../../dialogs/ConfirmDialog"
import { useToggle } from "../../../app/hooks/useToggle"
import { useBrand } from "../../../app/hooks/useFormik/useBrand"

const BrandList = ({ brands }) => {

    const { deleteBrandDialog, closeDeleteBrandDialog } = useToggle()

    const { isOpen, text, payload } = deleteBrandDialog

    const { isSubmitting, handleDeleteConfirmClick } = useBrand(payload)

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
                handleConfirmClick={handleDeleteConfirmClick}
            />
        </Paper>
    )
}

export default BrandList