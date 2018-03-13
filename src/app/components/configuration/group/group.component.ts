import { Component, OnInit } from '@angular/core';
import { GroupService } from './group.service';
import { Group, User, LoggedInUser } from '../../../models';
import { ErrorMsgService } from '../../../services';
import { UserService } from '../../../services';

@Component({
  selector: 'app-project-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  items: Group[];
  selectedItem: Group;
  managers: LoggedInUser[];

  error: any;
  isLoading = false;

  constructor(private itemService: GroupService,
    private userService: UserService,
    private errorMsg: ErrorMsgService) {
  }

  ngOnInit() {
    this.getPMList();
    this.getList();

  }




  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?') === true) {
      this.itemService.delete(id)
        .subscribe(x => {
           // this.snackBar.open('Phase has been deleted', '', { duration: 2000 });
          this.getList();
        },
        error =>  this.errorMsg.changeMessage(error));
    }
  }

  getList() {
    this.isLoading = true;
    this.itemService.getAll()
      .subscribe(results => {
        this.items = results;
        this.isLoading = false;
      },
      error => this.errorMsg.changeMessage(error));
    this.selectedItem = undefined;
  }

  getPMList() {
    this.userService.getUserInRoles('editPrograms').subscribe(
      results => {
        this.managers = results;
      },
      error => this.errorMsg.changeMessage(error));
  }

  add() {
    this.selectedItem = new Group();
  }

  edit(item: Group) {
    this.selectedItem = item;
  }

  updateList(event: any) {
    this.getList();
  }

}
