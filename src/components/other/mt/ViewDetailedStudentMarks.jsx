import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function ViewDetailedStudentMarks({ detailedStudentData }) {

    if (!detailedStudentData) {
        return <p>No data available</p>;
    }

    return (
        <table className="profile-table">
            <tbody>
                <tr><th>Mock Test Name</th><td>{detailedStudentData.mocktestName}</td></tr>
                <tr><th>Subject</th><td>{detailedStudentData.subject}</td></tr>
                <tr><th>No of Questions</th><td>{detailedStudentData.noofquestions}</td></tr>
                <tr><th>Total Marks</th><td>{detailedStudentData.total_marks}</td></tr>
                <tr><th>Created On</th><td>{detailedStudentData.createDate}</td></tr>
                <tr><th>Closed On</th><td>{detailedStudentData.closedOn}</td></tr>
                <tr><th>No of Students Assigned</th><td>{detailedStudentData.studentsAssigned}</td></tr>
                <tr><th>No of Students taken</th><td>{detailedStudentData.takenCount}</td></tr>
            </tbody>
        </table>
    );
}

ViewDetailedStudentMarks.propTypes = {
    detailedStudentData: PropTypes.object,
};

ViewDetailedStudentMarks.defaultProps = {
    detailedStudentData: null, 
};

export default ViewDetailedStudentMarks;
