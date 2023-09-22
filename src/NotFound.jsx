import React, { useEffect } from 'react';

const NotFound = () => {
    useEffect(() => {
        document.title = "404 - Ferman Market";
    }, []);

    return (
        <div className="text-center mt-5">
            <h1 className="text-danger">404 - Page Not Found</h1>
            <p className="text-muted">The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;