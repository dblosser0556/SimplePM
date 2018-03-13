import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { GroupService } from './../group.service';
import { Group, LoggedInUser } from '../../../../models';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ErrorMsgService } from '../../../../services';

interface CreateGroup {
  groupName: string;
  groupDesc: string;
  groupManager: string;
}



@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit, OnChanges {

 
  @Input() item: Group;
  @Input() pmList: LoggedInUser[];
  @Output() itemChange = new EventEmitter<Group>();

  itemForm: FormGroup;
  error: any;

  constructor(private itemService: GroupService,
    private fb: FormBuilder,
    private errors: ErrorMsgService) {
      this.createForm();
     }

  ngOnInit() {}

  ngOnChanges() {
    this.itemForm.reset( {
      itemId: this.item.groupId,
      itemName: this.item.groupName,
      itemDesc: this.item.groupDesc,
      itemManager: this.item.groupManager} );
  }

  onSubmit() {
    this.itemForm.updateValueAndValidity();
    if (this.itemForm.invalid) {
      return;
    }

    const item: Group = this.getGroupFromFormValue(this.itemForm.value);
    if (item.groupId !== null) {
      this.itemService.update(item.groupId, item).subscribe(data => {
        // this.snackBar.open('Project Cost Type has been updated', '', {duration: 2000});
        this.itemChange.emit(item);
      },
      error => this.errors.changeMessage(error));
    } else {
      const newGroup: CreateGroup = {
            groupName: item.groupName,
            groupDesc: item.groupDesc,
            groupManager: item.groupManager};

      this.itemService.create(JSON.stringify(newGroup)).subscribe(data => {
        // this.resetForm();
        this.item = data;
        // this.snackBar.open('Project Cost Type has been Added', '', { duration: 2000 });
        this.itemChange.emit(item);
      },
      error => this.errors.changeMessage(error));
    }
  }


  getGroupFromFormValue(formValue: any): Group {
    let item: Group;
    item = new Group();

    item.groupId = formValue.itemId;
    item.groupName = formValue.itemName;
    item.groupDesc = formValue.itemDesc;
    return item;

  }

  createForm() {
    this.itemForm = this.fb.group({
      itemId: '',
      itemName: ['', Validators.required],
      itemDesc: '',
      itemManager: ''
    }
    );
  }


  revert() {this.ngOnChanges(); }

  cancel() { this.itemChange.emit(this.item); }


}
