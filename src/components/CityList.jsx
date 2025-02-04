import { useCitiesContext } from "../hooks/CitiesContextPro";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";

function CityList() {
  const { loading, error, cities } = useCitiesContext();
  if (loading) return <Spinner />;

  if (!cities.length)
    return <Message message={`Add your first city by clicking on the map`} />;
  return (
    <ul className={styles.cityList}>
      {error && <p>Error fetching cities: {error.message}</p>}
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
