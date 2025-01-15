import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenericTable  from './GenericTable';

interface TestData {
  id: number;
  name: string;
  value: string;
}

const headers = ['ID', 'Name', <span key="value">Value</span>];
describe('GenericTable', () => {
  it('renders headers and data rows correctly', () => {
    const data: TestData[] = [
      { id: 1, name: 'Item 1', value: 'Value 1' },
      { id: 2, name: 'Item 2', value: 'Value 2' },
    ];
    const renderRow = (item: TestData, index: number) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.value}</td>
      </tr>
    );
    render(<GenericTable headers={headers} data={data} renderRow={renderRow} />);

    headers.forEach((header) => {
      if (typeof header === 'string') {
        expect(screen.getByText(header)).toBeInTheDocument();
      } else if (React.isValidElement(header)) {
        expect(screen.getByText('Value')).toBeInTheDocument(); 
      }
    });

    // Check rows
    data.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.value)).toBeInTheDocument();
      expect(screen.getByText(String(item.id))).toBeInTheDocument();
    });
  });

  it('renders an empty table when no data is provided', () => {
    const headers = ['ID', 'Name', 'Value'];
    const data: TestData[] = [];

    render(<GenericTable headers={headers} data={data} renderRow={() => null} />);

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
    expect(screen.queryByRole('row', { name: /Item/ })).not.toBeInTheDocument();
  });

});
