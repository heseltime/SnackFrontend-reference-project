import { DiscoverAddresses } from "./discover-addresses.model";
import { DiscoverMenus } from "./discover-menus.model";
import { DiscoverOrderItems } from "./discover-order-items.model";
import { DiscoverRestaurants } from "./discover-restaurants.model";

export enum DeliveryStatus {
    Unknown = 0,
    OrderPlaced = 1,
    InTheKitchen = 2,
    OnTheWay = 3,
    Delivered = 4
}

export class DiscoverOrders {
    id: number;
    restaurant: DiscoverRestaurants;
    address: DiscoverAddresses;
    orderedBy: number;
    timestamp: Date; // DateTime in C# is represented as Date in TypeScript
    gpsLat: number;
    gpsLong: number;
    freeText: string;
    status: DeliveryStatus;
    items: DiscoverOrderItems[] = [];

    constructor() {
        this.id = 0; // Default value
        this.restaurant = new DiscoverRestaurants(); // Default value
        this.address = new DiscoverAddresses(); // Default value
        this.orderedBy = 0; // Default value
        this.timestamp = new Date(); // Initialize with current date/time
        this.gpsLat = 0.0; // Default value
        this.gpsLong = 0.0; // Default value
        this.freeText = ''; // Default value
        this.status = DeliveryStatus.OrderPlaced; // Assuming 'Pending' is a value in the enum
        this.items = []; // Initialize with empty array
    }
}
