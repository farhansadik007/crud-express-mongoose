
// for the fullname data
export interface UserName {
    firstName: string;
    lastName: string;
}

export interface UserAddress {
    street: string;
    city: string;
    country: string;
}

export interface UserOrder {
    productName: string;
    price: number;
    quantity: number;
}


// interface for the user
export interface User {
    userId: number;
    username: string;
    password: string;
    fullName: UserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: UserAddress;
    orders: UserOrder[];
}