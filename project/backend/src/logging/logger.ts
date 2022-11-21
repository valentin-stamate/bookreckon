export class LOGGER
{
    static info(message: string)
    {
        const prelude = "LOGGER [INFO]";
        var ts = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
        console.log('\x1b[36m%s\x1b[0m', `${prelude}: ${ts} > ${message}`)
    }

    static warning(message: string)
    {
        const prelude = "LOGGER [WARNING]";
        var ts = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
        console.log('\x1b[33m%s\x1b[0m', `${prelude}: ${ts} > ${message}`)
    }

    static severe(message: string)
    {
        const prelude = "LOGGER [SEVERE]";
        var ts = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
        console.log('\x1b[31m%s\x1b[0m', `${prelude}: ${ts} > ${message}`)
    }
}