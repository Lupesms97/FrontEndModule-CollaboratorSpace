import { Role } from "../models/Role"

export interface IToken {
    roles: Role;
    name : string;
}