import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HotelDetails from "./components/Hotels/HotelDetails";
import Checkout from './pages/Checkout';
import '@fontsource/poppins/400.css';  
import "react-datepicker/dist/react-datepicker.css";
import '@fontsource/poppins/700.css';   

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/hotel/:id/:name" element={<HotelDetails />} />
        <Route path='/checkout/:id' element={<Checkout />}/>
      </Routes>
    </Provider>
  );
};

export default App;
