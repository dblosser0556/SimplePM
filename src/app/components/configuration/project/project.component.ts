import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project, ProjectList } from '../../../models';
import { Observable } from 'rxjs/Observable';
import { ErrorMsgService } from '../../../services';

import '../../../rxjs-extensions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: ProjectList[];
  // projectList: ProjectList[];

  selectedProject: Project;
  error: any;
  isLoading = false;

  constructor(private projectService: ProjectService,
     private errorMsg: ErrorMsgService) {
  }

  ngOnInit() {
    this.getList();
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
