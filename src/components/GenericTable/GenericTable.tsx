import React, { JSX } from "react";
import "./GenericTable.css";

interface GenericTableProps<T> {
  headers: React.ReactNode[]; 
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
}

const GenericTable = <T,>({ headers, data, renderRow }: GenericTableProps<T>): JSX.Element => {
  return (
    <table className="genericTable">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="tableHeader">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>{renderRow(item, index)}</React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;