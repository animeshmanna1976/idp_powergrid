// Authentication & User Management System
// This handles user signup, login, and session management

const AUTH = (function() {
  
  // Initialize user database (in production, this would be MongoDB)
  const DB_KEY = 'powergrid_users';
  const SESSION_KEY = 'powergrid_session';
  
  // Get all users from localStorage
  function getAllUsers() {
    return JSON.parse(localStorage.getItem(DB_KEY) || '[]');
  }
  
  // Save users to localStorage
  function saveUsers(users) {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
  }
  
  // Find user by email
  function findUserByEmail(email) {
    const users = getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  
  // Sign up new user
  function signup(userData) {
    const users = getAllUsers();
    
    // Check if email already exists
    if (findUserByEmail(userData.email)) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user with unique ID
    const newUser = {
      id: 'USER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: userData.name,
      phone: userData.phone,
      position: userData.position || 'HR/Admin',
      email: userData.email.toLowerCase(),
      password: userData.password, // In production, this should be hashed
      role: userData.role,
      createdAt: new Date().toISOString(),
      // Employee-specific data
      performance: userData.role === 'employee' ? (3 + Math.floor(Math.random() * 3)) : null,
      potential: userData.role === 'employee' ? (3 + Math.floor(Math.random() * 3)) : null,
      readiness: userData.role === 'employee' ? (60 + Math.floor(Math.random() * 30)) : null,
      adc: userData.role === 'employee' ? (70 + Math.floor(Math.random() * 20)) : null,
      targetRole: userData.role === 'employee' ? determineTargetRole(userData.position) : null,
      avatar: generateAvatar(userData.name),
      // Admin-specific data
      department: userData.role === 'admin' ? 'Human Resources' : null,
      accessLevel: userData.role === 'admin' ? 'Full Access' : 'Limited',
      lastLogin: null
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, user: sanitizeUser(newUser) };
  }
  
  // Login user
  function login(email, password) {
    const user = findUserByEmail(email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    if (user.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }
    
    // Update last login
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex].lastLogin = new Date().toISOString();
    saveUsers(users);
    
    // Create session
    const session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      loginTime: new Date().toISOString()
    };
    
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    
    return { success: true, user: sanitizeUser(users[userIndex]) };
  }
  
  // Get current session
  function getCurrentSession() {
    const session = sessionStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }
  
  // Get current user full data
  function getCurrentUser() {
    const session = getCurrentSession();
    if (!session) return null;
    
    const users = getAllUsers();
    const user = users.find(u => u.id === session.userId);
    return user ? sanitizeUser(user) : null;
  }
  
  // Logout
  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    return { success: true };
  }
  
  // Update user profile
  function updateUser(userId, updates) {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }
    
    // Merge updates
    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };
    saveUsers(users);
    
    return { success: true, user: sanitizeUser(users[userIndex]) };
  }
  
  // Helper: Remove password from user object
  function sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }
  
  // Helper: Determine target role based on current position
  function determineTargetRole(position) {
    const positionLower = position.toLowerCase();
    if (positionLower.includes('manager') || positionLower.includes('senior')) {
      return 'VP Operations';
    } else if (positionLower.includes('director')) {
      return 'Chief Officer';
    } else if (positionLower.includes('engineer') || positionLower.includes('developer')) {
      return 'Senior Manager';
    } else if (positionLower.includes('analyst')) {
      return 'Manager';
    } else {
      return 'Senior ' + position;
    }
  }
  
  // Helper: Generate avatar initials
  function generateAvatar(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substr(0, 2);
  }
  
  // Check if user is authenticated
  function isAuthenticated() {
    return getCurrentSession() !== null;
  }
  
  // Require authentication (redirect if not logged in)
  function requireAuth(redirectTo = 'login.html') {
    if (!isAuthenticated()) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  }
  
  // Require specific role
  function requireRole(role, redirectTo = 'login.html') {
    const session = getCurrentSession();
    if (!session || session.role !== role) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  }
  
  // Get all employees (for admin)
  function getAllEmployees() {
    const users = getAllUsers();
    return users
      .filter(u => u.role === 'employee')
      .map(u => sanitizeUser(u));
  }
  
  // Update employee data (for admin)
  function updateEmployeeData(employeeId, data) {
    return updateUser(employeeId, data);
  }
  
  // Export public API
  return {
    signup,
    login,
    logout,
    getCurrentSession,
    getCurrentUser,
    updateUser,
    isAuthenticated,
    requireAuth,
    requireRole,
    getAllEmployees,
    updateEmployeeData,
    getAllUsers // For admin analytics
  };
})();

// Auto-export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AUTH;
}

// Create AuthManager alias for use in HTML files
const AuthManager = AUTH;
