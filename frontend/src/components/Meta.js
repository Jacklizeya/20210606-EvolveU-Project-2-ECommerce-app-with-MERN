import React from 'react'
import Helmet from "react-helmet"

function Meta({title, description, keywords}) {
    return (
        <div>
            <Helmet>
                <title> {title} </title>
                <meta name="description" content={description}/> 
                <meta name="keyword" content={keywords}/>
            </Helmet>
        </div>
    )
}

Meta.defaultProps = { title: "Welcome to 3D Store",
description: "We sell high quality 3D products",
keywords: "3D printer, 3D scanner, 3D filament, 3D accessory"}

export default Meta
