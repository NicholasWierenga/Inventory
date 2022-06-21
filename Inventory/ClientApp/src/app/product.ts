export interface Product {
    data: Datum[];
    meta: Meta;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    start: number;
    limit: number;
    total: number;
}

export interface Datum {
    productId: string;
    upc: string;
    aisleLocation: Aislelocation[];
    brand: string
    categories: string[];
    countryOrigin: string;
    description: string;
    images: Image[];
    items: Item[];
    itemInformation: Iteminformation;
    temperature: Temperature;
}

export interface Iteminformation {
    depth: string;
    height: string;
    width: string;
}

export interface Temperature {
    indicator: string;
    heatSensitive: boolean;
}

export interface Aislelocation {
    bayNumber: string;
    description: string;
    number: string;
    numberOfFacings: string;
    side: string;
    shelfNumber: string;
    shelfPositionInBay: string;
}

export interface Image {
    perspective: string;
    sizes: Size[];
    featured: boolean;
}

export interface Size {
    size: string;
    url: string;
}

export interface Item {
    itemId: string;
    favorite: boolean;
    fulfillment: Fulfillment;
    price: Price;
    size: string;
    soldBy: string;
    inventory: ProductInv; // This is where our info goes. It links up with the itemId
}

export interface Fulfillment {
    curbside: boolean;
    delivery: boolean;
    inStore: boolean;
    shipToHome: boolean;
}

export interface Price {
    regular: number;
    promot: number;
}

export interface ProductInv { // This is a new object we are inserting into the Item interface.
    id: number;
    productName: string;
    onHand: number;
    sales: number;
    itemId: string;
}