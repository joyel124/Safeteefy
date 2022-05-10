import {AfterViewInit, Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Guardian} from "../../model/guardian";
import {GuardiansService} from "../../services/guardians.service";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as _ from "lodash";
@Component({
  selector: 'app-guardians',
  templateUrl: './guardians.component.html',
  styleUrls: ['./guardians.component.css']
})
export class GuardiansComponent implements OnInit {

  guardianData: Guardian;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'username', 'email', 'firstName', 'lastName', 'gender', 'address', 'actions']

  @ViewChild('studentForm', {static: false})
  guardianForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private guardiansService: GuardiansService) {
    this.guardianData = {} as Guardian;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getAllGuardians();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllGuardians() {
    this.guardiansService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }
  selectGuardian(element: Guardian){
    //console.log(element);
    this.guardiansService.SetCurrent.emit({
      data:element
    })
  }
  editItem(element: Guardian) {
    this.guardianData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.guardianForm.resetForm();
  }

  deleteItem(id: number) {
    this.guardiansService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Guardian) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addGuardian() {
    this.guardianData.id = 0;
    this.guardiansService.create(this.guardianData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateGuardian() {
    this.guardiansService.update(this.guardianData.id, this.guardianData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Guardian) => {
        if (o.id == response.id) {
          o = response;
        }
        return o;
      });
    });

  }
  onSubmit() {
    if (this.guardianForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateGuardian();
      } else {
        console.log('about to create');
        this.addGuardian();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }

}
