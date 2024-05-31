export interface iCar {
    id: string;
    type: string[];
    available: boolean;

}

export class Car {
    id: string;
    type: string[] = [];
    available: boolean = false;
    
        constructor(id: string = '', type: string[] = [], available: boolean = false) {
            this.id = id;
            this.type = type;
            this.available = available;
            
        }
}