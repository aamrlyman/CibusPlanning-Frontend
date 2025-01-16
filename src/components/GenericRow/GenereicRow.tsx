import React, { JSX } from "react";
import { Link } from "react-router-dom";

interface MealRowProps<T> {
  item: T;
  renderColumns: (item: T) => React.ReactNode[];
  actions?: React.ReactNode; 
  rowKey: string | number; 
  customClassName?: string; 
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
