import styles from "./CountryList.module.css";

function CountryList() {
  // if (!cities?.length)
  //   return <Message message={`Add your first city by clicking on the map`} />;

  // const countries = cities.reduce((arr, city) => {
  //   console.log(arr);
  //   if (!arr.map((el) => el.country).includes(city.country)) {
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   } else {
  //     return arr;
  //   }
  // }, []);

  return (
    <ul className={styles.countryList}>
      {/* {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))} */}
      <p>Country list</p>
    </ul>
  );
}

export default CountryList;
