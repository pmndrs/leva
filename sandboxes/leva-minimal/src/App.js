import React from "react";
import { useControls, Leva } from "leva";
import "./styles.css";

export default function App() {
  const data = useControls({
    first: { value: 0, min: -10, max: 10 },
  });

  return (
    <>

      <Leva />
    
      <div className="App">
        <pre>{JSON.stringify(data, null, "  ")}</pre>
      </div>
    </>
  );
}
