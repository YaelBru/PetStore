export class Item {
    _id: string;
    name: string;
    show?:boolean;
    description: string;
    category: string;
    subcategory: string;
    brand: string;
    price: number;
    image: string;
}

export class SelectedItem {
    selectedItem: Item;
    itemQuantity: number;
    itemTotalPrice: number;
}
