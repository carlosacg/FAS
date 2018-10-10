export class User {
    constructor(identification='',user_name='',last_name='',email='',pass='',picture=''){
        this.identification=identification;
        this.user_name=user_name;
        this.last_name=last_name;
        this.email=email;
        this.pass=pass;
        this.picture=picture;

    }
    identification: string;
    user_name: string;
    last_name : string;
    email : string;
    pass : string;
    picture : string;
}
