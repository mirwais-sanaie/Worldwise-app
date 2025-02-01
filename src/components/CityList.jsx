import styles from "./CityList.module.css";

function CityList() {
  // const { loading, error, cities } = useCities();
  // if (loading) return <Spinner />;

  // if (!cities.length)
  //   return <Message message={`Add your first city by clicking on the map`} />;
  return (
    <ul className={styles.cityList}>
      {/* {error && <p>Error fetching cities: {error.message}</p>}
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))} */}
      <p>City list</p>
    </ul>
  );
}

export default CityList;
