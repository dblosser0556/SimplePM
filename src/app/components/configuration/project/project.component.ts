import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project, ProjectList, Status, Group, LoggedInUser } from '../../../models';
import { Observable } from 'rxjs/Observable';
import { ErrorMsgService } from '../../../services';
import { StatusService } from '../status/status.service';
import { GroupService } from '../group/group.service';
import { UserService } from '../../../services/user.service';

import '../../../rxjs-extensions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  projects: ProjectList[];
  projectList: ProjectList[];

  selectedProject: Project;
  groups: Group[] = [];
  status: Status[] = [];
  projectManagers: LoggedInUser[] = [];

  error: any;
  isLoading = false;

  constructor(private projectService: ProjectService,
      private errorMsg: ErrorMsgService,
      private statusService: StatusService,
      private groupService: GroupService,
      private userService: UserService) {
  }

  ngOnInit() {
    this.getList();
    this.getGroupList();
    this.getStatusList();
    this.getPMList();
  }




  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?') === true) {
      this.projectService.delete(id)
        .subscribe(x => {
          // this.snackBar.open('Project been deleted', '', { duration: 2000 });
          this.getList();
        },
        error =>  this.errorMsg.changeMessage(error));
    }
  }

  getList() {
    this.isLoading = true;
    this.projectService.getList()
      .subscribe(results => {
        this.projects = results;
        this.isLoading = false;
        console.log(this.projects);
      },
      error => this.errorMsg.changeMessage(error));
    this.selectedProject = undefined;
  }

  getStatusList() {
    this.statusService.getOptionList().subscribe(
      results => this.status = results,
      error => this.errorMsg.changeMessage(error));
  }

  getGroupList() {
    this.groupService.getOptionList().subscribe(
      results => this.groups = results,
      error => this.errorMsg.changeMessage(error));
  }

  getPMList() {
    this.userService.getUserInRoles('editProjects').subscribe(
      results => { this.projectManagers = results;
      console.log('ProjectM', this.projectManagers);
      console.log('PM ret: ', results) },
      error => this.errorMsg.changeMessage(error));
  }

  add() {
    this.selectedProject = new Project();
  }

  edit(project: Project) {
    this.selectedProject = project;
  }

  updateList(event: any) {
    this.getList();
  }
}
