import React, { useState } from "react";
import { TableData } from "./types";

type TableRowProps = {
  row: TableData;
  onUpdate: (payload: TableData) => void;
};

const TableRow: React.FC<TableRowProps> = ({ row, onUpdate }) => {
  // Calculate Variance: ((New - Original) / Original) * 100
  //   const variance = ((row.value - row.originalValue) / row.originalValue) * 100;
  const Computevariance = (row: Pick<TableData, "value" | "originalValue">) => {
    if (row.originalValue) {
      return ((row.value - row.originalValue) / row.originalValue) * 100;
    }
    return 0;
  };

  const handleUpdate = (
    id: string,
    value: number,
    type: "percentage" | "value"
  ) => {
    if (typeof value === "number" && !Number.isNaN(value) && value >= 0) {
      let updateChildren: TableData["children"] = [];
      if (type === "value") {
        updateChildren = row.children.map((child) => {
          if (child.id === id) {
            return { ...child, value };
          }
          return child;
        });
      }
      if (type === "percentage") {
        updateChildren = row.children.map((child) => {
          if (child.id === id) {
            return {
              ...child,
              value: child.value + (child.value / 100) * value,
            };
          }
          return child;
        });
      }
      onUpdate({
        ...row,
        value: updateChildren.reduce((acc, curr) => acc + curr.value, 0),
        children: updateChildren,
      });
    }
  };

  return (
    <>
      <tr>
        <td className="p-4">{row.label}</td>
        <td className="p-4 text-right">{row.value}</td>
        <td className="p-4">
          <input
            disabled
            type="number"
            placeholder="Enter value"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </td>
        <td className="p-4">
          <div className="flex justify-center">
            <button
              disabled
              onClick={() => {}}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              %
            </button>
          </div>
        </td>
        <td className="p-4">
          <div className="flex justify-center">
            <button
              disabled
              onClick={() => {}}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Val
            </button>
          </div>
        </td>
        <td className={`p-4 text-right text-sm`}>
          {Computevariance(row).toFixed(2)}%
        </td>
      </tr>
      {row.children &&
        row.children.map((child) => (
          <ChildRow key={child.id} data={child} handleUpdate={handleUpdate} />
        ))}
    </>
  );
};

const ChildRow = ({
  data,
  handleUpdate,
}: {
  data: TableData["children"][0];
  handleUpdate: (
    id: string,
    value: number,
    type: "percentage" | "value"
  ) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const variance = data.originalValue
    ? ((data.value - data.originalValue) / data.originalValue) * 100
    : 0;

  return (
    <tr>
      <td className="p-4">-- {data.label}</td>
      <td className="p-4 text-right">{data.value}</td>
      <td className="p-4">
        <input
          type="number"
          placeholder="Enter value"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </td>
      <td className="p-4">
        <div className="flex justify-center">
          <button
            onClick={() => {
              handleUpdate(data.id, +inputValue, "percentage");
              setInputValue("");
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            %
          </button>
        </div>
      </td>
      <td className="p-4">
        <div className="flex justify-center">
          <button
            onClick={() => {
              handleUpdate(data.id, +inputValue, "value");
              setInputValue("");
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Val
          </button>
        </div>
      </td>
      <td className={`p-4 text-right text-sm`}>{variance.toFixed(2)}%</td>
    </tr>
  );
};

export default TableRow;
