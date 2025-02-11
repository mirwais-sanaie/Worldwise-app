import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:4000";

function CitiesContextPro({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState([]);

  useEffect(function () {
    async function getCities() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (e) {
        console.log(e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    getCities();
  }, []);

  async function getCity(id) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      console.log(data);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity) {
    // dispatch({ type: "loading" });
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      setCities([...cities, data]);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error("Error deleting city:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        error,
        currentCity,
        getCity,
        deleteCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error(
      "useCitiesContext must be used within a CitiesContextProvider"
    );
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesContextPro, useCitiesContext };
