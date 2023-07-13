import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAnswer: 0,
  answers: [],
};

function getStoredInitialState() {
  const storedCurrentAnswer = localStorage.getItem("currentAnswer");
  const storedAnswers = localStorage.getItem("answers");
  if (storedCurrentAnswer) {
    return { currentAnswer: storedCurrentAnswer, answers: storedAnswers };
  }
  return { ...initialState };
}

export const resultSlice = createSlice({
  name: "result",
  initialState: getStoredInitialState(),
  reducers: {
    // insertStoredAnswers: (state) => {
    //   state.answers.push(JSON.parse(localStorage.getItem("answers")) || []);
    // },
    insertAnswer: (state, action) => {
      let ans = [];
      ans = JSON.parse(localStorage.getItem("answers")) || [];
      ans.push(action.payload);
      localStorage.setItem("answers", JSON.stringify(ans));
      state.answers.push(ans);
    },
    setCurrentAnswer: (state, action) => {
      state.currentAnswer = action.payload;
      let currentAnswer = 0;
      currentAnswer = JSON.parse(localStorage.getItem("currentAnswers"));
      localStorage.setItem("currentAnswer", JSON.stringify(action.payload));
    },
    resetAll: () => {
      localStorage.removeItem("currentAnswer");
      localStorage.removeItem("answers");
      return { ...initialState };
    },
  },
});
export const { insertStoredAnswers, insertAnswer, setCurrentAnswer, resetAll } =
  resultSlice.actions;

export default resultSlice.reducer;
