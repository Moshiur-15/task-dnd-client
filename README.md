# 📝 Task Management Application

Task Management Application is a web-based tool that enables users to manage their tasks efficiently. It supports adding, editing, deleting, reordering, and moving tasks between categories using a **drag-and-drop** interface. Built using **React, Express.js, MongoDB, and Firebase Authentication**, it ensures seamless task organization and real-time updates.

![TASK_DND](/src/assets/Screenshot%202025-02-26%20201023.png)

## 🚀 Live Demo

- **Frontend:** [Live Frontend](https://task-dnd.netlify.app/login)
- **Backend:** [Live Backend](https://task-dnd-server.vercel.app/)

## 📌 Features

✅ Add, edit, delete, and reorder tasks  
✅ Drag-and-drop interface for easy task movement  
✅ Categorize tasks: **To-Do, In Progress, Done**  
✅ **Real-time updates** using WebSockets  
✅ **Firebase Authentication** for secure login  
✅ **Responsive UI** with TailwindCSS

## 🛠 Technologies Used

- **Frontend:** React, TailwindCSS, Axios
- **Backend:** Express.js, MongoDB
- **Authentication:** Firebase Authentication
- **Real-time Updates:** WebSockets

## 📦 Dependencies

### Frontend Dependencies

```json
{
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "@tailwindcss/vite": "^4.0.7",
  "axios": "^1.7.9",
  "firebase": "^11.3.1",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.2.0",
  "sort-by": "^1.2.0",
  "tailwindcss": "^4.0.7"
}
```

### Backend Dependencies

- **Express.js**
- **MongoDB**
- **Firebase Authentication**
- **WebSockets**

## ⚙️ Installation & Setup

### 🖥️ Frontend Setup

1. Clone the repository:
   ```sh
   client : git clone https://github.com/Moshiur-15/task-dnd-client.git
   ```
2. Navigate to the project directory:
   ```sh
   client :cd TASK-DND
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   npm i
   ```

### 🖥️ Backend Setup

1. Clone the backend repository:
   ```sh
   git clone https://github.com/Moshiur-15/dnd-server.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd TASK-DND-SERVER
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and add the necessary environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   FIREBASE_API_KEY=your_firebase_api_key
   ```
5. Start the server:
   ```sh
   npm start
   ```

## 📖 Documentation & Source Code

- **Frontend Repository:** [GitHub Link](https://github.com/Moshiur-15/task-dnd-client)
- **Backend Repository:** [GitHub Link](https://github.com/Moshiur-15/dnd-server)

## 🤝 Contributors

- **MOSHIUR ISLAM** - [GitHub](https://github.com/Moshiur-15)

---

✨ Happy Coding! 🚀
