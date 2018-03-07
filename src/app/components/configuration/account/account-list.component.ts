import { Component, OnInit } from '@angular/core';

import { UserService, ErrorMsgService, ToastrType } from '../../../services';
import { LoggedInUser, User, UserRole } from '../../../models';



@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss']
})


export class AccountListComponent implements OnInit {

    users: User[];
    selectedUser: LoggedInUser;
    roleList: string[];
    error: any;
    isLoading = false;

    constructor(private userService: UserService,
        private errMsg: ErrorMsgService) {
    }

    ngOnInit() {
        this.getList();
        this.getRoles();
    }




   /*  onDelete(id: number) {
        if (confirm('Are you sure to delete this record?') === true) {
            this.userService.delete(id)
                .subscribe(x => {
                  //  this.snackBar.open('User has been deleted', '', {duration: 2000});
                    this.getList();
                });
        }
    } */

    getList() {
        this.isLoading = true;
        this.userService.getAll()
            .subscribe(results => {
                this.users = results;
                this.isLoading = false;
            },
            error => this.errMsg.showUserMessage(ToastrType.warning, 'Oops-something went wrong', error));
        this.selectedUser = undefined;
    }

    getRoles() {
        this.userService.getRoles().subscribe( result => { this.roleList = result; },
        errors => this.errMsg.showUserMessage(ToastrType.warning, 'Ooops - Something went wrong', errors));
    }

    add() {
        const user = new LoggedInUser();

        // add all the standard roles to the user
        this.roleList.forEach(role => {
            const _userRole = new UserRole();
            _userRole.roleName = role;
            _userRole.selected = false;
            user.roles.push(_userRole);
        });
        this.selectedUser = user;
    }

    edit(user: User) {
        this.userService.getLoggedInUser(user.userName)
            .subscribe(results => {
                let _user = new LoggedInUser;
                _user = results;
                this.selectedUser = _user;

            },
        error => this.errMsg.showUserMessage(ToastrType.warning, 'Oops-something went wrong', error));
    }

    updateList(event: any) {
        this.getList();
    }
}
