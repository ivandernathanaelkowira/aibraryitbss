const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

const USERS_FILE = path.join(__dirname, 'users.json');

class UserService {
    constructor() {
        this.users = [];
        this.loadUsers();
    }

    // Load users from JSON file
    async loadUsers() {
        try {
            const data = await fs.readFile(USERS_FILE, 'utf8');
            this.users = JSON.parse(data);
        } catch (error) {
            // If file doesn't exist, create it with default admin user
            if (error.code === 'ENOENT') {
                this.users = [
                    {
                        id: 1,
                        username: 'admin',
                        email: 'admin@aibrary.com',
                        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
                        role: 'admin',
                        createdAt: new Date().toISOString()
                    }
                ];
                await this.saveUsers();
            } else {
                console.error('Error loading users:', error);
                this.users = [];
            }
        }
    }

    // Save users to JSON file
    async saveUsers() {
        try {
            await fs.writeFile(USERS_FILE, JSON.stringify(this.users, null, 2), 'utf8');
        } catch (error) {
            console.error('Error saving users:', error);
            throw new Error('Failed to save users');
        }
    }

    // Get all users (without passwords)
    getAllUsers() {
        return this.users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }));
    }

    // Get user by email
    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    // Get user by username
    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    // Get user by ID
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    // Create new user
    async createUser(userData) {
        const { username, email, password, role = 'user' } = userData;

        // Check if user already exists
        if (this.getUserByEmail(email)) {
            throw new Error('User already exists with this email');
        }

        if (this.getUserByUsername(username)) {
            throw new Error('User already exists with this username');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: this.getNextId(),
            username,
            email,
            password: hashedPassword,
            role,
            createdAt: new Date().toISOString()
        };

        // Add to users array
        this.users.push(newUser);

        // Save to file
        await this.saveUsers();

        // Return user without password
        return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
        };
    }

    // Update user
    async updateUser(id, updateData) {
        const userIndex = this.users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        const user = this.users[userIndex];

        // Update allowed fields
        if (updateData.username && updateData.username !== user.username) {
            if (this.getUserByUsername(updateData.username)) {
                throw new Error('Username already taken');
            }
            user.username = updateData.username;
        }

        if (updateData.email && updateData.email !== user.email) {
            if (this.getUserByEmail(updateData.email)) {
                throw new Error('Email already taken');
            }
            user.email = updateData.email;
        }

        if (updateData.role) {
            user.role = updateData.role;
        }

        // Hash new password if provided
        if (updateData.password) {
            user.password = await bcrypt.hash(updateData.password, 10);
        }

        // Save to file
        await this.saveUsers();

        // Return updated user without password
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };
    }

    // Delete user
    async deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Don't allow deletion of admin user
        if (this.users[userIndex].role === 'admin') {
            throw new Error('Cannot delete admin user');
        }

        this.users.splice(userIndex, 1);
        await this.saveUsers();
    }

    // Verify password
    async verifyPassword(email, password) {
        const user = this.getUserByEmail(email);
        
        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }

    // Get next available ID
    getNextId() {
        if (this.users.length === 0) {
            return 1;
        }
        return Math.max(...this.users.map(user => user.id)) + 1;
    }

    // Get user count
    getUserCount() {
        return this.users.length;
    }

    // Get users by role
    getUsersByRole(role) {
        return this.users
            .filter(user => user.role === role)
            .map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }));
    }
}

module.exports = UserService; 