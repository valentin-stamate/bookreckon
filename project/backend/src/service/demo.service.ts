export class DemoService {

    static async demoServiceMethod(param: string): Promise<any> {
        return {
            message: param,
        };
    }

}