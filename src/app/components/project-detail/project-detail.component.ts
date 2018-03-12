
import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { ProjectService } from '../configuration/project/project.service';
import { Project, Status, Group, Role, LoggedInUser } from './../../models';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ErrorMsgService } from './../../services';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

interface CreateProject {
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
  @Input()  groupList: Group[];
  @Input() pmList: LoggedInUser[];

  @Output() projectChange = new EventEmitter<Project>();




  projectForm: FormGroup;
  error: any;
  colorTheme = 'theme-blue';
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private projectService: ProjectService,
    private fb: FormBuilder,
    private errMsg: ErrorMsgService) {

      this.createForm();
     }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme,
                                        dateInputFormat: 'YYYY-MM-DD',
                                        dateOutputFormat: 'YYYY-MM-DD'});
  }

  ngOnChanges() {
    this.projectForm.reset( {
      projectID: this.project.projectId,
      projectName: this.project.projectName,
      projectDesc: this.project.projectDesc,
      projectManager: this.project.projectManager,
      plannedStartDate: this.project.plannedStartDate,
      actualStartDate: this.project.actualStartDate,
      groupId: this.project.groupId,
      statusId: this.project.statusId} );
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
            projectDesc: project.projectDesc,
            projectManager: project.projectManager,
            plannedStartDate: project.plannedStartDate,
            actualStartDate: project.actualStartDate,
            groupId: project.groupId,
            statusId: project.statusId};

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
    this.project.projectName = formValue.projectName;
    this.project.projectDesc = formValue.projectDesc;
    this.project.projectManager = formValue.projectManager;

    // the date picker return an instance of date so convert it back to string.
    this.project.plannedStartDate = (formValue.plannedStartDate instanceof Date) ?
      formValue.plannedStartDate.toString('YYYY-MM-DD') : formValue.plannedStartDate;
    this.project.actualStartDate = (formValue.actualStartDate instanceof Date) ?
      formValue.actualStartDate.toString('YYYY-MM-DD') : formValue.actualStartDate;
    
    
      this.project.groupId = formValue.groupId;
    this.project.statusId = formValue.statusId;
    return this.project;

  }

  createForm() {
    this.projectForm = this.fb.group({
      projectID: '',
      projectName: ['', Validators.required],
      projectDesc: '',
      projectManager: '',
      plannedStartDate: '',
      actualStartDate: '',
      groupId: '',
      statusId: ''
    }
    );
  }


  revert() {this.ngOnChanges(); }

  cancel() { this.projectChange.emit(this.project); }



}
