import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { 'src': '/images/pxn1.png', matched: false },
  { 'src': '/images/pxn2.jpeg', matched: false },
  { 'src': '/images/pxn3.gif', matched: false },
  { 'src': '/images/pxn4.gif', matched: false },
  { 'src': '/images/pxn5.gif', matched: false },
  { 'src': '/images/pxn6.png', matched: false },
  { 'src': '/images/pxn9.png', matched: false },
  { 'src': '/images/pxn15.png', matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // choices
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  
  // disable
  const [disabled, setDisabled] = useState(false)

  // shuffle cards when new game is clicked
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare two selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div>
      <h1>Let's Play Memory PXN for GHOSTS</h1>
      <h2>a mini game created by Benye (benyetothe#1279)</h2>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>You've turned {turns} time(s) :P hehe</p>
    </div>
  );
}

export default App;
