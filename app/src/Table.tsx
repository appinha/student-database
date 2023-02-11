import React, { useState } from 'react';
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
  hoursStudied: number;
};

export default function Table() {
  const [data, setData] = useState(jsonData.students.sort(cmp("firstName")));

  const renderRow = (entry: Entry) => (
    <tr key={entry.email}>
      {HEADERS.map((header, index) => (<td key={index}>{entry[HEADER_MAP[header]]}</td>))}
    </tr>
  )

  return (
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
  );
}

const cmp = (attr: Attribute) => (a: Entry, b: Entry) =>
  (a[attr] > b[attr]) ? 1 : ((b[attr] > a[attr]) ? -1 : 0);
