import { User } from './user';

export class LoggedInUser {
    currentUser: User;
    roles: string[];

    constructor() {
        this.currentUser = new User();
    }
}
