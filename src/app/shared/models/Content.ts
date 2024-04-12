import { Questions } from "./Questions";

export interface Content{
    contentText?: string;
    contentVideo?: string;
    contentQuestions?: Questions[];
}