import React, { useState, useEffect } from 'react';

const questions = [
  { texte: "React est un framework.", reponse: false },
  { texte: "useState permet de gérer l'état.", reponse: true },
  { texte: "JSX est une extension CSS.", reponse: false },
  { texte: "Le Virtual DOM est plus rapide.", reponse: true }
];

const QuizInteractif = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleAnswer = (reponseUtilisateur) => {
    if (answerState !== null || transitioning) return;

    const bonneReponse = questions[index].reponse;
    const estCorrect = reponseUtilisateur === bonneReponse;
    setAnswerState(estCorrect);

    if (estCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setTransitioning(true);
    setTimeout(() => {
      const next = index + 1;
      if (next < questions.length) {
        setIndex(next);
        setAnswerState(null);
      } else {
        setShowScore(true);
      }
      setTransitioning(false);
    }, 300); 
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setAnswerState(null);
    setShowScore(false);
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  const transitionStyle = {
    opacity: transitioning ? 0 : 1,
    transform: transitioning ? 'translateY(20px)' : 'translateY(0px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease'
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eef2f3'
    }}>
      <h1 style={{ marginBottom: '20px' }}>TP7 - Nasry Sami</h1>

      <div style={{
        maxWidth: '500px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        minHeight: '250px'
      }}>
        <h2>Quiz Interactif</h2>

        <div style={transitionStyle}>
          {showScore ? (
            <>
              <p>Votre score : <strong>{score} / {questions.length}</strong></p>
              <button
                style={{ ...buttonStyle, backgroundColor: '#007bff', color: 'white' }}
                onClick={restartQuiz}
              >
                Recommencer
              </button>
            </>
          ) : (
            <>
              <p>{questions[index].texte}</p>

              <div>
                <button
                  onClick={() => handleAnswer(true)}
                  style={{ ...buttonStyle, backgroundColor: '#4CAF50', color: 'white' }}
                >
                  Vrai
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  style={{ ...buttonStyle, backgroundColor: '#f44336', color: 'white' }}
                >
                  Faux
                </button>
              </div>

              {answerState !== null && (
                <p style={{ color: answerState ? 'green' : 'red', fontWeight: 'bold' }}>
                  {answerState ? "Bonne réponse !" : "Mauvaise réponse"}
                </p>
              )}

              {answerState !== null && (
                <button
                  style={{ ...buttonStyle, backgroundColor: '#555', color: 'white' }}
                  onClick={nextQuestion}
                >
                  Question suivante
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizInteractif;
