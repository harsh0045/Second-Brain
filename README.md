# Second Brain

Second Brain is a **MERN-stack-based** web application designed to help users efficiently store, manage, and retrieve their important content, links, and notes. It provides a seamless experience with authentication, data organization, and accessibility.


## 🚀 Features
- **User Authentication** (Login/Signup with JWT)
- **Store and Manage Content**
- **Save and Organize Links**
- **Responsive and Scalable Backend API**
- **CORS Configured for Secure Access**
- **Deployed on Vercel**

## 🛠 Tech Stack
- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT
- **Hosting:** Vercel (Backend), Netlify/Vercel (Frontend)

## 🔧 Installation
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/second-brain.git
cd second-brain
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

### **4️⃣ Run the Server**
```bash
npm start
```
The backend will be available at `http://localhost:5000`.

## 🚀 Deployment
### **Backend on Vercel**
1. Push your code to GitHub.
2. Connect the repo to **Vercel**.
3. Configure environment variables in **Vercel Dashboard**.
4. Deploy!

## 📂 API Endpoints
### **User Authentication**
| Method | Endpoint              | Description       |
|--------|----------------------|------------------|
| POST   | `/api/v1/users/register` | User signup     |
| POST   | `/api/v1/users/login`    | User login      |
| GET    | `/api/v1/users/logout`   | User logout     |
| GET    | `/api/v1/users/profile`  | Get user profile |

### **Content Management**
| Method | Endpoint                   | Description            |
|--------|---------------------------|------------------------|
| POST   | `/api/v1/contents/addcontent`  | Add new content       |
| GET    | `/api/v1/contents/getcontent`  | Fetch all content     |
| DELETE | `/api/v1/contents/deletecontent` | Delete content       |

### **Link Management**
| Method | Endpoint                 | Description            |
|--------|-------------------------|------------------------|
| POST   | `/api/v1/links/addlink`  | Add new link          |
| GET    | `/api/v1/links/getlink`  | Fetch saved links      |
| GET    | `/api/v1/links/exist`    | Check if link exists   |

## 🛠 Troubleshooting
- **CORS Errors?** Ensure your `FRONTEND_URL` is correctly set in `.env`.
- **Database Connection Issues?** Verify your `MONGO_URI`.
- **Deployment Issues?** Check Vercel logs for errors.

## 📜 License
This project is open-source and available under the **MIT License**.

---
### 🎯 **Contribute & Support**
Feel free to fork this repo, submit issues, or contribute to improve the project!

**Happy Coding! 🚀**

