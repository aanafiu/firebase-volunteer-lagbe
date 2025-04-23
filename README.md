# 🤝 Volunteer Management Website  

## 📌 Project Overview  
**Volunteer Management Website** is a user-friendly platform for managing volunteer opportunities. Users can create, update, and delete volunteer need posts and volunteer for others' posts. The application is fully responsive, ensures data security, and implements modern web development practices. The UI is designed using **ShadCN/UI** for a sleek and professional look.  

## 🚀 Live Preview  
🔗 [Live Site Link](https://mongo-volunteer-lagbe.web.app/)  

## 📂 Repositories  
- **Client-side Code**: [GitHub Repository - Client](https://github.com/programming-hero-web-course2/b10a11-client-side-aanafiu)  
- **Server-side Code**: [GitHub Repository - Server](https://github.com/programming-hero-web-course2/b10a11-server-side-aanafiu)  

---  

## 🎯 Features  

### ✅ General Features:  
- Fully responsive design for mobile, tablet, and desktop.  
- Light/Dark theme toggling.  
- Eye-catching UI with proper alignment and spacing.  
- Dynamic page titles for each route.  

### 🔒 Authentication:  
- Email-password-based authentication.  
- Social login via Google or GitHub.  
- JWT token-based authentication for secure access to private routes.  

### ✏️ CRUD Functionality:  
- Add, update, and delete volunteer need posts.  
- Secure Firebase and MongoDB configurations using environment variables.  
- SweetAlert and Toast notifications for success and error messages.  

---  

## 📄 Pages  

### 🏠 Home Page:  
- **"Volunteer Needs Now"** section displaying urgent posts.  
- **"See All"** button for navigating to all posts.  
- Additional meaningful sections.  

### 📋 Volunteer Need Post Details:  
- Shows complete details of a volunteer need post.  
- **"Be a Volunteer"** feature with status tracking.  

### ➕ Add Volunteer Need Post (Private Route):  
- Form for adding a new post with thumbnail, title, description, category, and location.  

### 📂 Manage My Posts (Private Route):  
- View, update, or delete posts added by the logged-in user.  
- **"My Volunteer Request Posts"** for tracking volunteered posts.  

### 🔎 All Volunteer Need Posts:  
- Displays all posts in a card layout.  
- Search functionality for posts by title.  

### 🚫 404 Page:  
- User-friendly "Not Found" page for invalid routes.  

---  

## 💻 Technology Stack  

### 🖥️ Frontend:  
- ⚛️ React  
- 🎨 Tailwind CSS  
- 🖌️ Shadcn/UI  
- 🎉 SweetAlert2  

### 🛠️ Backend:  
- 🟢 Node.js  
- 📦 Express.js  
- 🛢️ MongoDB  

### 🔐 Authentication:  
- Firebase Authentication  
- JSON Web Tokens (JWT)  

### 🛠️ Utilities:  
- React Router  
- React Toastify  
- React DatePicker  

---  

## 📥 Installation & Setup  

### 1️⃣ Clone the repository  
```sh
git clone https://github.com/programming-hero-web-course2/b10a11-client-side-aanafiu.git
cd b10a11-client-side-aanafiu
```

### 2️⃣ Install dependencies  
```sh
npm install
```

### 3️⃣ Start the development server  
```sh
npm run dev
```

> The app will be available at **http://localhost:Port/**  

### 🔧 Backend Setup  
```sh
git clone https://github.com/programming-hero-web-course2/b10a11-server-side-aanafiu.git
cd b10a11-server-side-aanafiu
npm install
node index.js
```

---  

## 🚀 Deployment  

### 🔹 Deploy to Firebase  
1. **Install Firebase CLI**  
   ```sh
   npm install -g firebase-tools
   ```  
2. **Login to Firebase**  
   ```sh
   firebase login
   ```  
3. **Deploy the project**  
   ```sh
   firebase deploy
   ```  

### 🔹 Deploy to Vercel (Backend)  
1. **Install Vercel CLI**  
   ```sh
   npm install -g vercel
   ```  
2. **Login to Vercel**  
   ```sh
   vercel login
   ```  
3. **Deploy the backend**  
   ```sh
   vercel --prod
   ```  

---  

## 💡 Troubleshooting  

- If Firebase authentication issues occur, check API keys in the `.env` file.  
- Ensure MongoDB connection string is correctly set up in `.env`.  
- If deployment fails, verify CLI installations and permissions.  

---  

## 📬 Feedback & Support  

If you have any feedback or need support, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/aanafiu/).  

---  

## 📜 License  

This project is licensed under **MIT License**.  
