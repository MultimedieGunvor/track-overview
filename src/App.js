import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes Import
import Station from './pages/Station';
import Booking from './pages/Booking';
import Train from './pages/Train';
import ShowWagon from './pages/ShowWagon';
import ShowWagonTrace from './pages/ShowWagonTrace';
import ShowTransportBooking from './pages/ShowTransportBooking';
import Util from './pages/Util';
import Help from './pages/Help';
import Layout from './components/Menu/Layout';

// styles
import './App.css';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Station />} />
          <Route path="booking" element={<Booking />} />
          <Route path="train" element={<Train />} />
          <Route path="show-wagon" element={<ShowWagon />} />
          <Route path="show-wagon-trace" element={<ShowWagonTrace />} />
          <Route path="show-transport-booking" element={<ShowTransportBooking />} />
          <Route path="util" element={<Util />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
