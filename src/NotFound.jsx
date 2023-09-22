import React, { useEffect } from 'react'

let NotFound = () => {

    useEffect(() => {
        document.title = "404 - Ferman Market";
    }, []);

    return (
        <div className="text-danger">
            <h1>404 - Page Not Found</h1>
        </div>
    )
}

export default NotFound