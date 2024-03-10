export type Invoice = {
  id: number;
  created_at: string;
  amount: number;
  client_id: number;
  status: string;
};

export type Invoices = Invoice[];
