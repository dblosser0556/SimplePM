import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import {
  Project, Resource, ResourceMonth, Month,
  Phase, ResourceType, FixedPriceType, Role, FixedPrice,
  FixedPriceMonth,
  CapWeightPercent
} from '../../../../models';
import { ProjectService } from '../../../configuration/project/project.service';
import { ErrorMsgService, ToastrType} from '../../../../services';
import { UtilityService } from '../../../../services/utility.service';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { ConfigService } from '../../../../services/config.service';



export enum EditingType {
  none,
  month,
  resource,
  fixedPrice
}

@Component({
  selector: 'app-project-monthly-detail',
  templateUrl: './project-monthly-detail.component.html',
  styleUrls: ['./project-monthly-detail.component.scss']
})
export class ProjectMonthlyDetailComponent implements OnInit {

  @Input() project: Project;
  @Input() selectedView: string;
  


  phaseList: Phase[] = [];
  resourceTypeList: ResourceType[] = [];
  fixedPriceTypeList: FixedPriceType[] = [];
  roleList: Role[] = [];
  selectedCells = [];

  menuItems: CapWeightPercent[] = [];

  savedResource: Resource;
  savedFixedPrice: FixedPrice;
  displayProject: Project;
  lcol = 3;
  fcol = 0;
  pageSize = 5;

  showPaginator = true;

