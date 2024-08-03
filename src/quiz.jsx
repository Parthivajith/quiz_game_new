import React, { useRef, useState, useEffect } from "react";
import './index.css';
import { questions } from "./questions";


import successSoundFile from './assets/success-1-6297.mp3'; 
import failureSoundFile from './assets/failure-1-89170.mp3'; 


const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const ranNo = getRandomInt(0, 21);

const Quiz = () => {
    const [index, setIndex] = useState(ranNo);
    const [qstn, setQstn] = useState(questions[index]);
    const [trap, setTrap] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [qNo, setQNo] = useState(1);

    const op1 = useRef(null);
    const op2 = useRef(null);
    const op3 = useRef(null);
    const op4 = useRef(null);
    const opArray = [op1, op2, op3, op4];

    // Audio files for result
    const successSound = new Audio(successSoundFile);
    const failureSound = new Audio(failureSoundFile);

    const playagain = () => {
        const ranNo = getRandomInt(0, 170);
        setIndex(ranNo);
        setQstn(questions[ranNo]);  
        setResult(false);
        setScore(0);
        setTrap(false);
        setQNo(1);
    };

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
            if (qNo >= 10) {  
                setResult(true);
                return;
            }
            setIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                setQstn(questions[newIndex]);
                return newIndex;
            });
            setTrap(false);
            setQNo(prevQNo => prevQNo + 1);  
            opArray.forEach(option => {
                if (option.current) {
                    option.current.classList.remove("correct");
                    option.current.classList.remove("wrong");
                }
            });
        }
    };

   
    useEffect(() => {
        if (result) {
            if (score > 7) {
                successSound.play().catch(e => console.log('Audio play error:', e));
            } else {
                failureSound.play().catch(e => console.log('Audio play error:', e));
            }
        }
    }, [result, score]);

    return (
        <>
            <div className="container">
                {result ? (
                    <>
                        {score > 7 ? (
                            <>
                                <h1 className="congo">Congrats, This is your score</h1>
                                <h1 className="bigscore">{score}</h1>
                                <button onClick={playagain}>Play Again</button>
                            </>
                        ) : (
                            <>
                                <h1 className="btr">Better luck next time, This is your score</h1>
                                <h1 className="smallscore">{score}</h1>
                                <button onClick={playagain}>Play Again</button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div className="toptext">
                            <h3 className="qno">Q.No: {qNo}</h3>
                            <h3 className="score">Score: {score}</h3>
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
