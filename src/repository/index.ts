import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

export const UserRepository = () => {
    return prisma.user
}

export const MessageRepository = () => {
    return prisma.message
}

export const MainTitleRepository = () => {
    return prisma.maintitle
}

export const ProjectRepository = () => {
    return prisma.project
}

export const HabilityRepository = () => {
    return prisma.hability
}

export const CertificationRepository = () => {
    return prisma.certifications
}

export const VideoRepository = () => {
    return prisma.video
}