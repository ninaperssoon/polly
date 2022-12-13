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
    socket.emit("getPollRewards", data.getAllRewards(pollId));
    socket.emit("getPollPunishments", data.getAllPunishments(pollId));
    //io.to(pollId).emit('answeringParticipant', data.getParticipant(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('answeringParticipant', data.getParticipant(d.pollId));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
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
    io.to(pollId).emit('answeringParticipant', data.getParticipant(pollId));
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
  
}

module.exports = sockets;