import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import { db } from '../../db/index';
import { usersTable } from '../../db/usersSchema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export function listUsers(req: Request, res: Response) {
    res.send('Users List');
}

export async function createUser(req: Request, res: Response) {
    try {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(
                req.body.password,
                10
            ),
        }

        // // check if username already exists
        // const userExists = await db.select().from(usersTable).where(eq(usersTable.username, data.username));
        // if (userExists.length > 0) {
        //     return res.status(400).json({ message: 'Username already exists' });
        // }
    
        // // check if email already exists
        
        // const emailExists = await db.select().from(usersTable).where(eq(usersTable.email, data.email));
    
        // if (emailExists.length > 0) {
        //     return res.status(400).json({ message: 'Email already exists' });
        // }
    
    
        const [user]: { password?: string }[] = await db.insert(usersTable).values(data).returning();
        // hide password from response
        delete user.password;
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, check your credentials and try again" });
    }
}

export function getUserById(req: Request, res: Response) {
    res.send('User details for id: ' + req.params.id);
}

export function updateUserById(req: Request, res: Response) {
    res.send('User updated for id: ' + req.params.id);
}

export function deleteUserById(req: Request, res: Response) {
    res.send('User deleted for id: ' + req.params.id);
}

export async function loginUser(req: Request, res: Response) {
    try {
        const user: {
            id: any;
            email: any; 
            password?: string 
        }[] = await db.select().from(usersTable).where(eq(usersTable.email, req.body.email) || eq(usersTable.username, req.body.username));
        if (user.length === 0) {
            return res.status(400).json({ message: 'Authentication failed' });
        }

        if (!user[0].password) {
            return res.status(400).json({ message: 'Authentication failed' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Authentication failed' });
        }

        // hide password from response
        delete user[0].password;

        // create token

        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET as string,
            { expiresIn: '30d' }
        );


        res.status(200).json({ status: 'success', user: user[0], token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, try again" });
    }
}