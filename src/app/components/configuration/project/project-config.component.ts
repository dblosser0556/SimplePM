import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services';
import { Project, ProjectList, Status, Group, LoggedInUser } from '../../../models';
import { Observable } from 'rxjs/Observable';
import { ErrorMsgService, ToastrType } from '../../../services';
import { StatusService } from '../status/status.service';
import { GroupService } from '../group/group.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

import '../../../rxjs-extensions';

@Component({
  selector: 'app-project-config',
  templateUrl: './project-config.component.html',
  styleUrls: ['./project-config.component.scss']
})
export class ProjectConfigComponent implements OnInit {


  projects: ProjectList[];
  projectList: ProjectList[];
  isTemplate = false;
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
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router) {
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
          this.errorMsg.showUserMessage(ToastrType.success, 'Success', 'Project been deleted');
          this.getList();
        },
        error =>  this.errorMsg.changeMessage(error));
    }
  }



  getList(): any {
    this.isLoading = true;
    this.selectedProject = undefined;
    this.route.queryParams.subscribe(
      params => {
        const queryParams = {...params.keys, ...params};
        if (params['$filter'] === 'IsTemplate eq true') {
          this.isTemplate = true;
        }
        this.projectService.getList(queryParams)
        .subscribe(results => {
          this.projects = results;
          this.isLoading = false;
        },
        error => this.errorMsg.changeMessage(error));
      }
    );
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
      results => { this.projectManagers = results; },
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

  showDetails(id: number) {
    this.router.navigate(['/configuration/project-details'], { queryParams: { projectId: id } });
  }
}
