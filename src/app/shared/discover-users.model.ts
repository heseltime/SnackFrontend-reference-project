export class DiscoverUsers {
    id: number;
    userName: string;
    passwordHash: string;
    salt: string;

    constructor(id: number, userName: string, passwordHash: string, salt: string) {
        this.id = id;
        this.userName = userName;
        this.passwordHash = passwordHash;
        this.salt = salt;
    }
}
