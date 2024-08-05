'use client'
import React, { useState } from 'react';

interface Question {
    question: string;
    options: string[];
}

const questions: Question[] = [
    {
        question: 'What is your favorite color?',
        options: ['Red', 'Blue', 'Green', 'Yellow']
    },
    {
        question: 'What is your favorite animal?',
        options: ['Dog', 'Cat', 'Bird', 'Fish']
    },
    // Add more questions as needed
];

const Questions: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleOptionClick = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    return (
        <div className='border border-1 rounded-lg p-10 w-96'>
            {currentQuestionIndex < questions.length ? (
                <div className='text-center'>
                    <h2>{questions[currentQuestionIndex].question}</h2>
                    <div className="flex-1 w-full flex flex-col gap-2 items-center mt-4">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button className='border border-1 rounded-lg border-light' key={index} onClick={handleOptionClick}>
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
