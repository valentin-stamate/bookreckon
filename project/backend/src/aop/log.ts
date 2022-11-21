import { LOGGER } from "../logging/logger";

export class LogAspect
{
    static logBefore(meta: any) 
    {
        LOGGER.info(`Method ${meta.target.name}.${meta.method.name} is executing`);
    }

    static logAfter(meta: any) 
    {
        LOGGER.info(`Method ${meta.target.name}.${meta.method.name} executed.`);
    }

    static logException(meta : any)
    {
        LOGGER.severe(`Exception thrown: ${meta.exception}`)
    }
}