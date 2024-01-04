export class DiscoverUsers {
    id: number;
    userName: string;
    passwordHash: string;
    salt: string;
    latitude: number;
    longitude: number;

    constructor(id: number, userName: string, passwordHash: string, salt: string, latitude = 0, longitude = 0) {
        this.id = id;
        this.userName = userName;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
