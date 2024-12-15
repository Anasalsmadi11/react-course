import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

{
  /*
  
seconde solution: using reducer
  */
}

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext(); // should start with capital cus it is comp

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("action type undefined");
  }
}
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error fetching cities",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return; //Number cus anything comes from the url is a string
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error fetching city data",
      });
    }
  }

  async function addNewCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error adding new city data",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error deleting city data",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        addNewCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("you are using it outside the provider");
  return context;
}

export { CitiesProvider, useCities };

{
  /*
  
first solution: using states
  */
}

// import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = "http://localhost:9000";
// const CitiesContext = createContext(); // should start with capital cus it is comp

// function CitiesProvider({ children }) {
//   const [cities, setCities] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentCity, setCurrentCity] = useState({});

//   useEffect(function () {
//     async function fetchCities() {
//       try {
//         setIsLoading(true);
//         const res = await fetch(`${BASE_URL}/cities`);
//         const data = await res.json();
//         setIsLoading(false);
//         setCities(data);
//       } catch {
//         alert("there wan an error fetching data");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchCities();
//   }, []);

//   async function getCity(id) {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_URL}/cities/${id}`);
//       const data = await res.json();
//       setCurrentCity(data);
//       setIsLoading(false);
//     } catch {
//       alert('"there wan an error fetching data"');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function addNewCity(newCity) {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_URL}/cities`, {
//         method: "POST",
//         body: JSON.stringify(newCity),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await res.json();
//       console.log(data);
//       setCities([...cities, data]); // we do this because the current cities doesn't have the new city even though it is added to the cities.json but won't appear unless i refresh the page, also once the cities changes it invoke the useEffect in
//     } catch {
//       alert("there was an error creating new city");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function deleteCity(id) {
//     try {
//       setIsLoading(true);
//       await fetch(`${BASE_URL}/cities/${id}`, {
//         method: "DELETE",
//       });
//       setCities((cities) => cities.filter((city) => city.id !== id));
//     } catch {
//       alert("there was an error deleting city");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <CitiesContext.Provider
//       value={{
//         cities,
//         isLoading,
//         currentCity,
//         getCity,
//         addNewCity,
//         deleteCity,
//       }}
//     >
//       {children}
//     </CitiesContext.Provider>
//   );
// }

// function useCities() {
//   const context = useContext(CitiesContext);
//   if (context === undefined)
//     throw new Error("you are using it outside the provider");
//   return context;
// }

// export { CitiesProvider, useCities };
