import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services';
import { ProjectList } from '../../../models';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectList: ProjectList[] = [];
  queryParams: any;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //  get the query paramaters from the route
    this.getQueryParam();
    this.getProjects();
  }

  getQueryParam(): any {
    this.route.queryParams.subscribe(
      params => {
        this.queryParams = {...params.keys, ...params};
      }
    );
  }

  getProjects() {
    this.projectService.getList(this.queryParams).subscribe( res => {
      this.projectList = res;
    });

  }
}
