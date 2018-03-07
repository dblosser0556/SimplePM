import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../configuration/project/project.service';
import { ErrorMsgService, ToastrType } from '../../../services';
import { Project, Group, Status } from '../../../models';
import { StatusService } from '../../configuration/status/status.service';
import { GroupService } from '../../configuration/group/group.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  currentProject: Project;
  groups: Group[];
  status: Status[];


  isLoading = false;
  currentTab = 'Details';

  constructor(private projectService: ProjectService,
    private errorMsg: ErrorMsgService, private groupService: GroupService,
    private statusService: StatusService,
    private util: UtilityService) {

   }

  ngOnInit() {
    this.getGroupList();
    this.getStatusList();

      this.getProject(2);
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

  getProject(id: number) {
    this.isLoading = true;
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
        console.log(this.currentProject);


        this.isLoading = false;
      },
      error => {
        this.errorMsg.showUserMessage(ToastrType.warning, 'Oops - Something Happened', error);
      }
    );

  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

}
