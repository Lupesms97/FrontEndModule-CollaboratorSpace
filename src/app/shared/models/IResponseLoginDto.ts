export interface IResponseLoginDto {
    token:string;
    acessInfo:{
        permission: string[];
        availiableCompanies: string[];
    }
}