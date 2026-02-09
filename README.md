# POWERGRID Leadership Pipeline Intelligence Platform

## ✨ NEW: Personalized Dashboards with Authentication

Each user now gets their own personalized dashboard! Sign up with your details and see YOUR data, not generic demo data.

**📖 Read the Full Guide**: [PERSONALIZED_DASHBOARD_GUIDE.md](PERSONALIZED_DASHBOARD_GUIDE.md)

### Quick Test
1. Go to `landing.html` → Click "Get Started"
2. Switch to **Sign Up** tab
3. Enter your info (name, phone, position, email, password)
4. Select "Employee" role → Submit
5. **You'll see YOUR dashboard** with your name, auto-generated competency scores, personalized IDP, and target role!
6. Logout and login again → Your data persists!

### For Admins
- Sign up as "HR/Admin" → See all employees in a table
- KPIs (Readiness %, Active IDPs, Avg Gap) calculated from real employee data
- Search/filter employees, view their readiness scores

---

## 🚀 Complete User Flow

### 1. **Landing Page** (`landingpage.html`)
- Beautiful animated hero section with particle effects
- Feature showcase with 6 core capabilities
- Step-by-step "How It Works" walkthrough
- CTA buttons leading to login

### 2. **Login/Signup Page** (`login.html`)
- **NEW**: Full signup functionality with role-based forms
  - **Employee signup**: Name, Phone, Position, Email, Password
  - **HR/Admin signup**: Name, Phone, Email, Password (no position)
- Role selection (Employee vs Admin/HR)
- Modern authentication UI with SSO options
- **Real Authentication** powered by `auth.js`:
  - Creates user accounts in localStorage
  - Validates credentials on login
  - Creates secure sessions
  - Redirects to personalized dashboards
- Demo credentials still work:
  - **Employee**: `employee@powergrid.com` / `demo123`
  - **Admin**: `admin@powergrid.com` / `admin123`
- Smooth loading animations and role-based redirect

### 3. **Employee Portal** (`employee.html`)
- **My Leadership Growth Dashboard** - PERSONALIZED!
  - Welcome card with **YOUR NAME** and readiness score
  - **Auto-generated competencies** (60-80 range for new users)
  - **Target role** determined by your position:
    - Manager → Senior Manager
    - Senior Manager → Director
    - Director → VP Operations
    - Senior Developer → Engineering Manager
  - Animated radar chart (Gap Analysis: YOUR skills vs target)
  - **Personalized IDP** recommendations based on YOUR gaps
  - **AI Coach with Chat Interface**:
    - Daily insights and tips (randomized)
    - Full chat modal for Q&A
    - Context-aware responses
  - Progress timeline with status indicators
  - **Mentor assignment** matched to YOUR target role
  - Rewards & badges system
  - Download IDP as text file
  - **Data persists** - logout and login to see same data!

### 4. **Admin Portal** (`admin.html`)
- **Leadership Pipeline Manager Dashboard** - DYNAMIC!
  - **Real-time KPIs** calculated from actual employee data:
    - Leadership Readiness % → Average of all employees
    - Active IDPs → Count of employees with development plans
    - Avg Gap Score → Organization-wide competency analysis
  - Interactive 9-Box Matrix snapshot (clickable employee tiles)
  - Gap Summary Heatmap (color-coded bar chart)
  - **Employee table** with ALL registered users:
    - Name, email, position
    - 9-box position (High/Med/Low performance vs potential)
    - Readiness score with visual progress bars
    - **Search/filter** functionality
    - Quick action buttons
  - Export and Create IDP buttons
  - **Updates dynamically** as new employees sign up!

## 🎨 Enhanced Features

### Animations
- Slide-in-up animations for all major sections
- Counter-up animations for KPI metrics
- Hover-lift effects on cards
- Progress bar animations
- Smooth chart rendering (Chart.js)
- Particle background effects
- Shimmer loading states

### AI Intelligence
- **AI Coach** with conversational interface
- Context-aware responses based on keywords:
  - Timeline questions → Development timeline insights
  - Gap queries → Detailed competency analysis
  - Mentor questions → Mentor match quality explanation
  - Next steps → Activity recommendations
- Randomized daily tips (6 variations)
- Simulated "thinking" delay for realism

### Interactive Elements
- Role-based authentication flow
- Toast notifications for user actions
- Modal dialogs (AI Chat)
- Animated progress trackers
- Filterable tables
- Clickable 9-box tiles
- Download functionality

## 📁 File Structure

```
powergrid/
├── landing.html          # Landing page with animations
├── login.html           # Login/Signup with role-based forms
├── employee.html        # Employee portal (personalized!)
├── admin.html          # Admin/HR portal (dynamic analytics!)
├── auth.js             # 🆕 Authentication & user management
├── portal.js           # Shared data, AI logic, charts
├── styles.css          # Existing global styles
├── index.html          # Original dashboard (legacy)
├── script.js           # Original script (legacy)
├── README.md           # This file
└── PERSONALIZED_DASHBOARD_GUIDE.md  # 🆕 Detailed setup guide
```

