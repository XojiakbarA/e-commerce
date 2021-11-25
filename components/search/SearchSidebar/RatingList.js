import { ListSubheader, Rating, FormControlLabel, FormGroup, Checkbox, Box } from "@mui/material"

const arr = [5, 4, 3, 2, 1]

const RatingList = () => {
    return(
        <Box sx={{marginTop: 2}}>
            <ListSubheader component="div">
                Rating
            </ListSubheader>
            <FormGroup>
                {
                    arr.map((num, i) => (
                        <FormControlLabel key={i} control={<Checkbox />} label={<Rating size='small' value={num} readOnly />} />
                    ))
                }
            </FormGroup>
        </Box>
    )
}

export default RatingList