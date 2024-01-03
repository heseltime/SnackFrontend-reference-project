export class DiscoverOrderItems {
    orderId: string; // Representing Guid as string in TypeScript
    menuId: number;
    quantity: number;

    constructor(orderId: string, menuId: number, quantity: number) {
        this.orderId = orderId;
        this.menuId = menuId;
        this.quantity = quantity;
    }
}
