import { createSlice } from '@reduxjs/toolkit';

export const mockTestSlice = createSlice({
    name: 'mocktest',
    initialState: {
        totalCount: [],
        questions: [],
        data: null,
        currentpdf: 1,
        fileDetails: [],
        currentQuestionIndex: 0,
        marks: [],
        descAnswersMap: {},
        evaluationInProgress: false,
        mocktestAssignId : ''
    },
    reducers: {
        setQuestions: (state, action) => {
            state.totalCount = action.payload;
        },
        setMockTestDetails: (state, action) => {
            state.questions = [...action.payload];
        },
        updateMockTestDetails: (state, action) => {
            const index = state.questions.findIndex(q => q.question_id === action.payload.question_id);
            if (index !== -1) {
                return {
                    ...state,
                    questions: state.questions.map((item, idx) =>
                        idx === index ? action.payload : item
                    )
                };
            } else {
                return {
                    ...state,
                    questions: [...state.questions, action.payload]
                };
            }
        },
        updateMarksDetails: (state, action) => {
            state.marks = action.payload;
        },
        setFileName: (state, action) => {
            state.data = action.payload;
        },
        setCurrentPDF: (state, action) => {
            state.currentpdf = action.payload;
        },
        setFileDetails: (state, action) => {
            state.fileDetails = [...state.fileDetails, action.payload] ?? [];
        },
        setCurrentQuestionIndex: (state, action) => {
            state.currentQuestionIndex = action.payload ?? 0;
        },
        updateDescAnswersMap: (state, action) => {
            const updatedDescAnswersMap = { ...state.descAnswersMap };
            const newDescAnswersMap = action.payload;
            
            Object.keys(newDescAnswersMap).forEach(qid => {
                const newDescAnswer = newDescAnswersMap[qid];
                const existingDescAnswer = updatedDescAnswersMap[qid];
        
                if (existingDescAnswer) {
                    updatedDescAnswersMap[qid] = { ...existingDescAnswer, ...newDescAnswer };
                } else {
                    updatedDescAnswersMap[qid] = newDescAnswer;
                }
            });
        
            return {
                ...state,
                descAnswersMap: updatedDescAnswersMap,
            };
        },
        setEvaluationInprogress: (state, action) => {
            state.evaluationInProgress = action.payload;
        },
        setMockTestAssignId: (state, action) => {
            state.mocktestAssignId = action.payload;
        },
        clearState: (state) => {
            state.questions = [];
            state.currentQuestionIndex = 0;
            state.descAnswersMap = null;
            state.marks = null;
            state.mocktestAssignId = '';
            state.totalCount = [];
        },
        clearQuestionState: (state) => {
            state.currentQuestionIndex = 0;
            state.mocktestAssignId = '';
            state.totalCount = [];
        }
    },
});

export const { setQuestions,setMockTestDetails,updateMockTestDetails,updateMarksDetails,setFileName,setCurrentPDF,setFileDetails,setCurrentQuestionIndex,updateDescAnswersMap,setMockTestAssignId,clearState,clearQuestionState } = mockTestSlice.actions;
export default mockTestSlice.reducer;