  export  class CompositeKey {
    customerName: string;
    orderId: string;
    date: string;
    product: string;
    price: number;
  
    constructor(customerName: string, orderId: string, date: string, product: string, price: number) {
      this.customerName = customerName;
      this.orderId = orderId;
      this.date = date;
      this.product = product;
      this.price = price;
    }
  
    hashCode(): string {
      return `${this.customerName}-${this.orderId}-${this.date}-${this.product}-${this.price}`;
    }
  
    equals(other: CompositeKey): boolean {
      return this.customerName === other.customerName &&
        this.orderId === other.orderId &&
        this.date === other.date &&
        this.product === other.product &&
        this.price === other.price;
    }
  }