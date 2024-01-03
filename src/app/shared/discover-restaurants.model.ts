import { DiscoverDeliveryConditions } from "./discover-delivery-conditions.model";

export class DiscoverRestaurants {
    id: number;
    name: string;
    addressId: number;
    gpsLat: number;
    gpsLong: number;
    webHookUrl: string;
    titleImage: Uint8Array | null;
    apiKey: string;
    deliveryCondition: DiscoverDeliveryConditions | undefined;

    constructor() {
        this.id = 0;
        this.name = '';
        this.addressId = 0;
        this.gpsLat = 0;
        this.gpsLong = 0;
        this.webHookUrl = '';
        this.titleImage = null;
        this.apiKey = '';
        this.deliveryCondition = undefined;
    }
}
