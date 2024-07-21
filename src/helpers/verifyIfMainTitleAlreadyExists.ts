import { MainTitleRepository } from "../repository";

export async function verifyIfMainTitleAlreadyExists(): Promise<number> {
    const maintitle = await MainTitleRepository().count()

    return maintitle
}