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
  groupOptionsList: Group[];

  error: any;
  isLoading = false;

  constructor(private itemService: GroupService,
    private userService: UserService,
    private errorMsg: ErrorMsgService) {
  }

  ngOnInit() {
    this.getPMList();
    this.getGroupList();
    this.getList();

  }




  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?') === true) {
      // don't delete if there is a child or project assigned.
      ////////

      this.itemService.delete(id)
        .subscribe(x => {
           // this.snackBar.open('Phase has been deleted', '', { duration: 2000 });
          this.getGroupList();
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

  getGroupList() {
    this.itemService.getOptionList().subscribe(
      results => {this.groupOptionsList = results;
      console.log('groupOptions', this.groupOptionsList);},
      error => this.errorMsg.changeMessage(error));
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
    this.getGroupList();
    this.getList();
  }

}
