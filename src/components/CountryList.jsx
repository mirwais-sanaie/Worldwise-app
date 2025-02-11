import { useCitiesContext } from "../contexts/CitiesContextPro";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, loading } = useCitiesContext();

  // Show spinner while loading
  if (loading) return <Spinner />;

  // Show message if there are no cities
  if (!cities || cities.length === 0) {
    return <Message message="Add your first city by clicking on the map" />;
  }

  // Get unique countries from the cities list
  const countries = cities.reduce((arr, city) => {
    // Check if the country is already in the array
    if (!arr.some((el) => el.countryName === city.countryName)) {
      // Add the country to the array
      return [
        ...arr,
        { countryName: city.countryName, emoji: city.emoji, id: city.id },
      ];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
