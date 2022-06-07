export interface JwtResponseI {
    dataUser:{
        id: number, 
        name: string, 
        email: string, 
        accessTocken: string, 
        expiresIn: string
    }
}