## 🎯 How to Run

### Option 1: PowerShell
```powershell
# Open landing page
Start-Process .\landing.html

# Or directly open login
Start-Process .\login.html
```

### Option 2: Double-click
- Double-click `landing.html` in File Explorer
- Click "Get Started" → Select role → Login → Portal

## 🔑 Demo Flow

### Option A: Sign Up as New User (Recommended!)
1. **Open** `landingpage.html`
2. **Click** "Get Started"
3. **Switch** to "Sign Up" tab
4. **Select** Employee role
5. **Fill in**:
   - Name: "Your Name"
   - Phone: "+1 (555) 123-4567"
   - Position: "Manager" (or any position)
   - Email: "yourname@powergrid.com"
   - Password: "yourpass123"
6. **Submit** → Redirected to YOUR personalized dashboard!
7. **See**:
   - Your name in welcome section
   - Auto-generated competency scores (60-80 range)
   - Target role based on your position
   - Personalized IDP with activities
   - Assigned mentor for your career path
8. **Logout** and **Login again** → Your data persists!

### Option B: Use Demo Accounts
1. **Open** `landing.html`
2. **Click** "Get Started"
3. **Select** Employee or Admin role
4. **Enter** demo credentials:
   - Employee: `employee@powergrid.com` / `demo123`
   - Admin: `admin@powergrid.com` / `admin123`
5. **Employee Path**:
   - View radar gap analysis (static demo data)
   - Check IDP recommendations
   - Click "Get New Tip" for AI insights
   - Open "Chat with AI Coach" for Q&A
   - Download IDP PDF
6. **Admin Path**:
   - View KPIs and animations
   - Explore 9-Box matrix
   - Filter employee table
   - Click employees for details

## 🧠 AI Features

### Employee Portal AI
- **Daily Tips**: 6 rotating motivational insights
- **Chat Interface**: 
  - Understands: timeline, gaps, mentor, next steps, help
  - Provides detailed, contextual responses
  - Simulated typing delay (800ms)
  
### Shared AI Engine
- Gap analysis algorithm
- IDP generation logic
- Mentor matching simulation
- Progress prediction

## 🎨 Design Highlights

- **Modern Gradient Backgrounds**: Indigo/purple theme
- **Glassmorphism**: Backdrop blur effects
- **Tailwind CSS**: Utility-first styling
- **Chart.js**: Animated data visualizations
- **Responsive**: Mobile-friendly layouts
- **Accessibility**: Semantic HTML, ARIA labels

## 🔮 Future Enhancements

- [ ] Connect to real Firebase/Firestore backend
- [ ] Implement actual JWT authentication
- [ ] Add real PDF generation (jsPDF)
- [ ] Excel export functionality
- [ ] Advanced NLP for AI Chat
- [ ] Video conferencing integration for mentor sessions
- [ ] Mobile app (React Native)

## 📊 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Authentication**: Custom `auth.js` with localStorage persistence
- **Data Storage**: localStorage (client-side) - upgradeable to MERN stack
- **Session Management**: sessionStorage for active sessions
- **Charts**: Chart.js 4.x
- **Icons**: Embedded SVGs (Heroicons style)
- **Animation**: CSS keyframes + transitions
- **Simulated Backend**: In-memory JavaScript objects

### 🆕 Authentication System (`auth.js`)
- User signup with validation
- Login with email/password
- Session management (auto-logout on browser close)
- Role-based access control (employee vs admin)
- User profile storage and updates
- Data persistence across sessions
- **Ready for MERN migration** - see [PERSONALIZED_DASHBOARD_GUIDE.md](PERSONALIZED_DASHBOARD_GUIDE.md) for backend setup

## 🏆 Hackathon Ready

This platform demonstrates:
- ✅ Dual-portal architecture
- ✅ Role-based access control
- ✅ **Personalized user dashboards** (NEW!)
- ✅ **Real authentication system** (NEW!)
- ✅ **Dynamic data generation** (NEW!)
- ✅ AI-powered recommendations
- ✅ Modern, animated UI/UX
- ✅ Scalable structure
- ✅ Enterprise-grade design
- ✅ Professional branding
- ✅ **Production-ready with MERN migration path** (NEW!)

### 🚀 What Makes This Special

1. **Fully Personalized** - Each user gets their own unique dashboard
2. **Intelligent Onboarding** - Auto-generates competency scores and IDPs
3. **Role-based Views** - Employees see their data, admins see everyone
4. **Real-time Analytics** - Admin KPIs update as employees sign up
5. **Persistent Data** - User data survives browser refreshes
6. **Scalable Architecture** - Easy migration to MongoDB backend
7. **Professional UX** - Enterprise-level design and animations

---

**Built for Smart India Hackathon 2025**  
*Transforming Succession Planning with AI*

© 2025 POWERGRID. All rights reserved.


