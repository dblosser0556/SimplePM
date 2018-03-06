import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services';
import { LoggedInUser } from '../../models';



@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss']
})

 
export class AccountListComponent implements OnInit {

    users: LoggedInUser[];
    selectedUser: LoggedInUser;
    error: any;
    isLoading = false;

    constructor(private userService: UserService,
      ) {
    }

    ngOnInit() {
        this.getList();
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
            error => this.error = error);
        this.selectedUser = undefined;
    }

    add() {
        const user = new LoggedInUser();
        this.selectedUser = user;
    }

    edit(user: LoggedInUser) {
        this.selectedUser = user;
    }

    updateList(event: any) {
        this.getList();
    }
}
