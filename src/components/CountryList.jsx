import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
    const {isLoading,cities} = useCities();
    if(isLoading) return <Spinner/>

    if(!cities.length){
        return <Message message='Add your first country by clicking on a city on the map'/>
    }
    
    const countries = cities.reduce((arr, city) => {  
      // Check if the country already exists in the countries array  
      if (!arr.some(el => el.country === city.country)) {  
          return [...arr, { country: city.country, emoji: city.emoji }];  
      } else {  
          return arr; // If it exists, return the array unchanged  
      }  
  }, []);
            
      

    return (
        <ul className={styles.countriesList}>
          {
            countries.map((country)=><CountryItem country={country} key={country.id}/>)
          }
        </ul>
    )
}

export default CountryList;
