import React, { useState, memo } from 'react';
import classes from './TestScores.module.css';
import { FaPlus, FaMinus } from 'react-icons/fa';

const TestScores = ({ grades }) => {
  // show/hide scores
  const [showScores, setShowScores] = useState(false);

  // output scores list
  const testScores = grades.map((score, index) => (
    <li key={index}>
      Test {index + 1} : <span>{score}%</span>
    </li>
  ));

  // show/hide button handler
  const handleExpandScore = () => {
    setShowScores((prevState) => !prevState);
  };

  return (
    <div className={classes.testScores}>
      {/* scores list */}
      {showScores && <ul>{testScores}</ul>}

      {/* show/hide button */}
      <button onClick={handleExpandScore}>
        {!showScores && <FaPlus />}
        {showScores && <FaMinus />}
      </button>
    </div>
  );
};

export default memo(TestScores);
