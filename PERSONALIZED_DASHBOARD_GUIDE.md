# POWERGRID Personalized Dashboard Guide

## ✨ What's New

Your POWERGRID IDP system now has **fully personalized dashboards**! Each employee who signs up will see their own unique data, progress, and recommendations.

---

## 🚀 How It Works

### For Employees

1. **Sign Up** on the login page
   - Enter your name, phone, position, email, and password
   - Select "Employee" as your role
   - Your position determines your target role (e.g., "Manager" → targets "Senior Manager")

2. **Login** with your credentials
   - System authenticates and creates a session
   - Redirects to your personalized employee dashboard

3. **Your Dashboard Shows**:
   - **Your Name** at the top
   - **Readiness Score** calculated from your competencies
   - **Gap Analysis** specific to your skills
   - **Personalized IDP** with recommendations based on your gaps
   - **AI Coach** that understands your context
   - **Mentor Assignment** matched to your target role
   - **Progress Tracking** for your development journey

### For HR/Admins

1. **Sign Up** as HR/Admin
   - Enter name, phone, email, and password (no position required)
   - Select "HR/Admin" as your role

2. **Login** to access the admin portal
   - View all employees who have signed up
   - See real-time KPIs based on actual employee data
   - Filter and search employee records
   - Export reports

3. **Admin Dashboard Shows**:
   - **Leadership Readiness %** - Average across all employees
   - **Active IDPs** - Count of employees with development plans
   - **Avg Gap Score** - Organization-wide competency gaps
   - **Employee Table** - List of all registered employees with:
     - Name, email, position
     - 9-box matrix position
     - Readiness score with visual progress bar
     - Quick access to view their IDP
   - **Analytics** - Aggregated data from all employees

---

## 🔐 Authentication Flow

```
Landing Page → Login/Signup → Authentication → Personalized Dashboard
     ↓              ↓               ↓                    ↓
  Hero CTA    Choose Role    auth.js validates    Load user data
  Features    Enter info     Create session       Render charts
  How It Works Submit form   Store in localStorage Display IDP
```

### Session Management

- **localStorage**: Stores user accounts permanently (`powergrid_users`)
- **sessionStorage**: Stores active session temporarily (`powergrid_session`)
- **Auto-logout**: Session clears when browser closes
- **Persistence**: User data persists across browser sessions

---

## 📊 Data Structure

### User Object (Employee)
```javascript
{
  id: "USER_1234567890_abc123",
  name: "John Doe",
  email: "john@powergrid.com",
  phone: "+1 (555) 123-4567",
  position: "Senior Manager",
  role: "employee",
  createdAt: "2024-01-15T10:30:00Z",
  targetRole: "VP Operations",
  performance: 4,           // 1-5 scale
  potential: 4,             // 1-5 scale
  readiness: 78,            // 0-100%
  adc: 85,                  // Assessment Development Center score
  avatar: "JD",
  lastLogin: "2024-01-15T14:20:00Z"
}
```

### User Object (Admin)
```javascript
{
  id: "USER_1234567890_xyz789",
  name: "Jane Smith",
  email: "jane@powergrid.com",
  phone: "+1 (555) 987-6543",
  role: "admin",
  createdAt: "2024-01-10T09:00:00Z",
  department: "Human Resources",
  accessLevel: "Full Access",
  lastLogin: "2024-01-15T08:00:00Z"
}
```

---

## 🎯 Personalization Features

### Dynamic Data Generation

When a new employee signs up:

1. **Competency Scores** - Auto-generated (60-80 range) for:
   - Strategic Thinking
   - People Leadership
   - Financial Acumen
   - Change Management
   - Innovation
   - Execution

2. **Target Role** - Determined by current position:
   - Manager → Senior Manager
   - Senior Manager → Director
   - Director → VP Operations
   - Senior Developer → Engineering Manager

3. **Readiness Score** - Calculated from competency averages

4. **Gap Analysis** - Identifies top 3 weaknesses

5. **IDP Recommendations** - Activities matched to gaps:
   - Training programs
   - Job rotations
   - Mentorship opportunities
   - Enrichment projects

