import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services';
import { ErrorMsgService, ToastrType } from '../../services';
import { Project, Group, Status, LoggedInUser, ProjectList } from '../../models';
import { StatusService } from '../configuration/status/status.service';
import { GroupService } from '../configuration/group/group.service';
import { UtilityService } from '../../services/utility.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  currentProject: Project;
  groups: Group[];
  status: Status[];
  projectManagers: LoggedInUser[];
  templateList: ProjectList[];
  isTemplate: Boolean = false;

  isLoading = false;
  currentTab = 'Details';

  constructor(private projectService: ProjectService,
    private errorMsg: ErrorMsgService, private groupService: GroupService,
    private statusService: StatusService,
    private util: UtilityService,
    private userService: UserService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getPMList();
    this.getGroupList();
    this.getStatusList();
    this.getTemplateList();
    this.getProject();
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
      results => this.projectManagers = results,
      error => this.errorMsg.changeMessage(error));
  }

  getProject() {
    this.isLoading = true;
    this.route.queryParams
      .filter(params => params.projectId)
      .subscribe(params => {
        const id = params.projectId;

        this.projectService.getOne(id).subscribe(
          results => {
            this.currentProject = new Project();
            this.currentProject = results;

            // fill in the names of the drop downs for diplay.
            for (const resource of this.currentProject.resources) {
              resource.roleName = this.util.findRoleName(resource.roleId);
              resource.resourceTypeName = this.util.findTypeName(resource.resourceTypeId);
            }
            for (const fixedCost of this.currentProject.fixedPriceCosts) {
              fixedCost.fixedPriceTypeName = this.util.findFixedPriceTypeName(fixedCost.fixedPriceTypeId);
              fixedCost.resourceTypeName = this.util.findTypeName(fixedCost.resourceTypeId);
            }

            for (const month of this.currentProject.months) {
              month.phaseName = this.util.findPhaseName(month.phaseId);
            }



            this.isLoading = false;
          },
          error => {
            this.errorMsg.changeMessage(error);
          }
        );
      });
  }
  getTemplateList() {
    const queryParams = { '$filter': 'IsTemplate eq true' };
    this.projectService.getList(queryParams).subscribe(
      results => this.templateList = results,
      error => this.errorMsg.changeMessage(error)
    );

  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

}
