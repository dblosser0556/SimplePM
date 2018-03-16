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
  parentId: number;
  level: number;
  levelDesc: string;
}



@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit, OnChanges {

 
  @Input() item: Group;
  @Input() pmList: LoggedInUser[];
  @Input() groupOptions: Group[];
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
    if (this.item.level === undefined) {
      this.item.level = 0;
    }
    this.itemForm.reset( {
      itemId: this.item.groupId,
      itemName: this.item.groupName,
      itemDesc: this.item.groupDesc,
      itemManager: this.item.groupManager,
      parentId: this.item.parentId,
      levelDesc: this.item.levelDesc,
      level: this.item.level} );
  }

  onSubmit() {
    this.itemForm.updateValueAndValidity();
    if (this.itemForm.invalid) {
      return;
    }

    const item: Group = this.getGroupFromFormValue(this.itemForm.value);
    if (item.groupId !== null && item.groupId !== undefined) {
      this.itemService.update(item.groupId, item).subscribe(data => {
        // this.snackBar.open('Project Cost Type has been updated', '', {duration: 2000});
        this.itemChange.emit(item);
      },
      error => this.errors.changeMessage(error));
    } else {
      const newGroup: CreateGroup = {
            groupName: item.groupName,
            groupDesc: item.groupDesc,
            groupManager: item.groupManager,
            level: item.level,
            parentId: item.parentId,
            levelDesc: item.levelDesc};

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
    item.parentId = formValue.parentId;
    item.levelDesc = formValue.levelDesc;
    item.groupManager = formValue.itemManager;
    item.level = formValue.level;
    return item;

  }

  createForm() {
    this.itemForm = this.fb.group({
      itemId: '',
      parentId: '',
      level: [{value: 0, disabled: true}],
      levelDesc: '',
      itemName: ['', Validators.required],
      itemDesc: '',
      itemManager: ''
    }
    );
  }


  revert() {this.ngOnChanges(); }

  cancel() { this.itemChange.emit(this.item); }

  onChange(groupId: number) {
    this.groupOptions.forEach(g => {
      if (g.groupId = groupId) {
        this.itemForm.patchValue({'level': g.level + 1 } );
      }
    });
  }

}
