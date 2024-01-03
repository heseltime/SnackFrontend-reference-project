export enum DeliveryStatus {
    Unknown = 0,
    OrderPlaced = 1,
    InTheKitchen = 2,
    OnTheWay = 3,
    Delivered = 4
}

export class DiscoverOrders {
    id: string; // Guid in C# can be represented as a string in TypeScript
    restaurantId: number;
    addressId: number;
    orderedBy: number;
    timestamp: Date; // DateTime in C# is represented as Date in TypeScript
    gpsLat: number;
    gpsLong: number;
    freeText: string;
    status: DeliveryStatus;

    constructor() {
        this.id = ''; // Initialize with default value
        this.restaurantId = 0; // Default value
        this.addressId = 0; // Default value
        this.orderedBy = 0; // Default value
        this.timestamp = new Date(); // Initialize with current date/time
        this.gpsLat = 0.0; // Default value
        this.gpsLong = 0.0; // Default value
        this.freeText = ''; // Default value
        this.status = DeliveryStatus.OrderPlaced; // Assuming 'Pending' is a value in the enum
    }
}
