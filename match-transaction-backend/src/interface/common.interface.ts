export interface Order {
  type?: string;
  customerName: string;
  orderId: string;
  date: string;
  product: string;
  price: number;
}

export interface Transaction {
  type?: string;
  customerName: string;
  orderId: string;
  date: string;
  product: string;
  price: number;
  transactionType: string;
  transactionDate: string;
  transactionAmount: number;
}

export interface MatchedRecord {
  order: Order;
  transactions: Transaction[];
}
