import { useState } from "react";
import HierarchyTable from "./LumelTest/HierarchicalTable";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <HierarchyTable />
    </main>
  );
}

export default App;
