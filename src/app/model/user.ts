export class User {

    constructor(
        public username: String,
        public password: String,
        public email?: String,
        public location?: String,
        public age?: number,
    ){}
}