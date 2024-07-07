import { useEffect, useState } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const App = () => {
  const [feedbacks, setfeedbacks] = useState(() => {
    const savedObject = window.localStorage.getItem("key");

    if (savedObject !== null) {
      return JSON.parse(savedObject);
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    window.localStorage.setItem("key", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const updateFeedback = (feedbackType) => {
    setfeedbacks((prev) => ({ ...prev, [feedbackType]: prev[feedbackType] + 1 }));
  };

  const reset = () => {
    setfeedbacks({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedbacks.good + feedbacks.neutral + feedbacks.bad;
  const positiveFeedback = Math.round((feedbacks.good / totalFeedback) * 100);

  return (
    <>
      <Description />
      <Options reset={reset} totalFeedback={totalFeedback} updateFeedback={updateFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          positiveFeedback={positiveFeedback}
          totalFeedback={totalFeedback}
          good={feedbacks.good}
          bad={feedbacks.bad}
          neutral={feedbacks.neutral}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
