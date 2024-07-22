import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

function MockTestInfo({ mocktestName, subject, noofquestions, total_marks, closedOn, createdBy }) {
    
    return (
        <table className="profile-table">
            <tbody>
                <tr><th>Mock Test Name </th><td>{mocktestName}</td></tr>
                <tr><th>Subject </th><td>{subject}</td></tr>
                <tr><th>No of Questions </th><td>{noofquestions}</td></tr>
                <tr><th>Marks </th><td>{total_marks}</td></tr>
                <tr><th>closed On</th><td>{closedOn}</td></tr>
                <tr><th>Created By</th><td>{createdBy}</td></tr>
        </tbody>
      </table>  
        );
}

export default MockTestInfo;