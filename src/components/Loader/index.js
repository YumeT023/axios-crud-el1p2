import React from 'react';
import './style.css';

export const ThrobberLoader = () => {
    return (
        <div className="wrapper">
            <div className="loader-container">
                <div className="refreshing-loader"></div>
            </div>
        </div>
    )
}