import React from "react";
import "./App.css";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css"

import PrototypeGrid from './components/PrototypeGrid'
import AddChart from './components/AddChart'

function App() {
  return ( 
  <div>
    {/* <ChartTests /> */}
    <PrototypeGrid />
    {/* <AddChart /> */}
  </div>
  );
}

export default App;
