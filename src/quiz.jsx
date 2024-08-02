import React, { useRef, useState } from "react";
import './index.css';
import { questions } from "./questions";

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [qstn, setQstn] = useState(questions[index]);
    const [trap, setTrap] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const op1 = useRef(null);
    const op2 = useRef(null);
    const op3 = useRef(null);
    const op4 = useRef(null);
    const opArray = [op1, op2, op3, op4];

    const playagain=()=>
    {
        setIndex(0);
        setQstn(questions[index]);
        setResult(false);
        setScore(0);
        setTrap(false);
    }

    const checkAnswer = (e, ans) => {
        if (!trap) {
            if (qstn.ans === ans) {
                e.target.classList.add("correct");
                setTrap(true);
                setScore(prevScore => prevScore + 1);
            } else {
                e.target.classList.add("wrong");
                setTrap(true);
                opArray[qstn.ans - 1].current.classList.add("correct");
            }
        }
    };

    const onNext = () => {
        if (trap) {
            if (index === questions.length - 1) {
                setResult(true);
                return;
            }
            setIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                setQstn(questions[newIndex]);
                return newIndex;
            });
            setTrap(false);
            opArray.forEach(option => {
                if (option.current) {
                    option.current.classList.remove("correct");
                    option.current.classList.remove("wrong");
                }
            });
        }
    };

    return (
        <>
            <h1>Quizzer</h1>

            <div className="container">
                {result ? (
                    <>
                        {score > 3 ? (
                            <>
                                <h1 className="congo">Congrats, This is your score</h1>
                            
                                <h1 className="bigscore">{score}</h1>
                                <button onClick={playagain}>Play Again</button>
                            </>
                        ) : (
                            <>
                                <h1>Better luck next time, This is your score</h1>
                            
                                <h1 className="smallscore">{score}</h1>
                                <button onClick={playagain}>Play Again</button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div className="toptext">
                            <h3 className="score">Score: {score}</h3>
                            <h3 className="qno">Q.No: {index + 1}</h3>
                        </div>
                        <hr />
                        <div className="question">
                            <h2>{qstn.question}</h2>
                            <ul>
                                <li ref={op1} onClick={(e) => checkAnswer(e, 1)}>{qstn.option1}</li>
                                <li ref={op2} onClick={(e) => checkAnswer(e, 2)}>{qstn.option2}</li>
                                <li ref={op3} onClick={(e) => checkAnswer(e, 3)}>{qstn.option3}</li>
                                <li ref={op4} onClick={(e) => checkAnswer(e, 4)}>{qstn.option4}</li>
                            </ul>
                        </div>
                        <button onClick={onNext}>Next</button>
                    </>
                )}
            </div>
        </>
    );
};


export default Quiz;
