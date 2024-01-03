export class DiscoverMenus {
    id: number;
    restaurantId: number;
    category: string;
    itemName: string;
    description: string;
    price: number;

    constructor(id = 0, restaurantId = 0, category = '', itemName = '', description = '', price = 0) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.category = category;
        this.itemName = itemName;
        this.description = description;
        this.price = price;
    }
}
