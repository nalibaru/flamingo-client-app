import React, { useState } from "react";
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateMockTestDetails,updateDescAnswersMap } from '../../../redux/mocktestslice';
import { regexValues, splitValuesAndFindDifference } from '../../../services/descQuestion';
import DisplayQuestion from "./DisplayQuestion";
import { useTheme } from "../../../ThemeContext";
import Button from "../../Button";

function DisplayMarks() {
    const totalCount = useSelector((state) => state.mocktest.totalCount);
    const markDetails = useSelector((state) => state.mocktest.marks);
    // const mocktestdataactual = useSelector((state) => state.mocktest.questions);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [showResults, setShowresults] = useState(false);
    const theme = useTheme();


    /* const reEvaluateResult = () => {
        getMarksforDesc(mocktestdataactual, totalCount.noofquestions, dispatch);
        navigate('/dashboard');
    } */
    

    /* const getMarksforDesc = (mocktestdataactual, noofquestions, dispatch) => {
        let descAnswersMap = {};
        for (let i = 0; i < noofquestions; i++) {
            const data = mocktestdataactual[i];
            let descanswer = {};
            if (data && data.type === "desc" && data?.my_choice) {
                const regexTags = /<p[^>]*?>\s*<br\s*\/?>\s*<\/p\s*?>/gi;
                const answer = data.my_choice;
                const choiceanswer = answer.replace(regexTags, '');
                const studentanswer = regexValues(choiceanswer);
                const actualanswer = regexValues(data.correct_answer);
                const actualMarks = splitValuesAndFindDifference(studentanswer, actualanswer);
                const updateddata = {
                    ...data,
                    marks: actualMarks
                };

                descanswer = {
                    qid: i,
                    answer: studentanswer,
                    marks: actualMarks,
                    length: studentanswer.length
                };
                dispatch(updateMockTestDetails(updateddata));
                descAnswersMap[i] = descanswer;
            }
        }
        dispatch(updateDescAnswersMap(descAnswersMap));
    }; */

    const viewResults = (value) =>
    {
        setShowresults(value);
    }

    return (
        <>
            <div className="mocktestheader"> 
                {!showResults &&
                    <><h2>Mock Test</h2>
                    <div className="resetdiv">
                    <Button theme={theme} type="button" onClick={() => viewResults(!showResults)} >View Results</Button>
                </div></>
                }
            </div>
            <div className="details-report-div">
                {!showResults &&
                    <table className="report-card">
                        <tbody>
                            <tr>
                                <td className="report-heading" colSpan="2">Report Card</td>
                            </tr>
                            <tr className="heading-highlight">
                                <td>Total Questions</td>
                                <td>{totalCount.noofquestions}</td>
                            </tr>
                            <tr className="heading-highlight">
                                <td>Total MCQ Questions</td>
                                <td>{totalCount.mcqType === 0 ? '-' : totalCount.mcqType}</td>
                            </tr>
                            <tr className="heading-highlight">
                                <td>Total Desc Questions</td>
                                <td>{totalCount.descType === 0 ? '-' :  totalCount.descType}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="section-heading">Answered Questions</td>
                            </tr>
                            <tr>
                                <td>No of answered Questions</td>
                                <td>{markDetails.answered}</td>
                            </tr>
                            <tr>
                                <td>No of answered MCQ Questions</td>
                                <td>{markDetails.mcqanswered}</td>
                            </tr>
                            <tr>
                                <td>No of answered desc questions</td>
                                <td>{markDetails.descanswered}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="section-heading">Unanswered Questions</td>
                            </tr>
                            <tr>
                                <td>No of Questions unanswered</td>
                                <td>{markDetails.unanswered}</td>
                            </tr>
                            <tr>
                                <td>No of mcq unanswered questions</td>
                                <td>{markDetails.mcqunanswered}</td>
                            </tr>
                            <tr>
                                <td>No of desc unanswered questions</td>
                                <td>{markDetails.descunanswered}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="section-heading">Correct/Incorrect Answers</td>
                            </tr>
                            <tr>
                                <td>No of Questions mcq correct</td>
                                <td>{markDetails.mcqcorrect}</td>
                            </tr>
                            <tr>
                                <td>No of Questions mcq incorrect</td>
                                <td>{markDetails.mcqincorrect}</td>
                            </tr>
                            <tr>
                                <td>No of Questions desc correct</td>
                                <td>{markDetails.desccorrect}</td>
                            </tr>
                            <tr>
                                <td>No of Questions desc incorrect</td>
                                <td>{markDetails.descincorrect}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="section-heading">Marks</td>
                            </tr>
                            <tr>
                                <td>Descriptive marks</td>
                                <td>{markDetails.descMarks}</td>
                            </tr>
                            <tr>
                                <td>MCQ Marks</td>
                                <td>{markDetails.mcqMarks}</td>
                            </tr>
                            <tr className="result-highlight">
                                <td>Total Marks</td>
                                <td>{markDetails.totalMarks}</td>
                            </tr>
                        </tbody>
                    </table>}
                {showResults && <DisplayQuestion />}
                </div>
                </>
    );
}

export default DisplayMarks;