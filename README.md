# Jobify - Internship & Job Management Portal

A modern, full-stack job portal platform built with the MERN stack, featuring role-based access control, advanced search capabilities, and a premium UI/UX design.

![Jobify Platform](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)

## 🌟 Features

### Role-Based System
- **Students**: Browse jobs, apply to positions, track applications
- **Recruiters**: Post jobs, manage listings, view applications
- **Admins**: Full platform access, user management, analytics

### Job Management
- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Advanced search and filtering
- ✅ Sort by date, alphabetical order
- ✅ Real-time updates

### Search & Filtering
- 🔍 Search by position, company, location
- 📊 Filter by job status (pending, interview, declined)
- 💼 Filter by job type (full-time, part-time, remote, internship)
- 🔄 Multiple sorting options

### Authentication & Security
- 🔐 JWT-based authentication
- 👥 Role-based access control
- 🛡️ Admin verification codes
- 🔒 Secure password hashing

### Modern UI/UX
- 🎨 Premium, responsive design
- ⚡ Smooth animations and transitions
- 📱 Mobile-first approach
- 🌓 Clean, professional interface

## 🚀 Tech Stack

### Frontend
- **React** 18.x - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/jobify-portal.git
cd jobify-portal
```

### Backend Setup
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_CODE=ADMIN2024
EOF

# Start server
npm run dev
```

### Frontend Setup
```bash
cd client
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

## 🎯 Usage

### For Students
1. Register with "Student" role
2. Provide university details
3. Browse and search jobs
4. Apply to positions
5. Track applications in "My Applications"

### For Recruiters
1. Register with "Recruiter" role
2. Provide company information
3. Post new job listings via "Add Job"
4. Edit or delete your jobs
5. Manage applications

### For Admins
1. Register with "Admin" role
2. Enter admin code: `ADMIN2024`
3. Access admin dashboard
4. Manage platform content

## 📁 Project Structure

```
CAPSTONE2/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Entry point
│
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/jobify
JWT_SECRET=your_secret_key_here
ADMIN_CODE=ADMIN2024
```

#### Frontend (vite.config.js)
```javascript
server: {
  proxy: {
    '/api': 'http://localhost:5001'
  }
}
```

## 🧪 Testing

### Manual Testing
1. Register users with different roles
2. Test job creation, editing, deletion
3. Verify search and filtering
4. Test application submission
5. Check role-based access control

### Build for Production
```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Render/Railway/Heroku)
```bash
cd server
# Set environment variables
# Deploy with start script
```

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Jobs
- `GET /api/v1/jobs` - Get all jobs
- `GET /api/v1/jobs/:id` - Get single job
- `POST /api/v1/jobs` - Create job (Recruiter/Admin)
- `PATCH /api/v1/jobs/:id` - Update job (Recruiter/Admin)
- `DELETE /api/v1/jobs/:id` - Delete job (Recruiter/Admin)

### Users
- `GET /api/v1/users/current-user` - Get current user
- `PATCH /api/v1/users/update-user` - Update user profile

### Applications
- `POST /api/v1/applications` - Submit application
- `GET /api/v1/applications` - Get user applications

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Farhana Pervin** - *Initial work*

## 🙏 Acknowledgments

- Inspired by modern job portals like LinkedIn and Indeed
- Built with guidance from the MERN stack community
- UI/UX design principles from Material Design and Tailwind CSS

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🔮 Future Enhancements

- [ ] Email notifications for applications
- [ ] Advanced analytics dashboard
- [ ] Resume upload and parsing
- [ ] Video interview integration
- [ ] Company profiles
- [ ] Job recommendations using AI
- [ ] Real-time chat between recruiters and candidates

---

**Built with ❤️ using the MERN Stack**
