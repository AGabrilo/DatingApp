import { Photo } from "./photo";
import { Rating } from "./rating";

 export interface Member {
    id:           number;
    username:     string;
    photoUrl:     string;
    age:          number;
    knownAs:      string;
    created:      Date;
    lastActive:   Date;
    gender:       string;
    introduction: string;
    lookingFor:   string;
    interests:    string;
    city:         string;
    country:      string;
    rateValue:    Rating[];
    photos:       Photo[];
}


