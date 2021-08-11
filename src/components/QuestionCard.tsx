import React from 'react'
import {AnswerObject } from "../App"

import { ButtonWrapper,Wrapper } from './QuestionCard.style'
type Props = {
  question:string;
  answers:string[];
  userAnswer:AnswerObject | undefined ;
  callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
  questionNumber:number;
  totalQuestions: number;
}



const QuestionCard:React.FC<Props> = ({question,answers,userAnswer,questionNumber,callback,totalQuestions}) => {
  console.log(userAnswer)
  return ( 
    
    <Wrapper>
      <p className="question-number">Question: {questionNumber} / {totalQuestions}</p>
      <p dangerouslySetInnerHTML={{__html: question}} />
      <div>
        {answers.map(answer => (
          <ButtonWrapper  key={answer} correct={userAnswer?.correct_answer === answer} userClicked={userAnswer?.answer === answer}>
            <button disabled={userAnswer ? true : false} onClick={callback} value={answer}>
              <span dangerouslySetInnerHTML={{__html: answer}} />

            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
    
  )}


export default QuestionCard
