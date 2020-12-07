import React from 'react';


const GlobalAlert = ({ text, color }) => {
    

    if (text === '') return <></>

    return (
        <div color={color}>{text}</div>
    )
}

export default GlobalAlert;