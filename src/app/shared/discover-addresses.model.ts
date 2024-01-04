export class DiscoverAddresses {
    id: number;
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;

    constructor() {
        this.id = 0;
        this.street = '';
        this.postalCode = '';
        this.city = '';
        this.state = '';
        this.country = '';
    }
}
