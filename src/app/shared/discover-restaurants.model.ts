import { DiscoverAddresses } from "./discover-addresses.model";
import { DiscoverDeliveryConditions } from "./discover-delivery-conditions.model";

export class DiscoverRestaurants {
    id: number;
    name: string;
    address: DiscoverAddresses;
    gpsLat: number;
    gpsLong: number;
    webHookUrl: string;
    titleImage: Uint8Array | null;
    deliveryCondition: DiscoverDeliveryConditions | undefined;

    constructor() {
        this.id = 0;
        this.name = '';
        this.address = new DiscoverAddresses();
        this.gpsLat = 0;
        this.gpsLong = 0;
        this.webHookUrl = '';
        this.titleImage = null;
        this.deliveryCondition = undefined;
    }
}
