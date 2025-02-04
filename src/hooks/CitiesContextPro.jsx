import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesContextPro({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getCities() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/cities`);
        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch (e) {
        console.log(e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    getCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, loading, error }}>
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
