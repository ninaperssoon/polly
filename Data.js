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
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}
Data.prototype.sendReward= function(pollId, r) {
  const poll = this.polls[pollId];
  console.log("rewards added to", pollId, r);
  if (typeof poll !== 'undefined') {
    poll.rewards.push(r);
  }
}
Data.prototype.sendPunishment= function(pollId, p) {
  const poll = this.polls[pollId];
  console.log("punishments added to", pollId, p);
  if (typeof poll !== 'undefined') {
    poll.punishments.push(p);
  }
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
    poll.participants = participants
  }
}

Data.prototype.getQuiz = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    return poll.pollId
  }
}

module.exports = Data;



