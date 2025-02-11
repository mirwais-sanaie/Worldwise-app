// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrl } from "../hooks/useUrl";
import { useCitiesContext } from "../contexts/CitiesContextPro";
import { useNavigate } from "react-router";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = useUrl();
  const { createCity } = useCitiesContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName && !date) {
      alert("Enter city name and date");
    }
    const newCity = {
      cityName,
      country,
      date: date.toISOString(),
      notes,
      position: { lat, lng },
      emoji,
    };
    createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(
    function () {
      async function getCityDetails() {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCountry(data);
          setEmoji(convertToEmoji(data.countryCode));
          setCityName(data.city ? data.city : data.countryName);
        } catch (e) {
          console.log(e.message);
        }
      }
      getCityDetails();
    },
    [lat, lng]
  );

  return (
    <form className={`${styles.form}`} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd-MM-yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <ButtonBack type={"back"} />
      </div>
      <div className={styles.buttons}></div>
    </form>
  );
}

export default Form;
