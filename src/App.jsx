import React from "react";
import "./App.css";
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css"

import PrototypeGrid from './components/PrototypeGrid'
import AddChart from './components/AddChart'
import ReactQueryTrials from './components/ReactQueryTrials'

function App() {
  return ( 
  <div>
    {/* <ChartTests /> */}
    {/* <PrototypeGrid /> */}
    {/* <AddChart /> */}
    <ReactQueryTrials />
  </div>
  );
}

export default App;
