import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import IntroMessage from './IntroMessage';

const IntroDialog = () => {
    const [end, setEnd] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setEnd(true);
        }, 9000)
    }, [])
    
    return (
        <IntroMessage
            end={end}
        />
    )
}

export default IntroDialog;
