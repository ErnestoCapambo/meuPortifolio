import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";

export async function createMensage(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { costumer_name, costumer_email, costumer_contact, description } = req.body
        const mensage = await prisma.mensage.create({
            data: {
                costumer_name,
                costumer_email,
                costumer_contact,
                description
            }
        })
        return res.status(201).send()
    } catch (err: any) {
        return res.status(500).json(err)
    }
}
