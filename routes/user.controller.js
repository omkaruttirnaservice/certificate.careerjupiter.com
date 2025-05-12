import IQTest from "./iqtest.model.js";
import TestList from "./test_list.model.js";
import User from "./user.model.js";

export const getIQTestDetails = async (req, res, next) => {
  try {
    const { userId, testId } = req.params;

    const user = await User.findById(userId).select("f_name l_name mobile_no");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await IQTest.findOne({
      userId,
      testID: testId,
    }).select(
      "report certificate userId testID title correctAnswers wrongAnswers passingmarks totalQuestions totalMarks reportType marksGained"
    );

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    const test = await TestList.findById(testId).select(
      "main_category sub_category sub title"
    );
    if (!test) {
      return res.status(404).json({ message: "Test details not found" });
    }

    let file_link = `https://careerjupiter.com/certificate/`;
    let file = "report";
    if (result.reportType === 0) {
      file = "certificate";
      file_link += result.certificate;
    } else {
      file_link += result.report;
    }

    res.render(file, {
      f_name: user.f_name.split(" ")[0],
      main_category: test.main_category,
      sub_category: test.sub_category,
      sub: test.sub,
      title: result.title,
      totalMarks: result.totalMarks,
      marksGained: result.marksGained,
      file_link: file_link,
      link: `https://careerjupiter.com/test/report?uid=${userId}&tid=${testId}&report_type=${result.reportType}`,
      userId,
      testId,
      type: result.reportType,
    });
  } catch (error) {
    next(error);
  }
};