  editingIndex = -1;
  editingType: EditingType = EditingType.none;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calcPageSize(event.target.innerWidth);
  }

  @HostListener('document:keyup', ['$event']) handleKeyUpEvent(event: KeyboardEvent) {

    if (event.key === 'Escape') {
      switch (this.editingType) {
        case EditingType.none:
          return;
        case EditingType.month:
          this.cancelPhase(this.project.months[this.editingIndex], this.editingIndex);
          return;
        case EditingType.fixedPrice:
          this.cancelFixedPriceEdit(this.project.fixedPriceCosts[this.editingIndex], this.editingIndex);
          return;
        case EditingType.resource:
          this.cancelResourceEdit(this.project.resources[this.editingIndex], this.editingIndex);
          return;

      }
    }
  }

  constructor(
    private projectService: ProjectService,
    private errors: ErrorMsgService,
    private util: UtilityService,
    private config: ConfigService) {

    this.phaseList = this.util.getPhaseList();
    this.fixedPriceTypeList = this.util.getFixedPriceTypeList();
    this.resourceTypeList = this.util.getResourceTypeList();
    this.roleList = this.util.getRoles();

  }


  ngOnInit() {
    const actualHeight = window.innerHeight;
    const actualWidth = window.innerWidth;
    this.calcPageSize(actualWidth);
    this.selectedView = 'Forecast';
    this.menuItems = this.config.capWeightConfig;

  }

  
  getSelectedCells(event) {
    // this get the set of cells that are selected in the month columns
    // using the multiselected cell directive.  
    // It returns a set of TD elememnts
    this.selectedCells = event;
  }
  
  saveProject() {
    this.projectService.update(this.project.projectId, this.project).subscribe(
      results => {
        this.errors.showUserMessage(ToastrType.success, 'Congrates', 'Project has been saved', false, 2000);
      },
      errors => this.errors.showUserMessage(ToastrType.warning, 'Oops - Bad on Me', errors)
    );


  }
  // Add months and resources
  addMonth() {

    if (this.project.months === null) {
      this.project.months = [];
    }

    const projectMonth = new Month();

    projectMonth.projectId = this.project.projectId;
    projectMonth.monthNo = 0;
    projectMonth.phaseId = -1;
    projectMonth.monthId = -1;
    projectMonth.phaseName = '--Select--';
    projectMonth.totalActualCapital = 0;
    projectMonth.totalActualExpense = 0;
    projectMonth.totalPlannedCapital = 0;
    projectMonth.totalPlannedExpense = 0;


    const monthNo = this.project.months.push(projectMonth) - 1;
    projectMonth.monthNo = monthNo;

    if (this.project.resources !== null) {
      for (const resource of this.project.resources) {
        this.addResourceMonth(resource, monthNo);

      }
    }

    if (this.project.fixedPriceCosts !== null) {
      for (const fixedPrice of this.project.fixedPriceCosts) {
        this.addFixedPriceMonth(fixedPrice, monthNo);

      }
    }

    const actualWidth = window.innerWidth;
    this.calcPageSize(actualWidth);
    this.errors.showUserMessage(ToastrType.success, 'Congrates', 'Month has been added', false, 2000);

  }

  addResource() {

    if (this.project.resources === null) {
      this.project.resources = [];
    }

    const resource = new Resource();
    resource.projectId = this.project.projectId,
      resource.resourceId = this.project.resources.entries.length,
      resource.resourceName = '',
      resource.resourceTypeId = -1;
    resource.resourceTypeName = 'Please Select';
    resource.roleId = -1;
    resource.roleName = 'Please Select';
    resource.rate = 0;
    resource.vendor = '';
    resource.totalActualEffort = 0;
    resource.totalPlannedEffort = 0;
    


    this.project.resources.push(resource);

    if (this.project.months != null) {
      for (const projectMonth of this.project.months) {
        this.addResourceMonth(resource, projectMonth.monthNo);
      }
    }

    this.errors.showUserMessage(ToastrType.success, 'Congrates', 'Resource has been added', false, 2000);

  }

  addResourceMonth(resource: Resource, monthNo: number) {

    if (resource.resourceMonths === null ||
      resource.resourceMonths === undefined) {
      resource.resourceMonths = [];
    }

    const resourceMonth = new ResourceMonth();
    resourceMonth.resourceMonthId = -1;
    resourceMonth.resourceId = resource.resourceId;
    resourceMonth.monthNo = monthNo;
    resourceMonth.actualEffort = 0;
    resourceMonth.actualEffortCapPercent = 1;
    resourceMonth.actualEffortStyle = 1;
    resourceMonth.actualEffortInError = false;
    resourceMonth.plannedEffort = 0;
    resourceMonth.plannedEffortCapPercent = 1;
    resourceMonth.plannedEffortStyle = 1;
    resourceMonth.plannedEffortInError = false;
  
    resource.resourceMonths.push(resourceMonth);

  }

  addProjectFixedPrice() {
    if (this.project.fixedPriceCosts === null) {
      this.project.fixedPriceCosts = [];
    }

    const fixedPrice = new FixedPrice();
    fixedPrice.projectId = this.project.projectId,
      fixedPrice.fixedPriceId = -1,
      fixedPrice.fixedPriceName = '',
      fixedPrice.resourceTypeId = -1;
    fixedPrice.resourceTypeName = 'Please Select';
    fixedPrice.fixedPriceTypeId = -1;
    fixedPrice.fixedPriceTypeName = 'Please Select';
    fixedPrice.vendor = '';


    this.project.fixedPriceCosts.push(fixedPrice);

    if (this.project.months != null) {
      for (const projectMonth of this.project.months) {
        this.addFixedPriceMonth(fixedPrice, projectMonth.monthNo);
      }
    }

    this.errors.showUserMessage(ToastrType.success, 'Congrates', 'Fixed Price Row has been added', false, 2000);
  }

  addFixedPriceMonth(projectFixedPrice: FixedPrice, monthNo: number) {

    if (projectFixedPrice.fixedPriceMonths === null ||
      projectFixedPrice.fixedPriceMonths === undefined) {
      projectFixedPrice.fixedPriceMonths = [];
    }

    const fixedPriceMonth = new FixedPriceMonth();
    fixedPriceMonth.fixedPriceMonthId = -1;
    fixedPriceMonth.fixedPriceId = -1;
    fixedPriceMonth.monthNo = monthNo;
    fixedPriceMonth.actualCost = 0;
    fixedPriceMonth.actualCostCapPercent = 1;
    fixedPriceMonth.actualCostStyle = 1;
    fixedPriceMonth.actualCostInError = false;
    fixedPriceMonth.plannedCost = 0;
    fixedPriceMonth.plannedCostCapPercent = 1;
    fixedPriceMonth.plannedCostStyle = 1;
    fixedPriceMonth.plannedCostCapInError = false;


    projectFixedPrice.fixedPriceMonths.push(fixedPriceMonth);

  }

  editPhase(month, index) {
    if (this.editingIndex === -1) {
      month.editMode = true;
      this.editingIndex = index;
      this.editingType = EditingType.month;
    } else if (this.editingIndex !== index  && this.editingType !== EditingType.month) {
      this.errors.showUserMessage(ToastrType.info, 'Sorry', 'Only one item at a time', false, 2000);
    }
  }

  updatePhase(event, month) {
    month.phaseId = Number(event.target.value);
    month.phaseName = this.util.findPhaseName(month.phaseId);
    month.editMode = false;
    this.editingType = EditingType.none;
    this.editingIndex = -1;
  }

  cancelPhase(month, index) {
    month.editMode = false;
    this.editingType = EditingType.none;
    this.editingIndex = -1;
  }

  // Manage in-line editing for the Project Resource
  editResource(resource, index) {
    if (this.editingIndex === -1) {
      resource.editMode = true;
      this.editingIndex = index;
      this.editingType = EditingType.resource;
      this.savedResource = new Resource(resource);
    } else if (this.editingIndex !== index  && this.editingType !== EditingType.resource) {
      this.errors.showUserMessage(ToastrType.info, 'Sorry', 'Only one row at a time', false, 2000);
    }

  }

  cancelResourceEdit(resource, index) {
    // reset the resource based on the saved values

    resource.projectId = this.savedResource.projectId;
    resource.resourceId = this.savedResource.resourceId;
    resource.resourceName = this.savedResource.resourceName;
    resource.roleId = this.savedResource.roleId;
    resource.roleName = this.savedResource.roleName;
    resource.rate = this.savedResource.rate;
    resource.resourceTypeId = this.savedResource.resourceTypeId;
    resource.resourceTypeName = this.savedResource.resourceTypeName;
    resource.vendor = this.savedResource.vendor;

    if (this.savedResource.resourceMonths !== null) {
      let i = 0;
      for (const month of this.savedResource.resourceMonths) {
        resource.resourceMonths[i].actualEffort = month.actualEffort;
        resource.resourceMonths[i].actualEffortCapPercent = month.actualEffortCapPercent;
        resource.resourceMonths[i].monthNo = month.monthNo;
        resource.resourceMonths[i].plannedEffort = month.plannedEffort;
        resource.resourceMonths[i].plannedEffortCapPercent = month.plannedEffortCapPercent;
        resource.resourceMonths[i].resourceId = month.resourceId;
        resource.resourceMonths[i].resourceEffortMonthId = month.resourceMonthId;
        i++;
      }
    }

    resource.editMode = false;
    this.editingIndex = -1;
    this.editingType = EditingType.none;
  }

  deleteResource(resource, index) {
    this.project.resources.splice(index, 1);
  }

  saveResourceEdit(resource, index) {
    resource.editMode = false;
    this.editingIndex = -1;
    this.editingType = EditingType.none;
  }

  updateResource(event, cell, resource, month?, mIndex?) {


    switch (cell) {
      case 'resourceName':
        resource.resourceName = event.target.value;
        break;
      case 'vendor':
        resource.vendor = event.target.value;
        break;
      case 'rate':
        resource.rate = event.target.value;
        this.updateMonthlyResourceTotal(resource);
        this.updateAllMonthlyTotals();
        break;
      case 'role':
        resource.roleId = Number(event.target.value);
        resource.roleName = this.util.findRoleName(resource.roleId);
        break;
      case 'type':
        resource.resourceTypeId = Number(event.target.value);
        resource.resourceTypeName = this.util.findTypeName(resource.resourceTypeId);
        break;
      case 'effortmonth':
        month.plannedEffort = Number(event.target.value);
        this.updateMonthlyResourceTotal(resource);
        this.updateMonthlyTotals(mIndex);
        break;
      case 'actualmonth':
        month.actualEffort = Number(event.target.value);
        this.updateMonthlyResourceTotal(resource);
        this.updateMonthlyTotals(mIndex);
        break;
    }


  }

  // support fixed price entry rows
  // Manage in-line editing for the Project Resource


  editFixedPrice(fixedPrice, index) {
    if (this.editingIndex === -1) {
      fixedPrice.editMode = true;
      this.editingIndex = index;
      this.editingType = EditingType.fixedPrice;
      this.savedFixedPrice = new FixedPrice(fixedPrice);
    } else if (this.editingIndex !== index  && this.editingType !== EditingType.fixedPrice) {
      this.errors.showUserMessage(ToastrType.info, 'Sorry', 'Only one row at a time', false, 2000);
    }

  }

  cancelFixedPriceEdit(fixedPrice, index) {
    // reset the fixedPrice based on the saved values

    fixedPrice.projectId = this.savedFixedPrice.projectId;
    fixedPrice.fixedPriceId = this.savedFixedPrice.fixedPriceId;
    fixedPrice.fixedPriceName = this.savedFixedPrice.fixedPriceName;
    fixedPrice.projectRoleId = this.savedFixedPrice.resourceTypeId;
    fixedPrice.projectRoleName = this.savedFixedPrice.resourceTypeName;
    fixedPrice.fixedPriceTypeId = this.savedFixedPrice.fixedPriceTypeId;
    fixedPrice.fixedPriceTypeName = this.savedFixedPrice.fixedPriceTypeName;
    fixedPrice.vendor = this.savedFixedPrice.vendor;

    if (this.savedFixedPrice.fixedPriceMonths !== null) {
      let i = 0;
      for (const month of this.savedFixedPrice.fixedPriceMonths) {
        fixedPrice.fixedPriceMonths[i].actualCost = month.actualCost;
        fixedPrice.fixedPriceMonths[i].actualCostCapPercent = month.actualCostCapPercent;
        fixedPrice.fixedPriceMonths[i].monthNo = month.monthNo;
        fixedPrice.fixedPriceMonths[i].plannedCost = month.plannedCost;
        fixedPrice.fixedPriceMonths[i].plannedCostCapPercent = month.plannedCostCapPercent;
        fixedPrice.fixedPriceMonths[i].projectFixedPriceId = month.fixedPriceId;
        fixedPrice.fixedPriceMonths[i].fixedPriceMonthId = month.fixedPriceMonthId;
        i++;
      }
    }

    fixedPrice.editMode = false;
    this.editingIndex = -1;
    this.editingType = EditingType.none;
  }

  deleteFixedPrice(fixedPrice, index) {
    this.project.fixedPriceCosts.splice(index, 1);
  }

  saveFixedPriceEdit(fixedPrice, index) {
    fixedPrice.editMode = false;
    this.editingIndex = -1;
    this.editingType = EditingType.none;
  }

  updateFixedPrice(event, cell, fixedPrice, month?, mIndex?) {


    switch (cell) {
      case 'name':
        fixedPrice.fixedPriceName = event.target.value;
        break;
      case 'vendor':
        fixedPrice.vendor = event.target.value;
        break;
      case 'role':
        fixedPrice.fixedPriceTypeId = Number(event.target.value);
        fixedPrice.fixedPriceTypeName = this.util.findFixedPriceTypeName(fixedPrice.fixedPriceTypeId);
        break;
      case 'type':
        fixedPrice.resourceTypeId = Number(event.target.value);
        fixedPrice.resourceTypeName = this.util.findTypeName(fixedPrice.resourceTypeId);
        break;
      case 'plannedcost':
        month.plannedCost = Number(event.target.value);
        this.updateMonthlyFixedCostTotal(fixedPrice);
        this.updateMonthlyTotals(mIndex);
        break;
      case 'actualcost':
        month.actualCost = Number(event.target.value);
        this.updateMonthlyFixedCostTotal(fixedPrice);
        this.updateMonthlyTotals(mIndex);
        break;
    }
  }

  updateMonthlyResourceTotal(resource: Resource) {
    let totalPlannedEffort = 0;
    let totalActualEffort = 0;
    for (const month of resource.resourceMonths) {
      totalPlannedEffort += month.plannedEffort;
      totalActualEffort += month.actualEffort;
    }
    resource.totalPlannedEffort = totalPlannedEffort;
    resource.totalActualEffort = totalActualEffort;
  }

  updateMonthlyFixedCostTotal(fixedCost: FixedPrice) {
    let totalPlannedCost = 0;
    let totalActualCost = 0;
    for (const month of fixedCost.fixedPriceMonths) {
      totalPlannedCost += month.plannedCost;
      totalActualCost += month.actualCost;
    }
    fixedCost.totalPlannedCost = totalPlannedCost;
    fixedCost.totalActualCost = totalActualCost;
  }

  updateAllMonthlyTotals() {
    this.project.months.forEach(month => {
      this.updateMonthlyTotals(month.monthNo - 1);
    });
  }
  // consider refactoring to be only for the current month.
  updateMonthlyTotals(i) {

    let totalActualExpense = 0;
    let totalActualCapital = 0;
    let totalPlannedExpense = 0;
    let totalPlannedCapital = 0;

    for (const resource of this.project.resources) {
      totalActualCapital += resource.resourceMonths[i].actualEffort * resource.rate * 
          resource.resourceMonths[i].actualEffortCapPercent;
      totalPlannedCapital += resource.resourceMonths[i].plannedEffort * resource.rate * 
          resource.resourceMonths[i].plannedEffortCapPercent;
      totalActualExpense += resource.resourceMonths[i].actualEffort * resource.rate * 
          (1 - resource.resourceMonths[i].actualEffortCapPercent);
      totalPlannedExpense += resource.resourceMonths[i].plannedEffort * resource.rate * 
          (1 - resource.resourceMonths[i].plannedEffortCapPercent);
    }

    for (const fixedPrice of this.project.fixedPriceCosts) {

      totalActualCapital += fixedPrice.fixedPriceMonths[i].actualCost * fixedPrice.fixedPriceMonths[i].actualCostCapPercent;
      totalPlannedCapital += fixedPrice.fixedPriceMonths[i].plannedCost * fixedPrice.fixedPriceMonths[i].plannedCostCapPercent;
      totalActualExpense += fixedPrice.fixedPriceMonths[i].actualCost * (1 - fixedPrice.fixedPriceMonths[i].actualCostCapPercent);
      totalPlannedExpense += fixedPrice.fixedPriceMonths[i].plannedCost * (1 - fixedPrice.fixedPriceMonths[i].plannedCostCapPercent);
    }

    this.project.months[i].totalActualCapital = totalActualCapital;
    this.project.months[i].totalPlannedCapital = totalPlannedCapital;
    this.project.months[i].totalActualExpense = totalActualExpense;
    this.project.months[i].totalPlannedExpense = totalPlannedExpense;


  }

  // manage the scrolling of the months
  scrollRight() {
    if (this.lcol < this.project.months.length) {
      this.lcol++;
      this.fcol++;
    } else {
      this.errors.showUserMessage(ToastrType.info, 'Sorry', 'At the end', false, 2000);
    }

  }

  pageRight() {
    if (this.lcol + this.pageSize < this.project.months.length) {
      this.lcol += this.pageSize;
      this.fcol += this.pageSize;
    } else if (this.lcol < this.project.months.length) {
      this.lcol = this.project.months.length;
      this.fcol = this.lcol - this.pageSize;
    } else {
      this.errors.showUserMessage(ToastrType.info, 'Sorry', 'At the end', false, 2000);
    }
      
  }

  scrollLeft() {
    if (this.fcol > 1) {
      this.lcol--;
      this.fcol--;
    } else {
      this.errors.showUserMessage(ToastrType.info, 'Sorry', 'At the end', false, 2000);
    }
  }

  pageLeft() {
    if (this.fcol - this.pageSize > 0){
      this.lcol -= this.pageSize;
      this.fcol -= this.pageSize;
    } else if (this.fcol > 0) {
      this.lcol = this.pageSize;
      this.fcol = 0;
    } else {
      this.errors.showUserMessage(ToastrType.info, 'Sorry', 'At the end', false, 2000);
    }

  }

  calcPageSize(windowSize) {
    // the size of the left columns including name etc.

    const staticColWidth = 900;
    const staticMonthWidth = 75;
    this.pageSize = Math.floor((windowSize - staticColWidth) / staticMonthWidth);

    if ( this.lcol + this.pageSize ) {
      this.lcol = this.fcol + this.pageSize;
    } else {
      this.lcol = this.project.months.length;
      this.fcol = this.lcol - this.pageSize;
    }

    if (this.pageSize >= this.project.months.length) {
      this.showPaginator = false;
    } else {
      this.showPaginator = true;
    }




  }

}
