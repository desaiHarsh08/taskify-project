import React from "react"

const Heading = ({ pageHeading }) => {
    return (
        <h1 className="text-2xl text-blue-500 font-semibold">
            {pageHeading}
        </h1>
    )
}

export default Heading