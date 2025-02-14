import { Navigate, Route, Routes, useLocation } from "react-router";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { CitiesContextPro } from "./contexts/CitiesContextPro";
import City from "./components/City";
import Form from "./components/Form";
import { AuthContextPro } from "./contexts/AuthContextPro";
import ProtectedRoute from "./components/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import HomePage from "./pages/HomePage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  const location = useLocation(); // Get the current location

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.pathname.startsWith("/app")) {
  //     navigate("/");
  //   }
  // }, [location.pathname, navigate]);

  return (
    <AuthContextPro>
      <Suspense fallback={<SpinnerFullPage />} key={location.pathname}>
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
      </Suspense>
    </AuthContextPro>
  );
}

export default App;
