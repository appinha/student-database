import React, { useState } from 'react';
import { Entry } from './Table';

type Props = {
  handleAddNewEntrySubmit: (entry: Entry) => void;
}

export default function AddNewEntry(props: Props) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [primaryGroup, setPrimaryGroup] = useState("")
  const [hoursStudied, setHoursStudied] = useState("")

  const handleButtonClick = () => props.handleAddNewEntrySubmit({
    firstName, lastName, phoneNumber, email, primaryGroup, hoursStudied
  })

  return (
    <form>
      <label>First Name:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label>Last Name:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label>Phone:</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <label>e-mail:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Primary Group:</label>
      <input
        type="text"
        value={primaryGroup}
        onChange={(e) => setPrimaryGroup(e.target.value)}
      />
      <label>Hours Studied:</label>
      <input
        type="text"
        value={hoursStudied}
        onChange={(e) => setHoursStudied(e.target.value)}
      />
      <button onClick={handleButtonClick}>Submit</button>
    </form>
  )
}