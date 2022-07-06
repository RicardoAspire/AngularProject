import { Time } from "@angular/common";

export interface ticket{
    id: number,
    table_id: number,
    date: string,
    hour: string,
    total: number,
}

export interface newTicket{
    table_id: number,
    date: string,
    hour: string,
    total: number,
}