6. **Mentor Assignment** - AI-matched based on target role

### Admin Analytics

Admin dashboard aggregates data from ALL employees:

- **Average Readiness**: Mean of all employee readiness scores
- **Active IDPs**: Count of employees with active development plans
- **Avg Gap Score**: Organization-wide competency gap analysis
- **9-Box Distribution**: Performance vs. potential matrix
- **Real-time Updates**: Dashboard updates as new employees sign up

---

## 🛠️ Technical Implementation

### Files Modified

1. **auth.js** - Authentication engine
   - `AUTH.signup()` - Creates user accounts
   - `AUTH.login()` - Validates credentials
   - `AUTH.getCurrentUser()` - Gets logged-in user
   - `AUTH.getAllUsers()` - Retrieves all users (for admin)
   - `AUTH.logout()` - Clears session

2. **login.html** - Entry point
   - Integrated with `auth.js`
   - Signup form creates user records
   - Login form validates and creates sessions
   - Role-based redirect (employee.html or admin.html)

3. **employee.html** - Employee portal
   - Checks authentication on page load
   - Calls `loadUserData(currentUser)` to populate dashboard
   - Generates initial profile for new users
   - Renders personalized charts and IDP
   - Displays user-specific mentor and progress

4. **admin.html** - Admin portal
   - Checks authentication on page load
   - Calls `loadAdminData(currentUser)` to show analytics
   - Uses `AUTH.getAllUsers()` to get employee list
   - Calculates real-time KPIs from employee data
   - Renders employee table with search/filter

---

## 🧪 Testing the Personalized Dashboards

### Test Scenario 1: New Employee Signup

1. Open `landing.html`
2. Click "Get Started"
3. Switch to "Sign Up" tab
4. Select "Employee" role
5. Fill in:
   - Name: "Alex Johnson"
   - Phone: "+1 (555) 111-2222"
   - Position: "Manager"
   - Email: "alex@powergrid.com"
   - Password: "alex12345"
6. Submit → You'll be redirected to employee.html
7. **Verify**:
   - Welcome section shows "Welcome, Alex Johnson"
   - Target Role is "Senior Manager"
   - Readiness score is calculated (60-80% range)
   - IDP table shows 4 activities tailored to Alex's gaps
   - Mentor is assigned based on target role

### Test Scenario 2: Existing User Login

1. Logout (click "Sign out")
2. Go back to login.html
3. Enter:
   - Email: "alex@powergrid.com"
   - Password: "alex12345"
4. Submit → Redirected to employee.html
5. **Verify**:
   - Same data appears (persistent!)
   - Readiness score is unchanged
   - IDP is the same as before

### Test Scenario 3: Admin View

1. Logout
2. Sign up as HR/Admin:
   - Name: "Sarah HR"
   - Phone: "+1 (555) 999-8888"
   - Email: "sarah@powergrid.com"
   - Password: "sarah12345"
   - Role: "HR/Admin"
