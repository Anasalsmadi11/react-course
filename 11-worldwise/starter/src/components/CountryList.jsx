import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []); /// this term "arr.map(el =>el.country)" is an array of countries names try console.log(Array.isArray(aa));

  // let arr=[]
  // const countries= cities.map((city) =>{ // this works only if we replaced countries with arr down in line 28
  //     if(!arr.map(el =>el.country).includes(city.country)) { arr.push({country:city.country, emoji: city.emoji})
  // }})
  // console.log(arr)

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
