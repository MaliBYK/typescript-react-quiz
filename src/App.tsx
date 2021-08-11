import React,{useState} from 'react';
import { Difficulty, fetchQuizQuestions,QuestionState } from './API';
import QuestionCard from './components/QuestionCard';

//import styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject ={
  question:string;
  answer:string;
  correct:boolean;
  correct_answer:string;
}

const TOTAL_QUESTIONS = 10;

const App: React.FC = ()  => {

  //Variables
  const [loading,setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber,setQuestionNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver,setGameOver] = useState(true);




  //Funcs
  const startTrivia =async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions =await fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.MEDIUM);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
    
  }
  const checkAnswer = (e: any ) => {
    if(!gameOver){
      const answer = e.currentTarget.value;
   
    const correct = answer === questions[questionNumber].correct_answer;
    
    if(correct) setScore(prev => prev +1);
    
    const answerObject = {
      question: questions[questionNumber].question,
      correct_answer : questions[questionNumber].correct_answer,
      correct,
      answer
    }
    
    setUserAnswers(prev => [...prev,answerObject] )
    
    

    }
  }

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if(nextQuestion === TOTAL_QUESTIONS) setGameOver(true)
    else setQuestionNumber(nextQuestion)

  }


  return (
    <>
    <GlobalStyle />

    <Wrapper className="App">
      <h1>REACT QUIZ</h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?  <button className="start" onClick={startTrivia}>Start</button> : null}
      {!gameOver && <span className="score">Score: {score}</span> }

     {!loading && !gameOver && (
       <QuestionCard
       questionNumber={questionNumber + 1}
       totalQuestions={TOTAL_QUESTIONS}
       question= {questions[questionNumber].question}
       answers={questions[questionNumber].answers}
       callback={checkAnswer}
       userAnswer={userAnswers?.[questionNumber]}
      />
     )}
     
     
     {!gameOver && !loading && userAnswers.length === questionNumber +1 && questionNumber !== TOTAL_QUESTIONS -1  && <button className="next" onClick={nextQuestion}>Next Question</button>}
      {loading && <p>Loading Questions...</p>}

    </Wrapper>
    </>
  );
}

export default App;
