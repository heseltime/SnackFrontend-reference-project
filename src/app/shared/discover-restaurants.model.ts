export class DiscoverRestaurants {
    id: number;
    name: string;
    addressId: number;
    gpsLat: number;
    gpsLong: number;
    webHookUrl: string;
    titleImage: Uint8Array | null;
    apiKey: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.addressId = 0;
        this.gpsLat = 0;
        this.gpsLong = 0;
        this.webHookUrl = '';
        this.titleImage = null;
        this.apiKey = '';
    }
}
