/* eslint-disable react/prop-types */

import { useCities } from '../contexts/CitiesContext';
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));


    

function CityItem({city}) {
    const {currentCity,deleteCity} = useCities();
    const {cityName,emoji ,date,id,position} = city;

    function handleDelete(e){
        e.preventDefault();
        deleteCity(id);
    }
    return (
        <li >
            <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}  className={`${styles.cityItem} ${id===currentCity.id?styles['cityItem--active']:""}`}>
           <span className={styles.emoji}>{emoji}</span>
           <h3 className={styles.name}>{cityName}</h3>
           <time className={styles.date} >{formatDate(date)}</time>
           <button onClick={handleDelete} className={styles.deleteBtn}>&times;</button>
           </Link>
        </li>
    )
}

export default CityItem
