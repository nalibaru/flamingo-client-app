import React, { useState, useEffect } from 'react';
import './index.css';
import { useDispatch,useSelector } from 'react-redux';
import Notification from '../../Notification';
import { useTheme } from '../../../ThemeContext';
import { setMockTestDetails,setMockTestAssignId } from '../../../redux/mocktestslice';
import { useNavigate } from "react-router-dom";
import ModalComponent from '../../ModalComponent';
import MockTestInfo from './MockTestInfo';
import ViewStudentMarks from './ViewStudentMarks';
import ViewDetailedStudentMarks from './ViewDetailedStudentMarks';
import ViewIndividualMarks from './ViewIndividualMarks';
import ViewQuestions from './ViewQuestions';
import DisplayMarks from './DisplayMarks';


function MockTestDashboard() {
    const userdetails = useSelector((state) => state.login.user);
    const viewmarks = useSelector((state) => state.mocktest.marks);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, role,rolelevel } = userdetails || {};
    const [mockTests, setMockTests] = useState({});
    const [activeTab, setActiveTab] = useState(""); // Default active tab
    const [rolelevelValue, setRoleLevelValue] = useState(""); // Default active tab
    const [message, setMessage] = useState("");
    const [notificationClass, setNotificationClass] = useState("");
    const theme = useTheme();
    const className = `main-${theme}`;
    const classNameEvents = `events-${theme}`;
    const classNameDelete = `smallbutton button-${theme}`;
    const tabClassName = `day-title-${theme}`;
    const buttonClassName = `button button-${theme}`;
    const link = process.env.REACT_APP_ACCESSLINK;
    const [title, setTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState("");
    const [mocktestQuestions, setmocktestQuestions] = useState("");
    const [studmockTestData, setstudmockTestData] = useState([]);
    const [studIndividualMarks, setstudIndividualMarks] = useState("");
    const [detailedStudentData, setDetailedStudentData] = useState("");
    const [mtDetails, setMtDetails] = useState("");
    const [mocktestName, setMockTestName] = useState("");
    const [subject, setSubject] = useState("");
    const [viewmarksView, setViewMarks] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${link}/api/mocktest/get/all?user=${username}&role=${role}&rolelevel=${rolelevel}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setActiveTab(rolelevel === 1 || (rolelevel === 2 && role !== 'special') ? "Open For Submission" : (rolelevel === 2 && role === 'special') ? "Open" : "New Arrival");
                //setActiveTab(rolelevel === 1 || rolelevel === 2 ? "Open For Submission" : "New Arrival");
                setRoleLevelValue(rolelevel);
                setMockTests(data);
                if (viewmarks.length !== 0)
                {
                    setViewMarks(true);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };
        fetchData();
    }, []);

    const toggleTab = (tabName) => {
        setActiveTab(tabName);
        setViewMarks(false);
    };
    
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      }
    
    const renderMockTests = (mockTests, activeTab, rolelevel) => {
        return (
            <div className={classNameEvents}>
                {mockTests.length > 0 ? (
                    mockTests.map((mockTest, index) => (
                        <div key={mockTest.mockTestId} className="event">
                            <div>{mockTest.mockTestName} - {new Date(mockTest.createDate).toLocaleDateString()}</div>
                            {renderButtons(mockTest, index, activeTab, rolelevel)}
                        </div>
                    ))
                ) : (
                    <p>No data found.</p>
                )}
            </div>
        );
    };
    
    const renderButtons = (mockTest, index, activeTab, rolelevel) => {
        if (rolelevelValue === 1 || rolelevelValue === 2) {
            if (activeTab === 'Submitted MockTest') {
                return (
                    <>
                        <div class="event-button">
                    <button onClick={() => viewQuestions(index, mockTest.mockTestId)} className={classNameDelete}>
                            View Questions
                        </button>
                    <button onClick={() => viewMarksResults(index, mockTest.mockTestId)} className={classNameDelete}>
                        View Results
                        </button>
                    <button onClick={() => viewResults(index, mockTest.mockTestId)} className={classNameDelete}>
                        View Detailed Results
                    </button>
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                            More Info
                            </button>
                            </div>
                    </>
                );
            } else if (activeTab === 'Open Submitted MockTest') {
                return (
                    <>
                         <div class="event-button">
                    <button onClick={() => viewQuestions(index, mockTest.mockTestId)} className={classNameDelete}>
                            View Questions
                    </button>
                    <button onClick={() => viewMarksResults(index, mockTest.mockTestId)} className={classNameDelete}>
                        View Results
                        </button>
                    <button onClick={() => viewResults(index, mockTest.mockTestId)} className={classNameDelete}>
                        View Detailed Results
                    </button>
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                            More Info
                        </button>
                        </div>
                    </>
                );
            }
            else if (role !== 'special' && (activeTab === 'Pending Submission' || activeTab === 'Open For Submission')){
                return (
                    <>
                       <div class="event-button">
                        <button onClick={() => submit(index, mockTest.mockTestId)} className={classNameDelete}>
                            Submit
                        </button>
                        <button onClick={() => viewQuestions(index, mockTest.mockTestId)} className={classNameDelete}>
                            View Questions
                        </button>
                        <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                            More Info
                            </button>
                            </div> 
                    </>
                );
            }
            else if (activeTab === 'Evaluated MockTest') {
                return (
                    <>
                        <div class="event-button">
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                     More Info
                    </button>
                    <button onClick={() => viewStudentMarkResults(index, mockTest.mocktestAssignId)} className={classNameDelete}>
                        View Marks
                    </button>
                    </div> 
                    </>
                );
            } else if (activeTab === 'Pending MockTest') {
                return (
                    <>
                        <div class="event-button">
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                        More Info
                            </button>
                            </div> 
                        </>
                );
            } else if (activeTab === 'Retake') {
                return (
                    <>
                        <div class="event-button">
                    <button onClick={() => startTest(index, mockTest.mockTestId,mockTest.mocktestAssignId)} className={classNameDelete}>
                        Start Test
                    </button>
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                        More Info
                    </button>
                     <button onClick={() => viewStudentMarkResults(index, mockTest.mocktestAssignId)} className={classNameDelete}>
                     View Marks
                            </button>
                            </div>
                    </>
                );
            }
            else if(activeTab === 'New Arrival') {
                return (
                    <>
                        <div class="event-button">
                    <button onClick={() => startTest(index, mockTest.mockTestId,mockTest.mocktestAssignId)} className={classNameDelete}>
                        Start Test
                    </button>
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                        More Info
                    </button>
                    </div>
                    </>
                );
            }
        } else if (rolelevelValue === 3) {
            if (activeTab === 'Evaluated MockTest') {
                return (
                    <>
                        <div class="event-button">
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                     More Info
                    </button>
                    <button onClick={() => viewStudentMarkResults(index, mockTest.mocktestAssignId)} className={classNameDelete}>
                        View Marks
                            </button>
                            </div> 
                    </>
                );
            } else if (activeTab === 'Pending MockTest') {
                return (
                    <>
                        <div class="event-button">
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                        More Info
                            </button>
                            </div> 
                        </>
                );
            } else if (activeTab === 'Retake test') {
                return (
                    <>
                        <div class="event-button">
                    <button onClick={() => startTest(index, mockTest.mockTestId,mockTest.mocktestAssignId)} className={classNameDelete}>
                        Start Test
                    </button>
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                        More Info
                    </button>
                     <button onClick={() => viewStudentMarkResults(index, mockTest.mocktestAssignId)} className={classNameDelete}>
                     View Marks
                            </button>
                            </div>
                    </>
                );
            }
            else {
                return (
                    <>
                         <div class="event-button">
                    <button onClick={() => startTest(index, mockTest.mockTestId,mockTest.mocktestAssignId)} className={classNameDelete}>
                        Start Test
                    </button>
                    <button onClick={() => moreInfo(index, mockTest.mockTestId)} className={classNameDelete}>
                        More Info
                            </button>
                            </div>
                    </>
                );
            }
        }
    };
    
    

    const fetchMocktestData = async() => {
        try {
            const url = `${link}/api/mocktest/get/all?user=${username}&role=${role}&rolelevel=${rolelevel}`;
            const response = await fetch(url); 
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); 
            setMockTests(data);
          } catch (err) {
            console.error("Failed to fetch data:", err);
          }
    };
    

    const submit = async (dayIndex, eventId) => {
        await submitMockTest(eventId);
        fetchMocktestData();
    };

    const moreInfo = async (dayIndex, mockTestId) => {
        setType("info");
        setTitle("MockTest Details");  
        await viewMockTest(mockTestId);
        setIsModalOpen(true);
    };

    const viewQuestions = async (dayIndex, mockTestId) => {
        setType("questions");
        setTitle("View Questions");
        await viewMockTest(mockTestId);
        setIsModalOpen(true);
        
    };
    
    const viewMarksResults = async (dayIndex, mockTestId) => {
        setType("marks");
        setTitle("Student Marks");
        await viewMarks(mockTestId)//mocktestId
        setIsModalOpen(true);
    }

    const viewResults = async (dayIndex, mockTestId) => {
        setType("detailStdMarks");
        setTitle("Student Marks");
        await viewStudentMockTest(mockTestId);
        setIsModalOpen(true);
    };

    const viewStudentMarkResults = async (dayIndex, mocktestAssignId) => {
        setType("studentmarks");
        setTitle("Student Marks");
        await viewStudentMarksData(mocktestAssignId);
        setIsModalOpen(true);
    };
    

    const startTest = async (index, mocktestId,mocktestAssignId) => {
        try {
            dispatch(setMockTestAssignId(mocktestAssignId));
            const id = mocktestId;
            const url = `${link}/api/mocktest/getQuestions?mockTestId=${id}`;
            const response = await fetch(url); 
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); 
            dispatch(setMockTestDetails(data.mocktestQuestions));
            navigate("/starttest");
          } catch (err) {
            console.error("Failed to fetch data:", err);
          }
    }

    const submitMockTest = async (mocktestId) => {
        try {
            const url = `${link}/api/mocktest/finalsubmit/${mocktestId}`;
            const response = await fetch(url, { method: 'POST' }); 
    
            const data = await response.json(); // Always read the response body and convert to JSON
    
            if (response.ok) {
                setNotificationClass("notificationsuccess");
                setMessage(data.message || "MockTest submitted successfully.");
            } else {
                setNotificationClass("notificationerror");
                setMessage(data.message || "Error in submitting the mocktest");
            }
        } catch (err) {
            setNotificationClass("notificationerror");
            setMessage("Error in submitting the mocktest");
        }
    };

    //Single data about the counts
    const viewStudentMockTest = async (mocktestId) => {
        try {
            const url = `${link}/api/mocktest/fetchsubmit/${mocktestId}`;
            const response = await fetch(url, { method: 'GET' }); 
            const data = await response.json(); 
    
            if (response.ok) {
                setDetailedStudentData(data);  
            } else {
                console.log("Response is not ok:", response.status);  
            }
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    };

    const viewMockTest = async (mocktestId) => {
        try {
            const url = `${link}/api/mocktest/getQuestions?mockTestId=${mocktestId}`;
            const response = await fetch(url, { method: 'GET' }); 
    
            const data = await response.json(); // Always read the response body and convert to JSON
    
            if (response.ok) {
                const mtDetails = {
                    mocktestName:  data.mocktestName ,
                    subject: data.subject ,
                    noofquestions: data.noofquestions ,
                    total_marks: data.total_marks , 
                    closedOn: data.closedOn,
                    createdBy : data.createdBy
                }
                setMtDetails(mtDetails);
                setmocktestQuestions(data.mocktestQuestions);
            } else {
                console.log("Response is not ok");
            }
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    };

    //Student individual marks
    const viewMarks = async (mocktestId) => {
        try {
            const url = `${link}/api/mocktest/viewmarks/${mocktestId}`;
            const response = await fetch(url, { method: 'GET' }); 
    
            const data = await response.json(); // Always read the response body and convert to JSON
    
            if (response.ok) {
                setstudIndividualMarks(data);
                const mocktestName = data[0].mocktestName;
                setMockTestName(mocktestName);
                const subject = data[0].subject;
                setSubject(subject);
                //alert(data);
            } else {
                console.log("Response is not ok");
            }
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    };

    const viewStudentMarksData = async (mocktestAssignId) => {
        try {
            const url = `${link}/api/mocktest/viewStudentMarks/${mocktestAssignId}`;
            const response = await fetch(url, { method: 'GET' }); 
            const data = await response.json(); // Always read the response body and convert to JSON
            if (response.ok) {
                setstudmockTestData(data);
            } else {
                console.log("Response is not ok");
            }
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    };


    const resetNotification = () => {
        setNotificationClass("");
        setMessage("");
    }
    
    return (<>
        <div className={className}>
            <h2>Mock Test Dashboard</h2>
            <Notification message={message} notificationclass={notificationClass} onDismiss={resetNotification} />
            <div className={tabClassName}>
            {Object.keys(mockTests).length > 0 ? (
                Object.keys(mockTests).map(category => (
                    <button
                        key={category}
                        onClick={() => toggleTab(category)}
                        className={`${buttonClassName} ${category === activeTab ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))
            ) : (
                <p>   Loading...</p> // Display a loading message when mockTests is empty
            )}
        </div>
            <div className="content">
                {mockTests[activeTab] && renderMockTests(mockTests[activeTab],activeTab)}
            </div>
        {viewmarksView && <DisplayMarks />}
        </div>
       
         <ModalComponent
         title={title}
         theme={theme}
         isOpen={isModalOpen}
         onClose={handleCloseModal}
         showFooter={false}>
        {type === "info" && <MockTestInfo {...mtDetails} />}
        {type === "questions" && <ViewQuestions mocktestQuestions={mocktestQuestions} />}
        {type === "studentmarks" && <ViewStudentMarks studmockTestData={studmockTestData} />}
        {type === "marks" && <ViewIndividualMarks mocktestName={mocktestName} subject={subject} studIndividualMarks={studIndividualMarks} />}
        {type === "detailStdMarks" && <ViewDetailedStudentMarks detailedStudentData={detailedStudentData} />}
        </ModalComponent>
        </>
    );
}

export default MockTestDashboard; 
