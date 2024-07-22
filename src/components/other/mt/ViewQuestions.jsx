import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

function ViewQuestions({ mocktestQuestions }) {
    // Ensure mocktestQuestions is an array
    const questionsArray = Array.isArray(mocktestQuestions) ? mocktestQuestions : [];

    return (
        <table className="profile-table">
            <thead>
                <tr>
                    <th>Question Name</th>
                    <th>Type</th>
                    <th>Total Marks</th>
                    <th>Choices/Answer</th>
                    <th>Correct Choice/Answer</th>
                </tr>
            </thead>
            <tbody>
                {questionsArray.length > 0 ? (
                    questionsArray.map((question, index) => {
                        // Collect choices based on the prefix 'choice_'
                        const choices = [];
                        for (let key in question) {
                            if (key.startsWith('choice_')) {
                                choices.push(question[key]);
                            }
                        }
                        return (
                            <tr key={index}>
                                <td>{question.question_name}</td>
                                <td>{question.type}</td>
                                <td>{question.total_marks}</td>
                                <td>
                                    {question.type.toLowerCase() === 'mcq' ? (
                                        choices.length > 0 ? (
                                            <ul>
                                                {choices.map((choice, i) => (
                                                    <li key={i}>{i + 1}. {choice}</li>
                                                ))}
                                            </ul>
                                        ) : 'N/A'
                                    ) : question.correct_answer || 'N/A'}
                                </td>
                                <td>
                                    {question.type.toLowerCase() === 'mcq' ? question.correct_choice : 'N/A'}
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="5">No questions available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default ViewQuestions;
