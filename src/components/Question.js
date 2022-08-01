import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(()=>{
    const timerID = setInterval(
      setTimeout(()=>{
            setTimeRemaining((timeRemaining)=>timeRemaining - 1);
      }, 1000)
    )
      
    
    // const timerID = setInterval(() => {
    //   setTime(setTimeRemaining(timeRemaining - 1));
    // }, 1000);

    return function cleanup(){
      clearTimeout(()=>timerID);
    };
  })

  
  // add useEffect code

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  if(timeRemaining === 0){
      question.id = id + 1;
      onAnswered(false);
      setTimeRemaining(10);
      
    }
  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
