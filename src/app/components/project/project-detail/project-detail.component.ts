
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../../services';
import { Project, Status, Group, Role, LoggedInUser, BudgetType, Budget } from '../../../models';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ErrorMsgService } from '../../../services';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BudgetComponent } from '../../budget/budget.component';
import { BudgetDetailComponent } from '../../budget/budget-detail/budget-detail.component';

import * as moment from 'moment';

interface CreateProject {
  isTemplate: boolean;
  projectName: string;
  projectDesc: string;
  projectManager: string;
  plannedStartDate: string;
  actualStartDate: string;
  groupId: number;
  statusId: number;
}

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnChanges {

  @Input() project: Project;
  @Input() statusList: Status[];
  @Input() groupList: Group[];
  @Input() pmList: LoggedInUser[];
  @Input() createTemplate: boolean;

  @Output() projectChange = new EventEmitter<Project>();

  capBudget: number;
  expBudget: number;



  projectForm: FormGroup;
  error: any;
  colorTheme = 'theme-blue';
  bsConfig: Partial<BsDatepickerConfig>;
  public modalRef: BsModalRef;

  constructor(private projectService: ProjectService,
    private fb: FormBuilder,
    private errMsg: ErrorMsgService,
    private modalService: BsModalService) {

    this.createForm();
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      containerClass: this.colorTheme,
      dateInputFormat: 'YYYY-MM-DD',
      dateOutputFormat: 'YYYY-MM-DD'
    });
  }

  ngOnChanges() {
    this.expBudget = 0;
    this.capBudget = 0;
    if (this.project.budgets !== undefined) {
      for (const budget of this.project.budgets) {
        if (budget.budgetType === BudgetType.Capital) {
          this.capBudget += budget.amount;
        } else {
          this.expBudget += budget.amount;
        }
      }
    }
    this.projectForm.reset({
      projectID: this.project.projectId,

      // always set the value to the passed in value.
      isTemplate: this.createTemplate,

      projectName: this.project.projectName,
      projectDesc: this.project.projectDesc,
      projectManager: this.project.projectManager,
      plannedStartDate: this.project.plannedStartDate,
      actualStartDate: this.project.actualStartDate,
      groupId: this.project.groupId,
      statusId: this.project.statusId,
      expBudget: this.expBudget,
      capBudget: this.capBudget
    });

  }

  onSubmit() {
    this.projectForm.updateValueAndValidity();
    if (this.projectForm.invalid) {
      return;
    }

    const project: Project = this.getProjectFromFormValue(this.projectForm.value);
    if (project.projectId !== null) {
      this.projectService.update(project.projectId, project).subscribe(data => {

        this.projectChange.emit(project);
      },
        error => this.errMsg.changeMessage(error));
    } else {
      const newProject: CreateProject = {
        projectName: project.projectName,
        isTemplate: project.isTemplate,
        projectDesc: project.projectDesc,
        projectManager: project.projectManager,
        plannedStartDate: project.plannedStartDate,
        actualStartDate: project.actualStartDate,
        groupId: project.groupId,
        statusId: project.statusId
      };

      this.projectService.create(JSON.stringify(newProject)).subscribe(data => {
        // this.resetForm();
        this.project = data;

        this.projectChange.emit(project);
      },
        error => this.errMsg.changeMessage(error));
    }
  }


  getProjectFromFormValue(formValue: any): Project {

    this.project.projectId = formValue.projectID;
    this.project.isTemplate = formValue.isTemplate;
    this.project.projectName = formValue.projectName;
    this.project.projectDesc = formValue.projectDesc;
    this.project.projectManager = formValue.projectManager;

    // the date picker return an instance of date so convert it back to string.
    if (formValue.plannedStartDate instanceof Date) {
      const plannedStartDate = moment(formValue.plannedStartDate);
      this.project.plannedStartDate = plannedStartDate.format('YYYY-MM-DD');
    } else {
      this.project.plannedStartDate = formValue.plannedStartDate;
    }

    if (formValue.actualStartDate instanceof Date) {
      const actualStartDate = moment(formValue.actualStartDate);
      this.project.actualStartDate = actualStartDate.format('YYYY-MM-DD');
    } else {
      this.project.actualStartDate = formValue.actualStartDate;
    }


    this.project.groupId = formValue.groupId;
    this.project.statusId = formValue.statusId;
    return this.project;

  }

  createForm() {
    this.projectForm = this.fb.group({
      projectID: '',
      projectName: ['', Validators.required],
      isTemplate: this.createTemplate,
      projectDesc: '',
      projectManager: '',
      plannedStartDate: '',
      actualStartDate: '',
      groupId: '',
      statusId: '',
      capBudget: [{ value: 0, disabled: true }],
      expBudget: [{ value: 0, disabled: true }]
    }
    );
  }


  revert() { this.ngOnChanges(); }

  cancel() { this.projectChange.emit(this.project); }

  showBudget(isCapital: boolean) {
    let _budgets = new Array<Budget>();
    if (this.project.budgets !== undefined) {
      _budgets = this.project.budgets.filter(b => b.budgetType === ((isCapital) ? BudgetType.Capital : BudgetType.Expense));
    }

    const initialState = {
      budgets: _budgets,
      groupId: 0,
      projectId: this.project.projectId,
      title: this.project.projectName
    };

    this.modalRef = this.modalService.show(BudgetComponent, { initialState });
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    });
  }

  addBudget(isCapital: boolean) {
    const _budget = new Budget();
    _budget.budgetId = null;
    _budget.projectId = this.project.projectId;
    _budget.groupId = null;
    _budget.budgetType = (isCapital) ? BudgetType.Capital : BudgetType.Expense;
    const initialState = {
      budget: _budget
    };
    this.modalRef = this.modalService.show(BudgetDetailComponent, { initialState });
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    });
  }
}
