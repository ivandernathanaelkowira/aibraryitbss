const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const UserService = require('./userService');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize UserService
const userService = new UserService();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'website')));

// Session configuration
app.use(session({
    secret: 'aibrary-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth.html');
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

app.get('/auth.html', (req, res) => {
    if (req.session.user) {
        res.redirect('/search.html');
    } else {
        res.sendFile(path.join(__dirname, 'website', 'auth.html'));
    }
});

app.get('/search.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'search.html'));
});

app.get('/admin.html', requireAuth, (req, res) => {
    // Check if user is admin
    if (req.session.user.role !== 'admin') {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'website', 'admin.html'));
});

// Serve AI Tools Data
app.get('/aiToolsData.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'website', 'aiToolsData.js'));
});

// API Routes
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Create new user using UserService
        const newUser = await userService.createUser({ username, email, password });
        
        // Create session
        req.session.user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        };
        
        res.json({ 
            success: true, 
            message: 'Registration successful',
            user: newUser
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ 
            success: false, 
            message: error.message || 'Internal server error' 
        });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Verify user credentials using UserService
        const user = await userService.verifyPassword(email, password);
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }
        
        // Create session
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        
        res.json({ 
            success: true, 
            message: 'Login successful',
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Error logging out' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Logout successful' 
        });
    });
});

app.get('/api/user', (req, res) => {
    if (req.session.user) {
        res.json({ 
            success: true, 
            user: req.session.user 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Not authenticated' 
        });
    }
});

// Admin routes for user management
app.get('/api/users', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Admin only.' 
        });
    }
    
    try {
        const users = userService.getAllUsers();
        res.json({ 
            success: true, 
            users,
            count: userService.getUserCount()
        });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

app.get('/api/users/:id', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Admin only.' 
        });
    }
    
    try {
        const user = userService.getUserById(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }
        
        res.json({ 
            success: true, 
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

app.put('/api/users/:id', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Admin only.' 
        });
    }
    
    try {
        const updatedUser = await userService.updateUser(parseInt(req.params.id), req.body);
        res.json({ 
            success: true, 
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ 
            success: false, 
            message: error.message || 'Internal server error' 
        });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Admin only.' 
        });
    }
    
    try {
        await userService.deleteUser(parseInt(req.params.id));
        res.json({ 
            success: true, 
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(400).json({ 
            success: false, 
            message: error.message || 'Internal server error' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Default admin credentials:');
    console.log('Email: admin@aibrary.com');
    console.log('Password: password123');
}); 