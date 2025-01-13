import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ message: 'Access denied 2' });

        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);

        if(typeof verified !== 'object' || !verified.id) {
            res.status(400).json({ message: 'Access denied 1' });
            return;
        }

        req.body.userId = verified.id;
        console.log(verified);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

// verify user is a teacher or admin
export function verifyTeacher(req: Request, res: Response, next: NextFunction) {
    if (req.body.role !== 'trainer' && req.body.role !== 'admin' && req.body.role !== 'super_admin') {
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }

    next();
}

// verify user is an admin
export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.body.role !== 'admin' && req.body.role !== 'super_admin') {
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }

    next();
}

// verify user is a super admin

export function verifySuperAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.body.role !== 'super_admin') {
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }

    next();
}

// verify user id matches the user id in the token
export function verifyUserId(req: Request, res: Response, next: NextFunction) {
    if (req.body.userId !== Number(req.params.id) || req.body.role !== 'super_admin') {
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }

    next();
}