3. Submit → Redirected to admin.html
4. **Verify**:
   - KPIs show actual data (if Alex signed up, you'll see 1 active IDP)
   - Employee table lists "Alex Johnson"
   - Readiness bar matches Alex's score
   - Search/filter works

### Test Scenario 4: Multiple Employees

1. Create 3-4 more employee accounts with different positions
2. Login as admin
3. **Verify**:
   - Leadership Readiness % is average of all employees
   - Active IDPs count matches number of employees
   - Avg Gap Score is calculated across all
   - Employee table shows all registered employees

---

## 🌐 Demo Accounts (Still Work!)

For quick testing without signup:

**Employee Demo**:
- Email: `employee@powergrid.com`
- Password: `demo123`
- Shows static demo data (Anya Sharma)

**Admin Demo**:
- Email: `admin@powergrid.com`
- Password: `admin123`
- Shows static demo analytics

---

## 🚀 Optional: Migrating to MERN Stack Backend

Your current system uses **localStorage** (client-side) which is great for demos but has limitations:
- Data is lost if browser cache is cleared
- No data synchronization across devices
- No server-side validation
- Limited to ~5MB storage

To scale to production, here's how to add a **MERN stack backend**:

### What is MERN?

- **M**ongoDB - NoSQL database for storing user data
- **E**xpress - Node.js web framework for API endpoints
- **R**eact - Frontend library (optional - you can keep vanilla HTML)
- **N**ode.js - JavaScript runtime for server

### Setup Guide

#### 1. Install Prerequisites

```bash
# Install Node.js (includes npm)
# Download from https://nodejs.org/

# Verify installation
node --version
npm --version

# Install MongoDB
# Download from https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
```

#### 2. Create Backend Server

Create a new folder `backend/` in your project:

```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
```

Create `backend/server.js`:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/powergrid', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/idp', require('./routes/idp'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

#### 3. Create User Model

Create `backend/models/User.js`:

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  position: String,
  role: { type: String, enum: ['employee', 'admin'], required: true },
  profileData: {
    competencies: Object,
    targetRole: String,
    idp: Array,
    mentor: Object,
    progress: Number,
    badges: Array
  },
  performance: Number,
  potential: Number,
  readiness: Number,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

module.exports = mongoose.model('User', UserSchema);
```

#### 4. Create API Routes

Create `backend/routes/auth.js`:

```javascript
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, position, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      position,
      role,
      performance: role === 'employee' ? Math.floor(Math.random() * 3) + 3 : null,
      potential: role === 'employee' ? Math.floor(Math.random() * 3) + 3 : null,
      readiness: role === 'employee' ? Math.floor(Math.random() * 30) + 60 : null
    });
    
    await user.save();
    
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    });
    
    res.json({ success: true, token, user: { ...user._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Incorrect password' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d'
    });
    
    res.json({ success: true, token, user: { ...user._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

#### 5. Update Frontend to Use API

Modify `auth.js` to call API instead of localStorage:

```javascript
// Example: Replace signup function
async function signup(userData) {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token in localStorage
      localStorage.setItem('powergrid_token', data.token);
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

#### 6. Run the Backend

```bash
cd backend
node server.js
```

Your API will be available at `http://localhost:5000/api/`

### Benefits of MERN Backend

✅ **Persistent Data** - Survives browser cache clears  
✅ **Scalability** - Handle thousands of users  
✅ **Security** - Password hashing, JWT authentication  
✅ **Multi-device** - Login from anywhere  
✅ **Real-time Analytics** - Server-side calculations  
✅ **Backup & Recovery** - Database backups  
✅ **API-first** - Mobile app integration possible  

---

## 📝 Summary

### Current Setup (localStorage)

✅ Works for demos and prototypes  
✅ No server required  
✅ Fast to set up  
⚠️ Data not permanent  
⚠️ Limited to one browser  

### With MERN Backend (Optional)

✅ Production-ready  
✅ Scalable to thousands of users  
✅ Secure with JWT tokens  
✅ Cross-device synchronization  
⚠️ Requires server setup  
⚠️ More complex deployment  

---

## 🎉 You're All Set!

Your POWERGRID system now has:

1. ✅ **Personalized Employee Dashboards** - Each user sees their own data
2. ✅ **Role-based Access** - Employees and Admins have different views
3. ✅ **Dynamic IDP Generation** - Recommendations based on actual gaps
4. ✅ **Real-time Admin Analytics** - KPIs calculated from employee data
5. ✅ **Authentication System** - Secure signup/login/logout
6. ✅ **Session Management** - Persistent user sessions
7. ✅ **Demo Accounts** - Quick testing with static data
8. 📋 **MERN Migration Guide** - Path to production-ready backend

### Next Steps

- Test with multiple user signups
- Customize competency skills for your organization
- Add more IDP activity types
- Enhance AI coach responses
- (Optional) Set up MERN backend for production deployment

---

**Questions?** Check the code comments in:
- `auth.js` - Authentication logic
- `employee.html` - Employee dashboard (see `<script>` at bottom)
- `admin.html` - Admin analytics (see `<script>` at bottom)
- `login.html` - Signup/login forms (see `<script>` at bottom)

Happy Building! 🚀
