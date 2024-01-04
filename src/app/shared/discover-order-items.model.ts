import { DiscoverMenus } from "./discover-menus.model";

export class DiscoverOrderItems {
    menu: DiscoverMenus;
    quantity: number;

    constructor(menu: DiscoverMenus, quantity: number) {
        this.menu = menu;
        this.quantity = quantity;
    }
}
