import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const UserRepository = () => {
    return prisma.user
}

export const AboutRepository = () => {
    return prisma.about
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

export const EspecialityRepository = () => {
    return prisma.especiality
}

export const CertificationRepository = () => {
    return prisma.certifications
}