import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Viewer from "./Components/Viewer";
import Plot from "react-plotly.js";

function App() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <Viewer selectAtom={setSelected}></Viewer>

      <Plot
        data={[
          {
            type: "heatmap",
            z: [
              [1, 3, 5],
              [2, 4, 6],
              [selected, selected, selected],
            ],
          },
        ]}
        layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      ></Plot>
    </div>
  );
}

export default App;
