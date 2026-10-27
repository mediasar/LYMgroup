const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, 'public')));

// Game Rooms State
const rooms = {};

const WORDS_LIST = [
  "KUCING", "MOBIL", "RUMAH", "PIZZA", "SEPATU", "TELEPON", "MATAHARI",
  "GITAR", "APEL", "SEPEDA", "GAJAH", "JERAPAH", "BAKSO", "BURGER",
  "DONAT", "ESKRIM", "MARTABAK", "SATE", "NARUTO", "DORAEMON"
];

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('joinRoom', ({ username, avatar, roomCode }) => {
    socket.username = username || 'Pemain';
    socket.avatar = avatar || '🐱';
    socket.roomCode = roomCode || 'GLOBAL';
    socket.score = 0;
    socket.hasGuessed = false;

    socket.join(socket.roomCode);

    if (!rooms[socket.roomCode]) {
      rooms[socket.roomCode] = {
        players: [],
        currentDrawerIndex: 0,
        currentWord: '',
        timer: 60,
        timerInterval: null,
        isPlaying: false
      };
    }

    const room = rooms[socket.roomCode];
    room.players.push(socket);

    updateRoomState(socket.roomCode);

    io.to(socket.roomCode).emit('chatMessage', {
      sender: 'Sistem',
      text: `${socket.username} bergabung ke dalam ruangan!`,
      type: 'system'
    });

    // Start game if at least 2 players and not started yet
    if (room.players.length >= 2 && !room.isPlaying) {
      startNewRound(socket.roomCode);
    }
  });

  // Relay Real-time Drawing Commands
  socket.on('draw', (data) => {
    socket.to(socket.roomCode).emit('draw', data);
  });

  socket.on('clearCanvas', () => {
    socket.to(socket.roomCode).emit('clearCanvas');
  });

  // Real-time Chat & Guess Handling
  socket.on('chatMessage', (msgText) => {
    const room = rooms[socket.roomCode];
    if (!room) return;

    const currentDrawer = room.players[room.currentDrawerIndex];
    if (currentDrawer && currentDrawer.id === socket.id) {
      socket.emit('chatMessage', {
        sender: 'Sistem',
        text: 'Kamu adalah penggambar! Dilarang memberi jawaban di chat.',
        type: 'system'
      });
      return;
    }

    if (room.isPlaying && msgText.trim().toUpperCase() === room.currentWord.toUpperCase()) {
      if (!socket.hasGuessed) {
        socket.hasGuessed = true;
        const points = Math.max(10, room.timer * 2);
        socket.score += points;

        io.to(socket.roomCode).emit('chatMessage', {
          sender: '🎉 SISTEM',
          text: `${socket.username} MENEBAK DENGAN BENAR! (+${points} Poin)`,
          type: 'correct'
        });

        updateRoomState(socket.roomCode);

        // Check if all guessers have guessed correctly
        const guessers = room.players.filter(p => p.id !== currentDrawer.id);
        if (guessers.every(p => p.hasGuessed)) {
          endRound(socket.roomCode, 'Semua pemain berhasil menebak!');
        }
      }
    } else {
      io.to(socket.roomCode).emit('chatMessage', {
        sender: socket.username,
        text: msgText,
        type: 'user'
      });
    }
  });

  socket.on('disconnect', () => {
    const room = rooms[socket.roomCode];
    if (room) {
      room.players = room.players.filter(p => p.id !== socket.id);
      if (room.players.length < 2) {
        clearInterval(room.timerInterval);
        room.isPlaying = false;
        io.to(socket.roomCode).emit('showOverlay', {
          title: 'MENUNGGU PEMAIN',
          subtitle: 'Butuh setidaknya 2 orang untuk memulai game!'
        });
      } else {
        updateRoomState(socket.roomCode);
      }
    }
  });
});

function updateRoomState(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;

  const playerList = room.players.map(p => ({
    id: p.id,
    name: p.username,
    avatar: p.avatar,
    score: p.score,
    hasGuessed: p.hasGuessed
  }));

  const drawer = room.players[room.currentDrawerIndex];

  io.to(roomCode).emit('roomState', {
    players: playerList,
    drawerId: drawer ? drawer.id : null,
    timer: room.timer
  });
}

function startNewRound(roomCode) {
  const room = rooms[roomCode];
  if (!room || room.players.length === 0) return;

  room.isPlaying = true;
  room.players.forEach(p => p.hasGuessed = false);
  room.currentWord = WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
  room.timer = 60;

  const drawer = room.players[room.currentDrawerIndex];

  updateRoomState(roomCode);

  // Send word to Drawer only, mask for others
  drawer.emit('yourTurn', { word: room.currentWord });
  drawer.to(roomCode).emit('guesserTurn', {
    drawerName: drawer.username,
    maskedWord: room.currentWord.replace(/[A-Z]/g, '_ ')
  });

  clearInterval(room.timerInterval);
  room.timerInterval = setInterval(() => {
    room.timer--;
    io.to(roomCode).emit('timerTick', room.timer);

    if (room.timer <= 0) {
      endRound(roomCode, 'Waktu habis!');
    }
  }, 1000);
}

function endRound(roomCode, reason) {
  const room = rooms[roomCode];
  if (!room) return;

  clearInterval(room.timerInterval);
  io.to(roomCode).emit('showOverlay', {
    title: reason,
    subtitle: `Kata Rahasia: ${room.currentWord}`
  });

  setTimeout(() => {
    room.currentDrawerIndex = (room.currentDrawerIndex + 1) % room.players.length;
    startNewRound(roomCode);
  }, 4000);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));