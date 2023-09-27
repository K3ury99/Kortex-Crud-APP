import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/empleado.service';
import { CoreService } from '../core/core.service';



@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Primaria',
    'Secundaria',
    'Bachiller',
    'Universitario',
    'Post-Universitario',
  ];


  constructor(
    private _fb: FormBuilder,
    private _empServices: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
    ){
    this.empForm = this._fb.group({
      Nombre: '',
      Apellido:'',
      Correo:'',
      FDN:'',
      Genero:'',
      Educacion:'',
      Compania:'',
      Experiencia:'',
      Paquete:'',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empServices.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => { 
            this._coreService.openSnackBar('Empleado Actualizado!')
            this._dialogRef.close(true);
            
          },
          error: (err: any) => {
            console.error(err); 
          }
        })
      }else{

        this._empServices.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Empleado Agregado Satisfactoriamente!')
            this._dialogRef.close(true);
            
          },
          error: (err: any) => {
            console.error(err); 
          }
        })
      }
    }
  }
}
