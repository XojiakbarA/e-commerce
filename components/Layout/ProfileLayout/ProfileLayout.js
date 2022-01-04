import { Grid } from "@mui/material"
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { toggleLoginDialog } from "../../../redux/actions"
import { fetchUser } from "../../../api/user"

const ProfileLayout = ({children}) => {

    const user = useSelector(state => state.user?.data)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getUser() {
            try {
                await fetchUser()
            } catch (e) {
                if (e.response.status === 401) {
                    dispatch(toggleLoginDialog(true))
                }
            }
        }
        getUser()
    }, [dispatch, user])

    return (
        <>
            {
                user
                ?
                <Grid container spacing={2}>
                    <ProfileSidebar />
                    <Grid item lg={9}>
                        {children}
                    </Grid>
                </Grid>
                :
                null
            }
        </>
    )

}

export default ProfileLayout