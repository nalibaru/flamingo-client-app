import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

function ViewStudentMarks({ studmockTestData }) {
    if (!Array.isArray(studmockTestData)) {
        return <p>No data available</p>;
    }

    return (
        <table className="profile-table">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Marks</th>
                    <th>Taken On</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {studmockTestData.map((data, index) => (
                    <tr key={index}>
                        <td>{data.assignTo}</td>
                        <td>{data.marks}</td>
                        <td>{data.takenOn}</td>
                        <td>{data.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

ViewStudentMarks.propTypes = {
    studmockTestData: PropTypes.array.isRequired,
};

export default ViewStudentMarks;
