import {Book} from "../interface/interfaces";
import {PrismaClient} from "@prisma/client";
import axios from "axios";


export class RecommendationService {
    private static prismaClient = new PrismaClient();

    public static async getRecommendations(userId: number): Promise<Book[]> {
        const user = await this.prismaClient.user.findFirst({
            where: {
                id: userId,
            },
            include: {
                genres: true,
                sentiments: true,
            }
        });

        // const result = (await axios.post('', {})).data;

        return [] as Book[];
    }
    public static async getBaseRecommendation(keywords: string[]): Promise<Book[]> {
        const searchByGenre = keywords.map(item => {
            return {
                genre: item,
            }
        });

        const searchByDescription = keywords.map(item => {
            return {
                description: {
                    contains: item,
                }
            }
        });

        return await this.prismaClient.book.findMany({
            where: {
                OR: searchByGenre.concat(searchByDescription as any),
            }
        });
    }

}