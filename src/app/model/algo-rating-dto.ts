export class AlgoRatingDTO{

    constructor(
        public username: String,
        public algo: Algorithm,
        public rating: number
    ){}
}

export enum Algorithm {
    DBSCAN,
    KNN,
    KMEANS
}