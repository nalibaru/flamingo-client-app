import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

function ViewIndividualMarks({ studIndividualMarks,mocktestName,subject }) {
    if (!Array.isArray(studIndividualMarks) || studIndividualMarks.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <table className="profile-table">
            <tr><th colspan="2">Mock Test Name</th><td colspan="2">{mocktestName}</td></tr>
            <tr>
                <th colspan="2">Subject</th><td colspan="2">{subject}</td>
            </tr>
            <tr>
                <th>Username</th>
                <th>Marks</th>
                <th>Count</th>
                <th>Taken On</th>
            </tr>
            <tbody>
                {studIndividualMarks.map((data, index) => (
                    <React.Fragment key={index}>
                        <tr><td>{data.username}</td>
                        <td>{data.marks}</td>
                        <td>{data.count}</td>
                        <td>{data.takenOn}</td></tr> {/* Note: Check this field, seems it should be "Taken On" but uses `createdBy` */}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
}

ViewIndividualMarks.propTypes = {
    marksData: PropTypes.array.isRequired,
};

ViewIndividualMarks.defaultProps = {
    marksData: [],
};

export default ViewIndividualMarks;
