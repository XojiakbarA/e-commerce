import { useState } from "react"

export const useRipple = () => {

    const [ripple, setRipple] = useState(false)

    const handleAOnMouseEnter = () => setRipple(true)

    const handleOnMouseLeave = () => setRipple(false)

    return [
        ripple,
        {
            onMouseEnter: handleAOnMouseEnter,
            onMouseLeave: handleOnMouseLeave
        }
    ]

}