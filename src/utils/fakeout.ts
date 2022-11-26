export const FAKEINFO = '';
export class fakeUserDB{
    public users: any[];
    private found: boolean;
    private user: any;

    constructor(){
        this.users = [
            {
                id: "15",
                usermame:"cornelius_pitts@yahoo.com",
                password:"password123",
                kind: "applicant"
            },
            {
                id: "12",
                usermame:"george@upwave.com",
                password:"password123",
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