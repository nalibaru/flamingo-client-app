import React, { useEffect } from "react";
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import DynamicQuestionDisplay from "./DynamicQuestionDisplay";
import { setQuestions,setMockTestDetails,clearState } from '../../../redux/mocktestslice';
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import Button from "../../Button";

function MainPage() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentQuestionIndex = useSelector((state) => state.mocktest.currentQuestionIndex);
    const navigate = useNavigate();
    const mocktestdata = useSelector((state) => state.mocktest.questions);
    const mockTestHeaderClass = `mocktestheader-${theme}`; 
    const questionContainerClass = `questioncontainer-${theme}`;
    useEffect(() => {
        const length = mocktestdata.length;
        const mcqValue = mocktestdata.filter(element => element.type === "mcq").length;
        const descValue = mocktestdata.filter(element => element.type === "desc").length;
        const totalCount = {
            noofquestions: length,
            mcqType: mcqValue,
            descType : descValue
        }
        dispatch(setQuestions(totalCount));
        const updatedTestData = mocktestdata.map((element, index) => ({
            ...element,
            class_details: element.class_details ? element.class_details : index === currentQuestionIndex ? "visited" : "unviewed"
          }));
        dispatch(setMockTestDetails(updatedTestData));
    }, [])
        
    const exit = () => {
        dispatch(clearState());
        navigate('/mocktest');
    }

    return (<>
            <div className={mockTestHeaderClass}>
                <h2>Mock Test</h2>
            <div className="resetdiv">
                <Button theme={theme} type="button" onClick={exit}>Exit Test</Button>
                </div> 
            </div>
            <div className={questionContainerClass}>
                <DynamicQuestionDisplay theme={theme} question={mocktestdata[currentQuestionIndex] || mocktestdata[0]} />   
        </div>
        </>
    );
}

export default MainPage;