import React, { useState } from "react";
import "./App.css";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css"

import ChartTests from './components/ChartTests'
import PrototypeGrid from './components/PrototypeGrid'

function App() {
  return ( 
  <div>
    {/* <ChartTests /> */}
    <PrototypeGrid />
  </div>
  );
}

export default App;
