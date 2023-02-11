import React, { useEffect, useState } from 'react';
import jsonData from './data.json';

const HEADERS = [
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
  email: string;
  firstName: string;
  lastName: string;
  primaryGroup: string;
  phoneNumber: string;
  hoursStudied: string;
};

export default function Table() {
  const [data, setData] = useState(sortedData);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length > 0) {
      const newData = sortedData.filter((entry) =>
        Object.values(entry).some((text) =>
          text.toLowerCase().includes(searchValue.toLowerCase())));
      setData(newData);
    } else {
      setData(sortedData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const search = (
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

  const renderRow = (entry: Entry) => (
    <tr key={entry.email}>
      {HEADERS.map((header, index) => (<td key={index}>{entry[HEADER_MAP[header]]}</td>))}
    </tr>
  )

  return (
    <div className="wrapper">
      {search}
      <table className="Table">
        <thead>
          <tr key={'headers'}>
            {HEADERS.map((header, index) => (<th key={index}>{header}</th>))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => renderRow(entry))}
        </tbody>
      </table>
    </div>
  );
}

const cmp = (attr: Attribute) => (a: Entry, b: Entry) =>
  (a[attr] > b[attr]) ? 1 : ((b[attr] > a[attr]) ? -1 : 0);

const sortedData = jsonData.students.sort(cmp("firstName"))
