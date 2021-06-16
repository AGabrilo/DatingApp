export interface Rating {
    ratingUserId: number;
    ratedUserId: number;
    ratingUsername: string;
    ratedUsername: string;
    photoUrl:     string;
    age:          number;
    knownAs:      string;
    rateValue: number[];
}
