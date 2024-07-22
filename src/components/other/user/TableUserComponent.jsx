import React from 'react';
import './index.css'; 

const TableUserComponent = ({ username,firstname, lastname, designation, role, lastLoggedIn ,address,phoneNumber,mailId,joinedDate,profilepic}) => {
  return (
    <table className="profile-table">
      <tbody>
      <tr><th>Username </th><td>{username}</td></tr>
        <tr><th>Name </th><td>{firstname} {lastname}</td></tr>
        <tr><th>designation</th><td>{designation}</td></tr>
        <tr><th>role</th><td>{role}</td></tr>
        <tr><th>Address</th><td>{address}</td></tr>
        <tr><th>Phone Number</th><td>{phoneNumber}</td></tr>
        <tr><th>Mail ID</th><td>{mailId}</td></tr>
        <tr><th>Joined Date</th><td>{joinedDate}</td></tr>
        <tr><th>lastLoggedIn</th><td>{lastLoggedIn}</td></tr>  
      </tbody>
    </table>
  );
};

export default TableUserComponent;