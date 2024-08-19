"use client"

import React, { useState } from 'react';
import clientQuestions from "../questions/clientQuestions";

interface Question {
    question: string;
    options: string[];
}

const Questions: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [values, setValues] = useState<number[]>([])
    // Get all the keys of the clientQuestions object
    const questionKeys = Object.keys(clientQuestions) as Array<keyof typeof clientQuestions>;

    // Get the current question object using the index
    const currentQuestionKey = questionKeys[currentQuestionIndex];
    const currentQuestion = clientQuestions[currentQuestionKey];

    const handleOptionClick = (option:number) => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setValues([...values, option]);
    };
    console.log(values)
    return (
        <div className='border border-1 rounded-lg p-10 w-96'>
            {currentQuestionIndex < questionKeys.length ? (
                <div className='text-center'>
                    <h2>{currentQuestion.Q}</h2>
                    <div className="flex-1 w-full flex flex-col gap-2 items-center mt-4">
                        {Object.entries(currentQuestion)
                            .filter(([key]) => key !== 'Q') // Filter out the question text
                            .map(([key, option], index) => (
                                <button
                                    className='border border-1 rounded-lg border-light'
                                    key={index}
                                    onClick={()=> handleOptionClick(parseInt(key))}
                                >
                                    {option}
                                </button>
                            ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Thank you for completing the questions!</h2>
                </div>
            )}
        </div>
    );
};

export default Questions;
