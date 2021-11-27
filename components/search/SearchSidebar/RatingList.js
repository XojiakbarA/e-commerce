import { ListSubheader, Rating, FormControlLabel, FormGroup, Checkbox, Box } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"

const arr = [5, 4, 3, 2, 1]

const RatingList = () => {

    const router = useRouter()

    const [checked, setChecked] = useState(Array(arr.length).fill(0))
console.log(checked)

    function handleChange(e, i) {
        const newArray = [...checked]
        newArray[i] = checked[i] ? 0 : e.target.value
        setChecked(newArray)

        const strArr = newArray.toString()

        router.push({
            pathname: '/search',
            query: { ...router.query, rating: strArr, page: 1}
        }, null, {scroll: false})
    }

    return(
        <Box sx={{marginTop: 2}}>
            <ListSubheader component="div">
                Rating
            </ListSubheader>
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