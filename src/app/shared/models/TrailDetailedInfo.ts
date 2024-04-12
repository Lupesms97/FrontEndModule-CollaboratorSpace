import { Content } from "./Content";
import { TypeTrail } from "./TypeTrail";

export interface TrailDetailedData{
    content: Content;
    department: string;
    finish: boolean;
    intro: string;
    resourceLocation: string;
    title: string;
    type: TypeTrail;
}
