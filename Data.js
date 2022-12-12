'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang="en") {

  // if (lang !=="en") {
  //   lang = "en"
  // }
  // else {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
  // }
  
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;
    poll.rewards= [];
    poll.punishments= [];              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
    poll.participants=[];
  }
  return this.polls[pollId];
}

Data.prototype.addQuestion = function(pollId, index, q) {
  const poll = this.polls[pollId];
  console.log("(addQuestion)   question added to", pollId, q);
 const hej = "jag är här";
  if (typeof poll !== 'undefined') {
    console.log(hej);
      poll.questions[index]=q;

    
    
  }
  console.log("lista med frågor: ", poll.questions);
}
Data.prototype.deleteQuestion = function(pollId, index, q) {
  const poll = this.polls[pollId];
  console.log("question deleted", pollId, q);
 const hej = "jag är här";
  if (typeof poll !== 'undefined') {
    console.log(hej);
      poll.questions.splice(index,1);

    
    
  }
  console.log("(deleteQuestion)   lista efter delete: ", this.polls[pollId].questions);
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
  console.log("änrdad quiz: ", poll.questions);
}

Data.prototype.anotherQuestion = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions.push({ q: "",
                           a: ["",""],
                           s:[]
                          });
    console.log("(anotherQuestion)    Lagt till en plats för ny fråga till quiz: ", poll.questions);
  }
  
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}
Data.prototype.getParticipant = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    if (poll.participants !== [])
    console.log("hoppat in i loopen")
    console.log(poll.participants)
    return poll.participants[Math.floor(Math.random() * (poll.participants.length))];
  }
  return[]
  
  
}
Data.prototype.getAllQuestions = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("(getAllQuestions)  quiz-id and the quiz is now ", pollId, poll.questions);
    return poll.questions;
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      console.log("ans:"+ poll.questions[0].a);
      console.log("q" + poll.questions[0].q);
      console.log("s"+ poll.questions[0].s);
      
     
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.newReward = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.rewards.push("");
    console.log("(newReward)    Lagt till en plats för ett nytt reward till quiz: ", poll.rewards);
  }
  
}

Data.prototype.sendReward= function(pollId, index, r) {
  const poll = this.polls[pollId];
  console.log("rewards from added to", pollId, r);
  if (typeof poll !== 'undefined') {
    poll.rewards[index]=r;
  }

}
Data.prototype.deleteReward = function(pollId, index, r) {
  const poll = this.polls[pollId];
  console.log("reward deleted", pollId, r);
 const hej = "jag är här";
  if (typeof poll !== 'undefined') {
    console.log(hej);
      poll.rewards.splice(index,1);

    
    
  }
  console.log("(deleteRewards)   lista efter delete: ", this.polls[pollId].rewards);
}

Data.prototype.getAllRewards = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("(getAllRewards)  quiz-id and the rewards are now ", pollId, poll.rewards);
    return poll.rewards;
  }
  return []
}
Data.prototype.newPunishment = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.punishments.push("");
    console.log("(newPunishment)    Lagt till en plats för ett nytt punishment till quiz: ", poll.punishments);
  }
  
}

Data.prototype.sendPunishment= function(pollId, index, p) {
  const poll = this.polls[pollId];
  console.log("punishments from added to", pollId, p);
  if (typeof poll !== 'undefined') {
    poll.punishments[index]=p;
  }

}
Data.prototype.deletePunishment= function(pollId, index, p) {
  const poll = this.polls[pollId];
  console.log("punishments deleted", pollId, p);
 const hej = "jag är här";
  if (typeof poll !== 'undefined') {
    console.log(hej);
      poll.punishments.splice(index,1);

    
    
  }
  console.log("(deletePunishment)   lista efter delete: ", this.polls[pollId].punishments);
}

Data.prototype.getAllPunishments = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("(getAllPunishments)  quiz-id and the punishments are now ", pollId, poll.punishments);
    return poll.punishments;
  }
  return []
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
Data.prototype.getParticipants = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("getParticipants", poll.participants)
    return poll.participants
  }
  return []
}
Data.prototype.addParticipant = function(pollId, name) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {

    return poll.participants.push(name)
  }
}
Data.prototype.startedQuiz = function(pollId, participants) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("startedQuiz innan: ", poll.participants)
    poll.participants = participants
    console.log("efter: ", poll.participants)
  }
}

Data.prototype.getQuiz = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return poll.pollId
  }
}

Data.prototype.getQuizzes = function () {
  return this.polls
  }
  Data.prototype.getFlip = function (wor, con, consequence) {
    return {wor: wor, con: con, consequence: consequence}
    }
module.exports = Data;



