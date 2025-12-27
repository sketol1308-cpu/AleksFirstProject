const firebaseConfig = {
    apiKey: "AIzaSyBvQZ9X4K3x5YxP8gH9LmNjK8TqV3WxYzA",
    authDomain: "messenger-app-sync.firebaseapp.com",
    databaseURL: "https://messenger-app-sync-default-rtdb.firebaseio.com",
    projectId: "messenger-app-sync",
    storageBucket: "messenger-app-sync.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456chatapp"
};

let database;

try {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    console.log('Firebase initialized successfully!');
} catch (error) {
    console.error('Firebase error:', error);
    alert('Error connecting to database: ' + error.message);
}

let selectedAvatarEmoji = '😀';

window.switchTab = function(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(btn => btn.classList.remove('active'));

    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        tabs[1].classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up event listeners...');

    // Avatar selection
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            const emoji = this.getAttribute('data-avatar');
            selectedAvatarEmoji = emoji;
            document.getElementById('selectedAvatar').value = emoji;

            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            console.log('Avatar selected:', emoji);
        });
    });

    // Login form
    const loginFormElement = document.getElementById('loginFormElement');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted!');

            const username = document.getElementById('loginUsername').value.trim();
            console.log('Login username:', username);

            if (!username) {
                alert('Please enter a username');
                return;
            }

            database.ref('chatapp/users').once('value')
                .then((snapshot) => {
                    const users = snapshot.val() || {};
                    let userFound = false;

                    for (let userId in users) {
                        if (users[userId].username.toLowerCase() === username.toLowerCase()) {
                            userFound = true;
                            localStorage.setItem('chatapp_user', JSON.stringify(users[userId]));
                            window.location.href = 'chat.html';
                            break;
                        }
                    }

                    if (!userFound) {
                        alert('Username not found. Please create an account first!');
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                    alert('Error: ' + error.message);
                });
        });
        console.log('Login form listener added!');
    }

    // Signup form
    const signupFormElement = document.getElementById('signupFormElement');
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Signup form submitted!');

            const username = document.getElementById('signupUsername').value.trim();
            const avatar = document.getElementById('selectedAvatar').value;
            console.log('Signup username:', username, 'Avatar:', avatar);

            if (!username || username.length < 3) {
                alert('Username must be at least 3 characters');
                return;
            }

            database.ref('chatapp/users').once('value')
                .then((snapshot) => {
                    const users = snapshot.val() || {};
                    let usernameExists = false;

                    for (let userId in users) {
                        if (users[userId].username.toLowerCase() === username.toLowerCase()) {
                            usernameExists = true;
                            break;
                        }
                    }

                    if (usernameExists) {
                        alert('Username already exists. Please choose another one!');
                        return;
                    }

                    const newUserRef = database.ref('chatapp/users').push();
                    const userData = {
                        id: newUserRef.key,
                        username: username,
                        avatar: avatar,
                        joinedAt: Date.now()
                    };

                    console.log('Creating user:', userData);

                    return newUserRef.set(userData)
                        .then(() => {
                            console.log('User created successfully!');
                            localStorage.setItem('chatapp_user', JSON.stringify(userData));
                            window.location.href = 'chat.html';
                        });
                })
                .catch(error => {
                    console.error('Signup error:', error);
                    alert('Error creating account: ' + error.message);
                });
        });
        console.log('Signup form listener added!');
    }

    console.log('All event listeners set up successfully!');
});
