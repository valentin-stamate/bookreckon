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

        const result = (await axios.post('', {})).data;

        return result as Book[];
    }
}