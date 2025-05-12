import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: false },
  optionA: { type: String, required: true },
  optionB: { type: String, required: true },
  optionC: { type: String, default: "" },
  optionD: { type: String, default: "" },
  correctAns: { type: String, required: true },
  marks: { type: Number, default: 1 },
  selectedOption: { type: String, default: null },
  isCorrect: { type: Boolean, default: false },
});

const testlistQuestionsSchema = new mongoose.Schema({
  testID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestList",
  },
  main_category: {
    type: String,
    required: true,
  },
  mainCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IQTestCategory",
    required: true,
  },

  sub_category: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },

  title: { type: String, required: false },

  questions: [QuestionSchema],

  testDuration: {
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
  },

  totalQuestions: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
  passingMarks: { type: Number },

  userType: {
    type: String,
    default: "0",
  },

  visible: {
    type: Boolean,
    default: true,
  },

  reportType: { type: Number, default: 1 },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let TestList = mongoose.model("TestList", testlistQuestionsSchema);
export default TestList;
