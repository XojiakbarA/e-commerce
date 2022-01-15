import { ListSubheader, Rating, FormControlLabel, FormGroup, Checkbox, Box } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import { stringToArray } from "../../../utils/utils"

const arr = [5, 4, 3, 2, 1]

const RatingList = () => {

    const router = useRouter()

    const rating = router.query.rating ? stringToArray(router.query.rating) : null
    const initChecked = rating || Array(arr.length).fill(0)

    const [checked, setChecked] = useState(initChecked)

    function handleChange(e, i) {
        const newArray = [...checked]
        newArray[i] = checked[i] ? 0 : e.target.value
        setChecked(newArray)

        const strArr = newArray.toString()

        router.push({
            query: { ...router.query, rating: strArr, page: 1}
        }, null, {scroll: false})
    }

    return(
        <Box>
            <ListSubheader>Rating</ListSubheader>
            <FormGroup>
                {
                    arr.map((num, i) => (
                        <FormControlLabel
                            key={i}
                            control={<Checkbox />}
                            label={<Rating size='small' value={num} readOnly/>}
                            value={num}
                            checked={Boolean(checked[i])}
                            onChange={ (e) => handleChange(e, i) }
                        />
                    ))
                }
            </FormGroup>
        </Box>
    )
}

export default RatingList