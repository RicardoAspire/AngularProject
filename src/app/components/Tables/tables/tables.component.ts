import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { table } from 'src/app/models/tables';
import { TablesService } from 'src/app/services/tables/tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  //Declarations and variables
  tables: Array<table> = [];
  tablesForm!: FormGroup;
  deleteTableForm!: FormGroup;

  //Services needed
  constructor(
    private readonly tablesService: TablesService,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  //Function that returns all the tables and creates the two form groups needed, tablesForm and deleteTableForm
  ngOnInit(): void {
    this.tablesService.getTables()
    .subscribe(
      (success)=>{
        this.tables = success;
        console.log(this.tables);
      },(error)=>{
        console.log(error)
      }
    );
    this.tablesForm = this.fb.group({
      'table_name': new FormControl('',Validators.required),
    });
    this.deleteTableForm = this.fb.group({
      'tableId': new FormControl('',Validators.required),
    });
  }

  //Function that creates a table
  addTable(form:any){
    const newTable ={
      name : form.value.table_name,
      status : 0,
      total: 0
    }
    this.tablesService.createTable(newTable)
    .subscribe(
      (success)=>{
        this._snackBar.open('Table added',undefined, {
          duration: 2000
        })
        this.ngOnInit();
      },(error)=>{
        console.log(error);
      }
    ) 
  }

  //Function that deletes a table
  deleteTable(tableId:number){
    this.tablesService.deleteTable(tableId)
    .subscribe(
      (success)=>{
        this._snackBar.open('Table deleted',undefined, {
          duration: 2000
        })
        this.ngOnInit();
      },(error)=>{
        console.log(error)
      }
    )
  }
}
