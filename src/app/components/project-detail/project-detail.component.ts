
import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { ProjectService } from '../configuration/project/project.service';
import { Project, Status, Group, Role } from './../../models';
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
                                        dateInputFormat: 'YYYY-MM-DD'});
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
    const project = new Project();


    project.projectId = formValue.projectID;
    project.projectName = formValue.projectName;
    project.projectDesc = formValue.projectDesc;
    project.projectManager = formValue.projectManager;
    project.plannedStartDate = formValue.plannedStartDate;
    project.actualStartDate = formValue.actualStartDate;
    project.groupId = formValue.groupId;
    project.statusId = formValue.statusId;
    return project;

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
