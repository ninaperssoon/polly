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
    poll.questions = [{ q: "",
                        a: ["",""],
                        s:[]
                      }];
    poll.answers = [];
    poll.currentQuestion = 0;
    poll.rewards= [""];
    poll.punishments= [""];              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
    poll.participants=[];
    poll.votingPunishments=[];
    poll.votingRewards=[];
    poll.votesR=[0,0];
    poll.votesP=[0,0];
    poll.votedPunishment="";
    poll.votedReward="";
    poll.amountOfVotesP=0;
    poll.amountOfVotesR=0;
    poll.ongoingVote=false;
    poll.answeringParticipant = "";
    poll.votedNeeded={r: "no", p: "no"}
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
Data.prototype.createAnsParticipant = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    if (poll.participants !== []){
    poll.answeringParticipant= poll.participants[Math.floor(Math.random() * (poll.participants.length))];
    }
  } 
  
}
Data.prototype.getAnsParticipant = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    if (poll.participants !== []){
    return poll.answeringParticipant
    }
    return []
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

Data.prototype.isVotingNeeded = function (pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    if (poll.rewards.length > 1){
      poll.votedNeeded.r="yes"
    }
    if (poll.punishments.length > 1){
      poll.votedNeeded.p="yes"
    }
    return poll.votedNeeded
  }
  return {}
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

Data.prototype.resetParticipants = function (pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.participants = []
  }
}



Data.prototype.createVotingPunishments = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.ongoingVote=true;
    if (poll.punishments.length > 2){
      let theArray = poll.punishments.concat()
        for (let i=0; i < 2; i++){
        let numberPun =Math.floor(Math.random() * (theArray.length));
        poll.votingPunishments.push(theArray[numberPun]);
        theArray.splice(numberPun,1);
        console.log("Detta är poll.punishments efter iteration ", i, ": ", poll.punishments)
        }
      }
      else{
        console.log("else i CreateVotingPunishment")
        poll.votingPunishments=poll.punishments
      } 
    console.log("(createVotingPunishments)  votingPunishments are now ", pollId, poll.votingPunishments);
  }
}
Data.prototype.createVotingRewards = function(pollId) {
  const poll = this.polls[pollId];
  console.log("createRewardVoting")
  if (typeof poll !== 'undefined') {
    console.log("createRewardVoting hoppat in i loop")
    poll.ongoingVote=true;
    if (poll.rewards.length > 2){
      console.log("Gör en ny votingarray Rewards")
      let theArray = poll.rewards.concat()
        for (let i=0; i < 2; i++){
        let numberPun =Math.floor(Math.random() * (theArray.length));
        poll.votingRewards.push(theArray[numberPun]);
        theArray.splice(numberPun,1);
        console.log("Detta är poll.rewards efter iteration ", i, ": ", poll.rewards)
        } 
      }
    else {
      poll.votingRewards=poll.rewards
      console.log("else CreateRewardVoting")
    }
      console.log("(createVotingRewards)  votingRewards are now", pollId, poll.votingRewards)
  }
}
Data.prototype.getVotingRewards = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("Sendning votingRewards: ", poll.votingRewards)
    return poll.votingRewards
  }
  return []
}
Data.prototype.getVotingPunishments = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("Sendning votingPunishments: ", poll.votingPunishments)
    return poll.votingPunishments
  }
  return []
}
Data.prototype.submitVoteR = function(pollId, vote, index) {
  const poll = this.polls[pollId];
  console.log("R-vote submitted for ", pollId, vote);
  if (typeof poll !== 'undefined') {
    poll.votesR[index]+=1;
    console.log("VotesR: ", poll.votesR)
    poll.amountOfVotesR +=1;
    console.log("Antalet röster för r: ", poll.amountOfVotesR)
    
  }
}
Data.prototype.submitVoteP = function(pollId, vote, index) {
  const poll = this.polls[pollId];
  console.log("P-vote submitted for ", pollId, vote);
  if (typeof poll !== 'undefined') {
    poll.votesP[index]+=1;
    console.log("VotesP: ", poll.votesP)
    poll.amountOfVotesP +=1;
    console.log("Antalet röster för p: ", poll.amountOfVotesP)
  }
}
Data.prototype.getVotesR = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
   return {v: poll.votesR, p: poll.participants}
  }
  return []
}

Data.prototype.getVotesP = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
   return {v: poll.votesP, p: poll.participants}
  }
  return []
}


Data.prototype.countVotingP = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("Partici length: ", poll.participants.length, " antalet röster: ", poll.amountOfVotesP)
    if(poll.participants.length == (poll.amountOfVotesP+1)){
      console.log("countingVotesP")
      if (poll.votesP[0]>poll.votesP[1]){
        poll.votedPunishment=poll.votingPunishments[0]
        console.log("if: ", poll.votedPunishment)
      }
      else if (poll.votesP[0]==poll.votesP[1]){
        poll.votedPunishment= poll.votingPunishments[Math.floor(Math.random() * (poll.votingPunishments.length))]
        console.log("else if: ", poll.votedPunishment)
      }
      else {
        poll.votedPunishment=poll.votingPunishments[1]
        console.log("else: ", poll.votedPunishment)
      }
      console.log("P-voting done")
      return "P-voting done"
    }
   return []
  }
  return []
}


Data.prototype.countVotingR = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    if(poll.participants.length == (poll.amountOfVotesR+1)){
      console.log("countingVotesR")
      if (poll.votesR[0]>poll.votesR[1]){
        poll.votedReward=poll.votingRewards[0]
      }
      else if (poll.votesR[0]==poll.votesR[1]){
        poll.votedReward= poll.votingRewards[Math.floor(Math.random() * (poll.votingRewards.length))]
      }
      else {
        poll.votedReward=poll.votingRewards[1]
      }
      return "R-voting done"
    }
   return []
  }
  return []
}
Data.prototype.getVotedReward = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    if (poll.rewards.length == 1){
      return poll.rewards[0]
    }
    console.log("framröstad Reward skickad: ", poll.votedReward)
   return poll.votedReward
  }
  return []
}

Data.prototype.getVotedPunishment = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    if(poll.punishments.length == 1){
    return poll.punishments[0]
    }
    console.log("framröstad Punishment skickad: ", poll.votedPunishment)
   return poll.votedPunishment
  }
  return []
}
Data.prototype.isVoting = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    console.log("Vote is on going: ", poll.ongoingVote)
    return poll.ongoingVote
   
  }
  return []
}
Data.prototype.votingDone = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
   poll.ongoingVote = false
   
  }
}
Data.prototype.resetVotes = function(pollId){
  const poll = this.polls[pollId];
  if ( typeof poll !== 'undefined'){
    poll.votesP=[0,0]
    poll.votesR=[0,0]
    poll.amountOfVotesP=0
    poll.amountOfVotesR=0
    poll.votedPunishment =""
    poll.votingPunishments=[]
    poll.votingRewards=[]

    console.log("Setting votes to zero again")
  }
}




module.exports = Data;



