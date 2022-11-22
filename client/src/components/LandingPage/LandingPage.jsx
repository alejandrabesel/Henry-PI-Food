import React from 'react';
import { Link } from 'react-router-dom';
import styles from  './LandingPage.module.css';

const LandingPage = (props) => {
    return (

        <div className = {styles.landingPage}> 
            <h1 className= {styles.title}> Welcome </h1>
            <h3 className= {styles.subtitle}> to my cooking website!</h3>
            <Link to = '/home'>
                <button className = {styles.button}> Ready to cook? Suit up! </button>
            </Link>
        </div>


    )
}

export default LandingPage;