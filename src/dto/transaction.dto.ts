export type BalanceResponseType = {
  balance: number
};

export type RecordType = {
  invoice_number: number
  transaction_type: string
  description: string
  total_amount: number,
  created_on: string
};

export type ctResponse = {
  invoice_number: number
  service_code: string
  service_name: string
  transaction_type: string
  total_amount: number,
  created_on: string
}

export type TransactionResponseType = {
  offset: number
  limit: number
  records: RecordType[]
}