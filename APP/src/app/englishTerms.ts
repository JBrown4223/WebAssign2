import {Definitions} from "./definitions"

export class EnglishTerms {
    _id: string;
    wordEnglish: string;
    wordNonEnglish: string;
    wordExpanded: string;
    languageCode: string;
    image: string;
    imageType: string;  
    audio: string;
    audioType: string;
    linkAuthoritative: string;
    linkWikipedia: string;
    linkYouTube: string;
    authorName: string;
    dateCreated: Date;
    dateRevised: Date;
    fieldOfStudy: string;   
    helpYes: Number;
    helpNo: Number;
    defString: string; //string that stores entered definition
    definitions: Array<Definitions>;
}