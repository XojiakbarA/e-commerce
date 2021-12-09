import { ListSubheader, Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { stringToArray } from "../../../utils/utils"

const BrandList = () => {

    const router = useRouter()
    const brands = useSelector(state => state.brands)
    
    const brand_id_arr = router.query.brand_id ? stringToArray(router.query.brand_id) : null
    const initChecked = brand_id_arr || Array(brands.length).fill(0)

    const [checked, setChecked] = useState(initChecked)

    function handleChange(e, i) {
        const newArray = [...checked]
        newArray[i] = checked[i] ? 0 : e.target.value
        setChecked(newArray)

        const strArr = newArray.toString()
        
        router.push({
            pathname: router.pathname,
            query: { ...router.query, brand_id: strArr, page: 1}
        }, null, {scroll: false})
    }

    return(
        <Box>
            <ListSubheader>Brands</ListSubheader>
            <FormGroup>
                {
                    brands.map((brand, i) => (
                        <FormControlLabel
                            key={brand.id}
                            control={<Checkbox />}
                            label={brand.title}
                            value={brand.id}
                            checked={Boolean(checked[i])}
                            onClick={ (e) => handleChange(e, i) }
                        />
                    ))
                }
            </FormGroup>
        </Box>
    )
}

export default BrandList