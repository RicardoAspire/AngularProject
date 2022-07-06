export interface UserI {
    id: number, 
    userName: string, 
    password: string,
    role: string
}

export interface UserDB{
    id: number, 
    userName: string, 
    password: string,
    role: string,
    dateTime: string,
    updateTime: string
}