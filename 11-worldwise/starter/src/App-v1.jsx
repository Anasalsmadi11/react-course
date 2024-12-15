import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider, useCities } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuth";
// import NavigatePage from "./components/NavigatePage";

function App() {
  // const{cities, isLoading}= useCities()
  // console.log(cities)
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* <NavigatePage/> */}
          <Routes>
            <Route index element={<HomePage />} />
            {/*with this once the app is opened it will directly go to home page */}
            <Route path="pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            {/* not important to put / here */}
            <Route path="/login" element={<Login />} />{" "}
            {/* react checks if the path in the url equals to /login then displays the login component */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              {/* the "index element" is the default of what appear once i hit the app route or what appears when i return from one of the children routes like cities because without it when i return nothing will appear 
          Navigate is a react component that take us to cities once i hit the app route.
          */}

              <Route path="cities" element={<CityList />} />
              <Route path="cities/:cityId" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />{" "}
            {/* "*" catch all the non existing routes */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
