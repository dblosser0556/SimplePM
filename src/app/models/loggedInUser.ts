import { User } from './user';
import { Role } from './role';

export class LoggedInUser {
    user: User;
    roles: Role[];
}
