export interface order{ 
    id: number, 
    table_id: number,
    product_id: number, 
    amount: number, 
    status: string, 
    comments: string, 
    ticket_number: number
}

export interface newOrder{
    table_id: number,
    product_id: number, 
    amount: number, 
    status: string, 
    comments: string, 
    ticket_number: number
}