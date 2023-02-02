import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes Import
// import Station from './routes/Station';
import Booking from './routes/Booking';
import Train from './routes/Train';
import ShowWagon from './routes/ShowWagon';
import ShowWagonTrace from './routes/ShowWagonTrace';
import ShowTransportBooking from './routes/ShowTransportBooking';
import Util from './routes/Util';
import Help from './routes/Help';
import Layout from './components/Menu/Layout';

import Station from './pages/Station';

// styles
import './App.css';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Station />} /> */}
          <Route path="booking" element={<Booking />} />
          <Route path="train" element={<Train />} />
          <Route path="show-wagon" element={<ShowWagon />} />
          <Route path="show-wagon-trace" element={<ShowWagonTrace />} />
          <Route path="show-transport-booking" element={<ShowTransportBooking />} />
          <Route path="util" element={<Util />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>

      <Station />
    </main>
  );
}

export default App;
