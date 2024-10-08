import { server } from '../config/db.js';
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../utils/staticdata.js'
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Query to check if the user exists
    const sql = "SELECT * FROM login WHERE email = ?";
    
    server.query(sql, [email], (err, data) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        // Check if user exists
        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = data[0];

        // Check if the password matches (assuming password is stored as plaintext, ideally use bcrypt)
        // Example with bcrypt: bcrypt.compare(password, user.password)
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Respond with user data and token
        return res.json({ success: true, data: {
                name: user.name,
                email: user.email,
                phone: user.phone || null,
                token,
                role: user.role
            }
        });
    });
}

export const addUser = (req, res) => {
    const { name, phone, email, password, role, pincode } = req.body;

    // Validate input data
    if (!name || !phone || !email || !password || !role) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // Step 1: Check if the email already exists
        const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
        server.query(checkEmailQuery, [email], (err, result) => {
            if (err) {
                console.error("Error while checking email: ", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (result.length > 0) {
                // Email already exists
                return res.status(400).json({ success: false, message: "Email already exists!" });
            }

            // Step 2: If email does not exist, insert the new user
            const insertUserQuery = "INSERT INTO login (name, phone, email, password, role, pincode) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [name, phone, email, password, role, pincode];

            server.query(insertUserQuery, values, (err, result) => {
                if (err) {
                    console.error("Error while adding user: ", err);
                    return res.status(500).json({ success: false, message: "Database error" });
                }

                // Return success message
                res.status(201).json({ success: true, message: role+" added successfully!" });
            });
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getUser = (req, res) => {
    const role = req.params.role;
    if(!role){
        res.status(400).json({ success: false, message: "Role is not defined." })
    }

    try {
        const getsql = "SELECT * FROM login WHERE role = ?";
        server.query(getsql, [role], (err, result) => {
            if (err) {
                console.error("Error while checking email: ", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (result.length === 0) {
                // Email already exists
                return res.status(400).json({ success: false, message: "Not Found"});
            }

            return res.status(200).json({ success: true, data: result });
        });
    }catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const editUser = (req, res) => {
    const { id, name, phone, email, password, role, pincode } = req.body;

    // Validate input data
    if (!id || !name || !phone || !email || !password || !role) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // Step 1: Check if the user exists
        const checkUserQuery = "SELECT * FROM login WHERE id = ?";
        server.query(checkUserQuery, [id], (err, result) => {
            if (err) {
                console.error("Error while checking user: ", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Step 2: If user exists, update the user details
            const updateUserQuery = `
                UPDATE login 
                SET name = ?, phone = ?, email = ?, password = ?, role = ?, pincode = ?
                WHERE id = ?
            `;
            const values = [name, phone, email, password, role, pincode, id];

            server.query(updateUserQuery, values, (err, result) => {
                if (err) {
                    console.error("Error while updating user: ", err);
                    return res.status(500).json({ success: false, message: "Database error" });
                }

                // Return success message
                res.status(200).json({ success: true, data: "User updated successfully!" });
            });
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getUserById = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).json({ success: false, message: "Role is not defined." })
    }

    try {
        const getsql = "SELECT * FROM login WHERE id = ?";
        server.query(getsql, [id], (err, result) => {
            if (err) {
                console.error("Error while checking email: ", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (result.length === 0) {
                // Email already exists
                return res.status(400).json({ success: false, message: "Not Found"});
            }

            return res.status(200).json({ success: true, data: result });
        });
    }catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteUserById = (req, res) => {
    const id = req.params.id;
    
    // Validate the id
    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required." });
    }

    try {
        const deleteSql = "DELETE FROM login WHERE id = ?";
        server.query(deleteSql, [id], (err, result) => {
            if (err) {
                console.error("Error while deleting user: ", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            return res.status(200).json({ success: true, message: "User deleted successfully" });
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


