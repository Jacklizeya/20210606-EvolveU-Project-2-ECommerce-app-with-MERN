import React from 'react'
import {Alert} from "react-bootstrap"

export default function Message({variant, children}) {
    console.log("variant", variant)
    console.log("children", children)
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    variant: "info"
}


