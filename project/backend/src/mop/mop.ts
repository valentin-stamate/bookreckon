export class Mop {
    static startCall(message: string) {
        console.log("Start Message: " + message);
    }

    static endCall(object: any, exception: any = undefined) {
        if (object === true) {
            console.log("The call ended with a valid response.");
        } else if (typeof object === "object") {
            console.log("The call ended with a successful object received: " + object);
        } else if (object === false){
            let errMsg = "The call throws the following exception: " + exception;
            console.log(errMsg);
            throw new Error(errMsg);
        } else if (object == null){
            console.log("The call ended with null or undefined.")
        }
    }

}