import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header(){

    const [currentSprint, setCurrentSprint] = useState(null)

    // useEffect(() => {
    //     // get a current sprint number
    //     const getCurrentSprint = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8000/project/currentSprint')
    //             if (response.status === 200) {
    //                 const csprint = await response.json()
    //                 setCurrentSprint(csprint)
    //             }
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     }
    //     getCurrentSprint();
    // }, [])
   
    return(
        <div className="header">
            {/* <h1>{currentSprint} спринт</h1> */}
            <h1>Header</h1>
            <Link to='/project'>О проекте</Link>
        </div>
    )
};

export default Header;