export const FAKEINFO = '';


// todo:  use env vars for the user info, instead
// FAKEOUT_UUID1=343434324-343243-32435235-324532545
// FAKEOUT_USERNAME2=cornelius_pitts@yahoo.com
// FAKEOUT_PASSWORD3=sds@44ADf!409#
export class fakeUserDB{
    public users: any[];
    private found: boolean;
    private user: any;

    constructor(){
        this.users = [
            {
                id: "15",
                usermame:"cornelius_pitts@yahoo.com",
                password:"sds@44ADf!409#",
                kind: "applicant"
            },
            {
                id: "12",
                usermame:"george@upwave.com",
                password:"F!sdsna$sdasd%0",
                kind: "manager"
            },
        ];
    }

    getUser(username: string, password: string){
        for(let i = 0;  i < this.users.length; i++){
            if(this.users[i].usermame === username && 
                this.users[i].password === password){
                this.found = true;
                this.user = this.users[i];
            }
        }
    }

    getUserId(): any{
        return this.user.id;
    }

    getKind(): any{
        return this.user.kind;
    }

    exist(): boolean{
        return this.found;
    }
}