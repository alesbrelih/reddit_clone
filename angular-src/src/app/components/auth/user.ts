export class User {

    //privates
    private username: string;


    constructor(obj:any){
        const userInformation = obj.data;
        this.username = userInformation.username;
    }

}
