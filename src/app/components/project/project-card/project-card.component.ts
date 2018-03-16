import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ProjectList, Project } from '../../../models';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit, AfterViewInit {

  @Input() projectSummary: ProjectList;
  @Input() allowEdit: boolean;

  project: Project;
  view = 'summary';

  constructor(private router: Router,
    private projectService: ProjectService) {
      this.showView = 'summary';
     }


  ngOnInit() {

    this.projectService.getOne(this.projectSummary.projectId).subscribe(
      res => {
        this.project = res;
      }
    );
  }
  
  ngAfterViewInit() {
    this.showView = 'summary';
  }
  editDetails(id: number) {
    this.router.navigate(['/dashboard/myprojects/project'], { queryParams: { projectId: id } });
  }

  get showView() {
    return this.view;
  }

  set showView(value: string) {
    this.view = value;
  }
}
