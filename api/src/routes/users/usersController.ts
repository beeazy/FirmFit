import { Request, Response } from 'express';

export function listUsers(req: Request, res: Response) {
    res.send('Users List');
}

export function createUser(req: Request, res: Response) {
    res.send('User created');
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