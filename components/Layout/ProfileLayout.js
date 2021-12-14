import { Grid, Stack } from "@mui/material"
import ProfileSidebar from "../../components/profile/ProfileSidebar/ProfileSidebar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { toggleLoginDialog } from "../../redux/actions"
import { fetchUser } from "../../api/user"

const ProfileLayout = ({children}) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getUs() {
            try {
                await fetchUser()
            } catch (e) {
                dispatch(toggleLoginDialog(true))
            }
        }
        getUs()
    }, [dispatch, user])

    return (
        <>
            {
                !user
                ?
                false
                :
                <Grid container spacing={2}>
                    <ProfileSidebar />
                    <Grid item lg={9}>
                        <Stack spacing={3}>
                            {children}
                        </Stack>
                    </Grid>
                </Grid>
            }
        </>
    )

}

export default ProfileLayout