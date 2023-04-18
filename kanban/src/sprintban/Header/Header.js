import { useState, useEffect } from 'react';

function Header(){

    const [currentSprint, setCurrentSprint] = useState(null)

    useEffect(() => {
        // get a current sprint number
        const getCurrentSprint = async () => {
            try {
                const response = await fetch('http://localhost:8000/project/currentSprint')
                if (response.status === 200) {
                    const csprint = await response.json()
                    setCurrentSprint(csprint)
                }
            } catch (err) {
                console.error(err)
            }
        }
        getCurrentSprint();
        console.log(currentSprint)
    }, [])
   
    return(
        <div className="header">
            <h1>{currentSprint} спринт</h1>
            <button>О проекте</button>
        </div>
    )
};

export default Header;