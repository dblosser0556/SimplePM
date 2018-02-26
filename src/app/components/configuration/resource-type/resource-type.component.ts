
import { Component, OnInit } from '@angular/core';
import { ResourceTypeService } from './resource-type.service';
import { ResourceType } from '../../../models';
import { Observable } from 'rxjs/Observable';
import { ErrorMsgService } from '../../../services';

import '../../../rxjs-extensions';


@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.scss']
})
export class ResourceTypeComponent implements OnInit {

   items: ResourceType[];
  selectedItem: ResourceType;
  error: any;
  isLoading = false;

  constructor(private itemService: ResourceTypeService,
    private errorMsg: ErrorMsgService) {
  }

  ngOnInit() {
    this.getList();
  }




  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?') === true) {
      this.itemService.delete(id)
        .subscribe(x => {
          // this.snackBar.open('Phase has been deleted', '', { duration: 2000 });
          this.getList();
        },
        error =>  this.errorMsg.changeMessage(error));
    }
  }

  getList() {
    this.isLoading = true;
    this.itemService.getAll()
      .subscribe(results => {
        this.items = results;
        this.isLoading = false;
      },
      error => this.errorMsg.changeMessage(error));
    this.selectedItem = undefined;
  }

  add() {
    this.selectedItem = new ResourceType();
  }

  edit(item: ResourceType) {
    this.selectedItem = item;
  }

  updateList(event: any) {
    this.getList();
  }
}

