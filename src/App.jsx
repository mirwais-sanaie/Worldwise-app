import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { CitiesContextPro } from "./contexts/CitiesContextPro";
import City from "./components/City";
import Form from "./components/Form";
import { AuthContextPro } from "./contexts/AuthContextPro";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthContextPro>
      <CitiesContextPro>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to={"cities"} replace />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </CitiesContextPro>
    </AuthContextPro>
  );
}

export default App;
