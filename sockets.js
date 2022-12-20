function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, d.index, {q: d.q, a: d.a, s: d.s});
    socket.emit('updateQuestions', data.getAllQuestions(d.pollId));
    
  });
  socket.on('anotherQuestion', function(d) {
    data.anotherQuestion(d.pollId);
    socket.emit('updateQuestions', data.getAllQuestions(d.pollId));
    
  });
  

  socket.on('deleteQuestion', function(d) {
    data.deleteQuestion(d.pollId, d.index, {q: d.q, a: d.a, s: d.s});
    socket.emit('updateQuestions', data.getAllQuestions(d.pollId));
    
  }); 

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a, s: d.s});
    socket.emit('updateQuestions', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId));
    socket.emit('dataUpdate', data.getAnswers(pollId));
    socket.emit("getVotedReward", data.getVotedReward(pollId));
    socket.emit("getVotedPunishment", data.getVotedPunishment(pollId));
    socket.emit("checkVoting", data.isVoting(pollId));
    socket.emit('answeringParticipant', data.getAnsParticipant(pollId));
    //io.to(pollId).emit('answeringParticipant', data.getParticipant(pollId));
  });
  socket.on('joinObs', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId));
    socket.emit('dataUpdate', data.getAnswers(pollId));
    socket.emit("checkVoting", data.isVoting(pollId));
    socket.emit('answeringParticipant', data.getAnsParticipant(pollId));
    socket.emit("getVotingRewards", data.getVotingRewards(pollId));
    socket.emit("getVotingPunishments", data.getVotingPunishments(pollId));
    //io.to(pollId).emit('answeringParticipant', data.getParticipant(pollId));
  });
  socket.on('joinHostPoll', function(pollId){
    data.createAnsParticipant(pollId)
    io.to(pollId).emit('answeringParticipant', data.getAnsParticipant(pollId));
    socket.emit("isVotingNeeded", data.isVotingNeeded(pollId))

  });

  socket.on('runQuestion', function(d) {
    data.resetVotes(d.pollId);
    data.createAnsParticipant(d.pollId)
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('answeringParticipant', data.getAnsParticipant(d.pollId));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
    io.to(d.pollId).emit("checkVoting", data.isVoting(d.pollId));

  });
  
  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
    io.to(d.pollId).emit('flipUpdate', data.getFlip(d.wor, d.con, d.consequence))
    
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
  socket.on('addAnswer', function(d) {
    data.addAnswer(d.questionId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });
  socket.on('sendReward', function(d) {
    data.sendReward(d.pollId, d.index, d.r);
    socket.emit('rewardUpdate', data.getAllRewards(d.pollId));
  });
  socket.on('newReward', function(d) {
    data.newReward(d.pollId);
    socket.emit('rewardUpdate', data.getAllRewards(d.pollId));
    
  });
  socket.on('deleteReward', function(d) {
    data.deleteReward(d.pollId, d.index, d.r);
    socket.emit('rewardUpdate', data.getAllRewards(d.pollId));
    
  }); 
  socket.on('sendPunishment', function(d) {
    data.sendPunishment(d.pollId, d.index, d.p);
    socket.emit('punishmentUpdate', data.getAllPunishments(d.pollId));
  });
  socket.on('newPunishment', function(d) {
    data.newPunishment(d.pollId);
    socket.emit('punishmentUpdate', data.getAllPunishments(d.pollId));
    
  });
  socket.on('deletePunishment', function(d) {
    data.deletePunishment(d.pollId, d.index, d.p);
    socket.emit('punishmentUpdate', data.getAllPunishments(d.pollId));
    
  }); 

  socket.on('addParticipant', function(d) {
    data.addParticipant(d.pollId, d.name);
    io.to(d.pollId).emit('participantUpdate', data.getParticipants(d.pollId));
   });
   socket.on('firstParticipant', function(pollId){
    io.to(pollId).emit('answeringParticipant', data.getAnsParticipant(pollId));
   } );

  socket.on('startedQuiz', function(d) {
    data.startedQuiz(d.pollId, d.participants);
    io.to(d.pollId).emit('quizUpdate', data.getQuiz(d.pollId));
    // io.to(d.pollId).emit('answeringParticipant', data.getParticipant(d.pollId));
   })

  socket.on("getQuizzes", function() {
    
    socket.emit("sendQuizzes", data.getQuizzes());

  })
  socket.on('joinWaiting', function(pollId) {
    io.to(pollId).emit('participantUpdate', data.getParticipants(pollId));
  })

  socket.on('resetParticipants', function(pollId) {
    data.resetParticipants(pollId);
  })

  socket.on('joinCreate', function(pollId) {
    socket.emit('getPoll', data.getAllQuestions(pollId));
  })

  socket.on('joinCreatereward', function(pollId) {
    socket.emit('getRewards', data.getAllRewards(pollId));
    socket.emit('getPunishments', data.getAllPunishments(pollId));
  })
  socket.on('joinWaiting', function(pollId) {
    io.to(pollId).emit('participantUpdate', data.getParticipants(pollId));
  })

  socket.on('resetParticipants', function(pollId) {
    data.resetParticipants(pollId);
  })

  socket.on('joinCreate', function(pollId) {
    socket.emit('getPoll', data.getAllQuestions(pollId));
  })

  socket.on('joinCreatereward', function(pollId) {
    socket.emit('getRewards', data.getAllRewards(pollId));
    socket.emit('getPunishments', data.getAllPunishments(pollId));
  })
  socket.on("createRewardsVoting", function(pollId){
    data.createVotingRewards(pollId);
    io.to(pollId).emit("checkVoting", data.isVoting(pollId))
    io.to(pollId).emit("getVotingRewards", data.getVotingRewards(pollId));
  });
  socket.on("createPunishmentsVoting", function(pollId){
    data.createVotingPunishments(pollId);
    io.to(pollId).emit("checkVoting", data.isVoting(pollId))
    io.to(pollId).emit("getVotingPunishments", data.getVotingPunishments(pollId))
  });

  socket.on('createVoting', function(d) {
    data.submitVote(d.pollId, d.vote, d.index);
    socket.emit("voteUpdate", data.getVotes(d.pollId))
    
  });
  socket.on('submitVoteR', function(d) {
    data.submitVoteR(d.pollId, d.vote, d.index);
    io.to(d.pollId).emit("voteUpdateR", data.countVotingR(d.pollId))
    
  });
  socket.on('submitVoteP', function(d) {
    data.submitVoteP(d.pollId, d.vote, d.index);
    io.to(d.pollId).emit("voteUpdateP", data.countVotingP(d.pollId))
    
  }); 
  socket.on("votingDoneR", function(pollId){
    io.to(pollId).emit("getVotedReward", data.getVotedReward(pollId));

  });
  socket.on("votingDoneP", function(pollId){
    io.to(pollId).emit("getVotedPunishment", data.getVotedPunishment(pollId));
  });

   socket.on("votingDone", function(pollId){
    data.votingDone(pollId);
    io.to(pollId).emit("checkVoting", data.isVoting(pollId))
  });
  
  socket.on('deleteQuiz', function(pollId) {
    console.log("id är:",pollId);
    data.deleteQuiz(pollId);
    socket.emit('updateQuiz', data.getQuizzes());
    
  }); 

  socket.on('hostingQuiz', function(pollId) {
    console.log("i sockets, hostar: ", pollId)
    io.to(pollId).emit("isHosted")
  })

}

module.exports = sockets;