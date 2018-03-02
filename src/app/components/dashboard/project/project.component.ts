import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../configuration/project/project.service';
import { ErrorMsgService, ToastrType } from '../../../services';
import { UtilityService } from '../../../services/utility.service';
import { Project } from '../../../models';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  currentProject: Project;
  isLoading = false;
  currentTab = 'Details';

  constructor(private projectService: ProjectService,
    private errorMsgService: ErrorMsgService, private util: UtilityService) {

   }

  ngOnInit() {
      this.getProject(2);
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
        for (const fixedCost of this.currentProject.fixedPriceCosts){
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
        this.errorMsgService.showUserMessage(ToastrType.warning, 'Oops - Something Happened', error);
      }
    );

  }
  
  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

}
