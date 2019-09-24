export class AuthResponse {
    constructor(public email: string, public accessToken: string, public exp: string,
                public isSuperuser: boolean, public userType: string) {
        // console.log(email, accessToken, exp, isSuperuser, userType);
    }
    // corresponds to the response that will be returned form authentication server we'll be creating

    public getEmail(): string {
        return this.email;
    }
}
