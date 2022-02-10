import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"


export const useAdminSearch = (labelsGenerator) => {

    const router = useRouter()

    const labels = useRef(labelsGenerator())

    const [ filterBy, setFilterBy ] = useState(null)

    useEffect(() => {
        setFilterBy(labels.current.next())
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        const field = filterBy.value.field
        const query = {}
        query[field] = value

        if (e.keyCode === 13) {
            if (!value) return
            router.push({query})
        }
    }

    const handleClick = () => {
        if (filterBy.done) labels.current = labelsGenerator()
        setFilterBy(labels.current.next())
    }

    return {
        label: filterBy?.value?.label,
        handleSearch,
        handleClick
    }
}