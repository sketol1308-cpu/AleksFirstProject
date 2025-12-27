const firebaseConfig = {
    apiKey: "AIzaSyBvQZ9X4K3x5YxP8gH9LmNjK8TqV3WxYzA",
    authDomain: "messenger-app-sync.firebaseapp.com",
    databaseURL: "https://messenger-app-sync-default-rtdb.firebaseio.com",
    projectId: "messenger-app-sync",
    storageBucket: "messenger-app-sync.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456chatapp"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const currentUser = JSON.parse(localStorage.getItem('chatapp_user'));

if (!currentUser) {
    window.location.href = 'index.html';
}

document.getElementById('currentUserAvatar').textContent = currentUser.avatar;
document.getElementById('currentUsername').textContent = currentUser.username;

const onlineUserRef = database.ref(`chatapp/online/${currentUser.id}`);
onlineUserRef.set({
    username: currentUser.username,
    avatar: currentUser.avatar,
    lastSeen: firebase.database.ServerValue.TIMESTAMP
});

onlineUserRef.onDisconnect().remove();

database.ref('chatapp/online').on('value', (snapshot) => {
    const onlineUsers = snapshot.val() || {};
    const usersList = document.getElementById('usersList');
    const onlineCount = document.getElementById('onlineCount');

    usersList.innerHTML = '';
    let count = 0;

    for (let userId in onlineUsers) {
        if (userId !== currentUser.id) {
            count++;
            const user = onlineUsers[userId];
            const userElement = document.createElement('div');
            userElement.className = 'online-user';
            userElement.innerHTML = `
                <div class="online-user-avatar">${user.avatar}</div>
                <div class="online-user-name">${user.username}</div>
            `;
            usersList.appendChild(userElement);
        }
    }

    onlineCount.textContent = count;
});

database.ref('chatapp/messages').on('value', (snapshot) => {
    const messages = snapshot.val() || {};
    const messagesArea = document.getElementById('messagesArea');

    const messagesList = Object.values(messages).sort((a, b) => a.timestamp - b.timestamp);

    if (messagesList.length === 0) {
        messagesArea.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💬</div>
                <p>Start chatting with others!</p>
            </div>
        `;
        return;
    }

    messagesArea.innerHTML = messagesList.map(msg => {
        const isOwn = msg.userId === currentUser.id;
        const messageClass = isOwn ? 'message own' : 'message';

        return `
            <div class="${messageClass}">
                <div class="message-avatar">${msg.avatar}</div>
                <div class="message-content">
                    <div class="message-header">${msg.username}</div>
                    <div class="message-bubble">${escapeHtml(msg.text)}</div>
                    <div class="message-time">${formatTime(msg.timestamp)}</div>
                </div>
            </div>
        `;
    }).join('');

    messagesArea.scrollTop = messagesArea.scrollHeight;
});

window.sendMessage = function() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();

    if (!text) return;

    const message = {
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        text: text,
        timestamp: Date.now()
    };

    database.ref('chatapp/messages').push(message)
        .then(() => {
            messageInput.value = '';
            messageInput.focus();
        })
        .catch(error => {
            alert('Error sending message: ' + error.message);
        });
};

document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

window.logout = function() {
    if (confirm('Are you sure you want to logout?')) {
        onlineUserRef.remove();
        localStorage.removeItem('chatapp_user');
        window.location.href = 'index.html';
    }
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
