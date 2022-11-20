export class LogAspect 
{
    static log(meta: any) 
    {
        console.log('Called: ', meta.target);
        console.log('Args: ', meta.args.length);
    }
}