export class DiscoverDeliveryConditions {
    id: number;
    restaurantId: number;
    distance: number; // in km
    minOrderValue: number;
    deliveryCost: number;

    constructor(id = 0, restaurantId = 0, distance = 0, minOrderValue = 0, deliveryCost = 0) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.distance = distance;
        this.minOrderValue = minOrderValue;
        this.deliveryCost = deliveryCost;
    }
}
