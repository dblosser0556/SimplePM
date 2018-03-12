import { Component, OnInit, Input } from '@angular/core';
import { ProjectList } from '../../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
 
  @Input() project: ProjectList;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  showDetails(id: number) {
    this.router.navigate(['/dashboard/project'], { queryParams: { projectId: id } });
  }
}
