import React, { JSX } from "react";
import { Link } from "react-router-dom";

interface MealRowProps<T> {
  item: T;
  renderColumns: (item: T) => React.ReactNode[];
  actions?: React.ReactNode; // Additional actions or buttons (e.g., delete, add, etc.)
  rowKey: string | number; // Unique key for the row
  customClassName?: string; // Custom class for styling rows
}

const GenericRow = <T,>({
  item,
  renderColumns,
  actions,
  rowKey,
  customClassName,
}: MealRowProps<T>): JSX.Element => {
  return (
    <tr key={rowKey} className={customClassName}>
      {renderColumns(item).map((column, index) => (
        <td key={index} className="userMealsTd">
          {column}
        </td>
      ))}
      {actions && <td className="actionsTd">{actions}</td>}
    </tr>
  );
};

export default GenericRow;
