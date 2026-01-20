let socket = io();
let currentUser = null;

socket.on('connect', () => {
  console.log('Подключено к серверу');
});

socket.on('message', (data) => {
  const msgDiv = document.createElement('div');
  msgDiv.textContent = `${data.user}: ${data.text}`;
  document.getElementById('messages').appendChild(msgDiv);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});

function sendMessage() {
  const input = document.getElementById('msg-input');
  if (input.value.trim() && currentUser) {
    socket.emit('message', { user: currentUser, text: input.value });
    input.value = '';
  }
}

function sendOnEnter(e) {
  if (e.key === 'Enter') sendMessage();
}

function showLogin() {
  const user = prompt("Введите ваш никнейм:");
  if (user) {
    currentUser = user;
    document.getElementById('auth-buttons').style.display = 'none';
    document.getElementById('user-menu').style.display = 'block';
    document.getElementById('username').textContent = '@' + user;
    document.getElementById('chat-box').classList.remove('hidden');
  }
}

function showRegister() {
  alert("Регистрация временно через вход. Просто введите ник!");
  showLogin();
}

function logout() {
  currentUser = null;
  document.getElementById('auth-buttons').style.display = 'flex';
  document.getElementById('user-menu').style.display = 'none';
  document.getElementById('chat-box').classList.add('hidden');
}
