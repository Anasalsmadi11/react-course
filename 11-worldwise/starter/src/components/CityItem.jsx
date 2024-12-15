import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
// import { useNavigate } from "react-router-dom";

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();
  // const navigate = useNavigate();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
    // navigate("/app/cities"); // this works if you don't want to put e.preve...
  }
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`} // when you add / in the beginning react considers it as absolute path and replaces it with the existing path, but when you don't put it in the beginning react considers it as relative path and adds it on top of  the current path
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
