import React, { useEffect, useState } from 'react';
import jsonData from './data.json';

const ORDERED_HEADERS = [
  "First Name",
  "Last Name",
  "Phone",
  "e-mail",
  "Primary Group",
  "Hours Studied"
] as const;

const HEADER_MAP = {
  "First Name": "firstName",
  "Last Name": "lastName",
  "Phone": "phoneNumber",
  "e-mail": "email",
  "Primary Group": "primaryGroup",
  "Hours Studied": "hoursStudied",
} as const;

type Header = keyof typeof HEADER_MAP;
type Attribute = typeof HEADER_MAP[Header];

type Entry = {
  [key in Attribute]: string;
};

type Sorting = '▼' | '▲' | '-';

type SortingState = {
  [key in Attribute]: Sorting;
};

const asc = (attr: Attribute) => (a: Entry, b: Entry) =>
  (a[attr] > b[attr]) ? 1 : ((b[attr] > a[attr]) ? -1 : 0);

const des = (attr: Attribute) => (a: Entry, b: Entry) =>
  (b[attr] > a[attr]) ? 1 : ((a[attr] > b[attr]) ? -1 : 0);

const getDefaultSortedData = (data: Entry[]) => data.sort(asc("firstName"));
const originalData = getDefaultSortedData(jsonData.students);

const getNextSorting = (current: Sorting) => {
  switch(current) {
    case '▼':
      return { icon: '▲', transform: des };
    case '▲':
      return { icon: '-', transform: asc };
    default:
      return { icon: '▼', transform: null };
  }
};

const initSortingState = () => Object.values(HEADER_MAP).reduce((acc, value) =>
    ({ ...acc, [value]: '▼' }), {} as SortingState);

export default function Table() {
  const [data, setData] = useState(originalData);
  const [searchValue, setSearchValue] = useState("");
  const [sorting, setSorting] = useState(initSortingState);

  useEffect(() => {
    if (searchValue.length > 0) {
      const newData = originalData.filter((entry) =>
        Object.values(entry).some((text) =>
          text.toLowerCase().includes(searchValue.toLowerCase())));
      setData(newData);
    } else {
      setData(originalData);
      setSorting(initSortingState());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const searchBar = (
    <div className="Search">
      <input
        aria-label="Search"
        placeholder="Search..."
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );

  const renderSortingButton = (header: Header) => {
    const attr = HEADER_MAP[header];
    const handleButtonClick = () => {
      const { icon, transform } = getNextSorting(sorting[attr]);
      const newData = transform ? data.sort(transform(attr)) : getDefaultSortedData(data);
      setData(newData);
      setSorting({ ...sorting, [attr]: icon });
    }
    return <span onClick={handleButtonClick}>{sorting[attr]}</span>;
  };

  const headerRow = (
    <tr key={'headers'}>
      {ORDERED_HEADERS.map((header, index) => (
        <th key={index}>
          {header}{renderSortingButton(header)}
        </th>
      ))}
    </tr>
  );

  const renderRow = (entry: Entry) => (
    <tr key={entry.email}>
      {ORDERED_HEADERS.map((header, index) => (
        <td key={index}>
          {entry[HEADER_MAP[header]]}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="wrapper">
      {searchBar}
      <table className="Table">
        <thead>
          {headerRow}
        </thead>
        <tbody>
          {data.map((entry) => renderRow(entry))}
        </tbody>
      </table>
    </div>
  );
}
