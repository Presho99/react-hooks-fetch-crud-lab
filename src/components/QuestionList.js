
import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [quests, setQuests] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((quests) => {
      setQuests(quests)
    })
  }, [])

  function handleDeleteClick(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }) 
    .then(r => r.json())
    .then(() => {
      const updatedQuests = quests.filter((quest) => quest.id !== id)
      setQuests(updatedQuests)
    })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "apllication/json",
      },
      body: JSON.stringify({correctIndex})
    })
    .then(r => r.json())
    .then((updatedQuest) => {
      const updatedQuests = quests.map((quest) => {
        if(quest.id === updatedQuest.id) {
          return quest
        }
      })
      setQuests(updatedQuests)
    })
  }

 const questions = quests.map((quest) => (
   <QuestionItem
   key={quest.id}
   question={quest}
   onDeleteClick={handleDeleteClick}
   onAnswerChange={handleAnswerChange}
   />
 ))
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{ questions}</ul>
    </section>
  );
}

export default QuestionList;
