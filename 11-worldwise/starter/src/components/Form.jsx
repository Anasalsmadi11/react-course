// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const { addNewCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { lat, lng } = useUrlPosition();
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("");

  const navigate = useNavigate();
  useEffect(
    function () {
      async function getCityData() {
        // with this i get the city data into the form whenever the lat, lng changes
        try {
          if (!lat && !lng) return;
          setGeoCodingError("");
          setIsLoadingGeoCoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          console.log(data);
          if (!data.countryCode)
            throw new Error(
              "this doesn't seem to be a city, try somewhere else🤖"
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setGeoCodingError(error.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      getCityData();
    },
    [lat, lng]
  );

  if (!lat && !lng)
    return <Message message="start by clicking somewhere in the map🤗" />;
  if (geoCodingError) return <Message message={geoCodingError} />;
  if (isLoadingGeoCoding) return <Spinner />;

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      // didn't add an id cause it will be added by the fake json sever.
      cityName,
      country,
      emoji,
      date,
      position: {
        lat,
        lng,
      },
      notes,
    };
    await addNewCity(newCity); // here it works even without await, however i don't want to navigate to cities to see the new city before the function addNewCity finish executing.

    navigate(`/app/cities`); // when you add / in the beginning react considers it as absolute path and replaces it with the existing path, but when you don't put it in the beginning react considers it as relative path and gets added on top of  the current path
  }
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
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
          id="data"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
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
        <Button type="primary">Add</Button>
        <BackButton>&larr; Back</BackButton>
      </div>
    </form>
  );
}

export default Form;
