import React, { useState } from "react";
import TableRow from "./TableRow";
import { TableData } from "./types";

const initialData: TableData[] = [
  {
    id: "electronics",
    label: "Electronics",
    originalValue: 1500,
    value: 1500,
    children: [
      { id: "phones", label: "Phones", originalValue: 800, value: 800 },
      { id: "laptops", label: "Laptops", originalValue: 700, value: 700 },
    ],
  },
  {
    id: "furniture",
    label: "Furniture",
    originalValue: 1000,
    value: 1000,
    children: [
      { id: "tables", label: "Tables", originalValue: 300, value: 300 },
      { id: "chairs", label: "Chairs", originalValue: 700, value: 700 },
    ],
  },
];

const HierarchyTable = () => {
  const [data, setData] = useState(initialData);

  // Main state handler
  const handleUpdate = (payload: TableData) => {
    setData(
      data.map((row) => {
        if (row.id === payload.id) {
          return payload;
        }
        return row;
      })
    );
  };

  return (
    <div className="p-4 md:p-10 bg min-h-screen">
      <div>
        <header className="mb-8">
          <h1 className="text-2xl">Hierarchy Table</h1>
        </header>

        <div className="border border-neutral-800">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase">
                <th className="p-4">Label</th>
                <th className="p-4 text-right">Value</th>
                <th className="p-4">Input</th>
                <th className="p-4">Allocation %</th>
                <th className="p-4">Allocation Val</th>
                <th className="p-4 text-right">Variance (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <TableRow key={row.id} row={row} onUpdate={handleUpdate} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HierarchyTable;
