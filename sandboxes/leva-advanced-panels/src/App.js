import React from "react";
import { usePanel, usePanelControls, LevaPanel, LevaStoreProvider } from "leva";
import "./styles.css";

function MyComponent() {
  usePanelControls({ point: [0, 0] });
  return null;
}

export default function App() {
  const [, store1] = usePanel({ color: "#fff" });
  const [, store2] = usePanel({ boolean: true });
  return (
    <div
      style={{
        display: "grid",
        width: 300,
        gridRowGap: 10,
        padding: 10,
        background: "#fff"
      }}
    >
      <LevaPanel store={store1} />
      <LevaPanel store={store2} />
      <LevaStoreProvider store={store1}>
        <MyComponent />
      </LevaStoreProvider>
    </div>
  );
}
