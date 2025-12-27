# 💬 Real-Time Chat Application

A modern, feature-rich real-time chat application built with vanilla JavaScript and Firebase. Send messages, share images and GIFs, react with emojis, and connect with friends in real-time!

## 🌟 Features

### 🔐 Authentication
- **User Registration & Login** - Secure account creation with password hashing (SHA-256)
- **Avatar Selection** - Choose from 8 unique emoji avatars
- **Persistent Sessions** - Stay logged in across browser sessions

### 💬 Messaging
- **Real-Time Chat** - Instant message delivery using Firebase Realtime Database
- **Public Chat Room** - Chat with all online users
- **Private Messaging** - Direct messages with individual users
- **Message Actions**:
  - ✏️ Edit your messages
  - 🗑️ Delete your messages
  - 😊 React with emojis (50+ reactions available)
  - ✓✓ Read receipts (see who read your messages)
  - 👤 Typing indicators

### 📷 Media Sharing
- **Image Sharing** - Upload and share images (up to 10MB)
- **GIF Support** - Search and send GIFs powered by Tenor
- **Full-Screen Viewer** - Click images/GIFs to view full-screen
- **Trending GIFs** - Browse popular GIFs or search for specific ones

### 👥 User Management
- **Online/Offline Status** - See who's currently online
- **All Users List** - View all registered users, not just online ones
- **User Profiles** - Click any user to view their profile:
  - Avatar display
  - Username
  - Member since date
  - User ID
  - "Send Message" button for quick private chats

### 🎨 Customization
- **Profile Settings** - Update your profile anytime:
  - Change avatar
  - Update username
  - Change password
- **Emoji Picker** - 50+ emojis organized by categories
- **Notification Controls** - Toggle sound notifications on/off

### 🔔 Notifications
- **Browser Notifications** - Get desktop notifications for new messages
- **Sound Alerts** - Audio notification when receiving messages
- **Visual Flash** - Green header flash as a notification fallback (mobile-friendly)
- **Permission Request** - Ask for notification permissions on first login

### 📱 Mobile Optimized
- **Responsive Design** - Works perfectly on phones, tablets, and desktops
- **Touch Events** - Optimized for mobile touch interactions
- **Mobile Audio Fix** - Audio context initialization on user interaction (iOS/Safari compatible)
- **Adaptive Layout** - UI adjusts to screen size

## 🚀 Live Demo

Visit the live application: [Chat App Demo](https://sketol1308-cpu.github.io/AleksFirstProject/chat-app/)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and gradients
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Firebase Realtime Database** - Real-time data synchronization
- **Firebase Authentication** - Secure user management
- **Tenor API** - GIF search and integration
- **Web Audio API** - Notification sounds
- **FileReader API** - Image/GIF processing
- **Notification API** - Desktop notifications

## 📋 How to Use

### Getting Started

1. **Visit the App**
   - Go to the live demo link or open `index.html`

2. **Create an Account**
   - Click "Sign Up"
   - Enter a username (min 3 characters)
   - Choose a password (min 6 characters)
   - Select an avatar
   - Click "Sign Up"

3. **Allow Notifications** (Optional)
   - Click "Allow" to receive desktop notifications
   - Click "Not Now" to skip

### Chatting

**Public Chat:**
- Send messages to everyone
- See all online users
- React to messages with emojis

**Private Chat:**
1. Click on any user in the users list
2. Their profile opens
3. Click "Send Message"
4. Start chatting privately!

### Sending Media

**Images:**
1. Click the 📷 camera button
2. Select an image (JPG, PNG, GIF, up to 10MB)
3. Image uploads instantly

**GIFs:**
1. Click the "GIF" button
2. Browse trending GIFs or search
3. Click any GIF to send

### Profile Settings

1. Click the ⚙️ settings icon
2. Update:
   - **Avatar** - Select new emoji and save
   - **Username** - Enter new name and save
   - **Password** - Enter current password, new password, confirm, and save

## 🎯 Key Features Explained

### Read Receipts
- **Single Check (✓)** - Message delivered
- **Double Check (✓✓)** - Message read by recipient(s)
- Shows count in public chat
- Shows status in private chat

### Emoji Reactions
- Click the 😊 button on any message
- Choose from 50+ emojis
- See reaction counts
- Remove your reaction by clicking again

### User Status Indicators
- **Green Dot** - User is online
- **Gray Dot** - User is offline
- Real-time status updates

### Notification System
- **Desktop Notifications** - When window is not focused
- **Sound Alerts** - Customizable beep sound
- **Visual Flash** - Green header flash (works even if audio fails)
- Toggle sound on/off with 🔔/🔕 button

## 🔒 Security

- **Password Hashing** - SHA-256 encryption
- **Client-Side Validation** - Input sanitization
- **XSS Protection** - HTML escaping for user content
- **Firebase Security Rules** - Database access control
- **No Storage of Passwords** - Only hashed versions stored

## 📁 Project Structure

```
chat-app/
├── index.html          # Login/Signup page
├── chat.html           # Main chat interface
├── styles.css          # All styling
└── README.md          # This file
```

## 🎨 Design Highlights

- **Modern UI** - Clean, gradient-based design
- **Purple Theme** - Beautiful purple gradients throughout
- **Smooth Animations** - Fade-ins, slide-ups, transforms
- **Rounded Corners** - Soft, friendly appearance
- **Shadows** - Depth and dimension
- **Responsive Grid** - Adapts to any screen size

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari (iOS compatible)
- ✅ Edge
- ✅ Opera
- ✅ Mobile browsers (Chrome, Safari, Firefox)

## 📝 Firebase Setup

This project uses Firebase for the backend. The Firebase configuration is already included, but if you want to use your own:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Realtime Database
3. Copy your config and replace in `chat.html` and `index.html`
4. Set up database rules (see below)

### Recommended Database Rules

```json
{
  "rules": {
    "users": {
      ".read": true,
      ".write": true
    },
    "messages": {
      ".read": true,
      ".write": true
    },
    "privateMessages": {
      ".read": true,
      ".write": true
    },
    "online": {
      ".read": true,
      ".write": true
    },
    "typing": {
      ".read": true,
      ".write": true
    }
  }
}
```

## 🚧 Future Enhancements

Potential features for future versions:
- [ ] Voice messages
- [ ] File sharing (PDF, documents)
- [ ] Group chats
- [ ] Message search
- [ ] Dark mode
- [ ] Custom themes
- [ ] Message pinning
- [ ] User blocking
- [ ] Message forwarding
- [ ] Stickers

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Report bugs
- Suggest features
- Share improvements

## 👨‍💻 Author

Created with ❤️ by Aleks

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- **Firebase** - Backend infrastructure
- **Tenor** - GIF integration
- **Claude Code** - Development assistance
- **Google Fonts** - Typography

---

**⭐ Star this repo if you find it useful!**

**🔗 Live Demo:** [Chat App](https://sketol1308-cpu.github.io/AleksFirstProject/chat-app/)
