export interface iCar {
    id: string;
    type: string[];
    isAvailable: boolean;

}

export class Car {
    id: string;
    type: string[] = [];
    isAvailable: boolean = false;
    
        constructor(id: string = '', type: string[] = [], isAvailable: boolean = false) {
            this.id = id;
            this.type = type;
            this.isAvailable = isAvailable;
            
        }
}