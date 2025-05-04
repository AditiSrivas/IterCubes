import React, { useState, useEffect } from 'react';
import { defineLeftInfo } from '../../constants/cube_info';

const DefineLeft = ({ onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    // Reset component when mounted
    useEffect(() => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
        setFeedback('');
    }, []);

    const handleAnswerSelect = (selectedOption) => {
        const updatedAnswers = {
            ...selectedAnswers,
            [currentQuestionIndex]: selectedOption
        };
        setSelectedAnswers(updatedAnswers);
        setFeedback('');
    };

    const handleNext = () => {
        if (currentQuestionIndex < defineLeftInfo.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setFeedback('');
        } else {
            calculateScore();
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setFeedback('');
        }
    };

    const checkCurrentAnswer = () => {
        const currentQuestion = defineLeftInfo[currentQuestionIndex];
        const userAnswer = selectedAnswers[currentQuestionIndex];
        
        if (!userAnswer) {
            setFeedback('Please select an answer first.');
            return;
        }

        if (userAnswer === currentQuestion.correctAnswer) {
            setFeedback('Correct! ' + (currentQuestion.explanation || ''));
        } else {
            setFeedback(`Incorrect. The right answer is: ${currentQuestion.correctAnswer}. ${currentQuestion.explanation || ''}`);
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        defineLeftInfo.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correctCount++;
            }
        });
        
        const calculatedScore = Math.round((correctCount / defineLeftInfo.length) * 100);
        setScore(calculatedScore);
        
        // Pass the score back to parent if needed
        if (onQuizComplete) {
            onQuizComplete(calculatedScore);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
        setFeedback('');
    };

    const currentQuestion = defineLeftInfo[currentQuestionIndex];

    if (!currentQuestion) {
        return <div className="p-6 text-center">Loading questions...</div>;
    }

    if (showResults) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Quiz Results</h2>
                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                    <p className="text-xl text-center mb-4">
                        Your score: <span className="font-bold text-2xl">{score}%</span>
                    </p>
                    
                    <div className="mb-6">
                        <div className="w-full bg-gray-700 rounded-full h-4">
                            <div 
                                className={`h-4 rounded-full ${score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${score}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className="text-center mt-6">
                        {score >= 70 ? (
                            <p className="text-green-400">Great job! You have a solid understanding of constraint prioritization!</p>
                        ) : score >= 40 ? (
                            <p className="text-yellow-400">Not bad! You're getting there. Consider reviewing the constraint concepts.</p>
                        ) : (
                            <p className="text-red-400">You might need more practice with understanding constraints and their priorities.</p>
                        )}
                    </div>
                </div>
                
                <div className="text-center">
                    <button 
                        onClick={restartQuiz}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md mr-4"
                    >
                        Restart Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Constraint Priority Quiz</h2>
            
            <div className="text-sm text-gray-400 mb-2">
                Question {currentQuestionIndex + 1} of {defineLeftInfo.length}
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
                <h3 className="text-xl mb-4">{currentQuestion.question}</h3>
                
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <div 
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                                selectedAnswers[currentQuestionIndex] === option 
                                ? 'bg-blue-700 border border-blue-500' 
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                            >
                            {option}
                        </div>
                    ))}
                </div>
                
                {feedback && (
                    <div className={`mt-4 p-3 rounded-md ${feedback.startsWith('Correct') ? 'bg-green-900 text-green-300' : feedback.startsWith('Incorrect') ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                        {feedback}
                    </div>
                )}
            </div>
            
            <div className="flex justify-between">
                <button 
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 py-2 rounded-md ${
                        currentQuestionIndex === 0 
                        ? 'bg-gray-700 cursor-not-allowed' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                >
                    Previous
                </button>
                
                <button 
                    onClick={checkCurrentAnswer}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md mx-2"
                    disabled={!selectedAnswers[currentQuestionIndex]}
                >
                    Check Answer
                </button>
                
                <button 
                    onClick={handleNext}
                    className={`px-4 py-2 rounded-md ${
                        !selectedAnswers[currentQuestionIndex]
                        ? 'bg-blue-800 opacity-50 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={!selectedAnswers[currentQuestionIndex]}
                >
                    {currentQuestionIndex < defineLeftInfo.length - 1 ? 'Next' : 'Finish Quiz'}
                </button>
            </div>
        </div>
    );
};

export default DefineLeft;