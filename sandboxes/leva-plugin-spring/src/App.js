import React from "react";
import { useControls } from "leva";

import { spring } from "@leva-ui/plugin-spring";

import "./styles.css";

export default function App() {
  const { mySpring } = useControls({
    mySpring: spring({ tension: 100, friction: 30 })
  });

  return (
    <div className="App">
      <pre>{JSON.stringify(mySpring, null, "  ")}</pre>
    </div>
  );
}
