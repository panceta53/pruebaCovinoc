import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CrearTarea } from 'src/models/crearTareaRequest';
import { Tareas } from 'src/models/tareas.model';
import { GestionTareaService } from 'src/services/gestion-tarea.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaCovinoc';
  tareas!: Tareas[];
  p: number = 1
  config = {
    id: 'parametros',
    itemsPerPage: 5,
    currentPage: 1
  }
  buscarString!: any;
  eliminarId: string = "";

  @ViewChild('creacionExitosa', { static: false }) creacionExitosa!: ModalDirective;
  @ViewChild('confirmarEliminar', { static: false }) confirmarEliminar!: ModalDirective;
  constructor(private tareaService: GestionTareaService, private fb: FormBuilder){
   
  }

  formCrearTarea = this.fb.group({
    descripcion: ['',{validators: [Validators.required]}],
    estado: ['']
  })

  formBuscar = this.fb.group({
    filtro: ['']
  })

  formActualizar = this.fb.group({
    estadoEditar: ['']
  })

  get descripcion() { return this.formCrearTarea.get('descripcion')}
  get estado() { return this.formCrearTarea.get('estado')}

  get filtro() { return this.formBuscar.get('filtro')}

  get estadoEditar(){ return this.formActualizar.get('estadoEditar')}

  ngOnInit(){
    this.consultarTareas();
  }

  consultarTareas(){
    this.tareaService.getTareas().subscribe(respuesta=>{
      this.tareas = respuesta
      console.log(this.tareas)
    },err=>{});
  }

  guardarTarea(){
    let id
    let index = this.tareas.length - 1
    index = parseInt(this.tareas[index].id) + 1
    id = index.toString();

    let crearTareas = new CrearTarea(
      id,
      new Date(),
      this.estado?.value,
      this.descripcion?.value
    )
    this.tareaService.crearTareas(crearTareas).subscribe(respuesta=>{
      this.consultarTareas();
      this.formCrearTarea.reset();
      this.creacionExitosa.show();
    },err=>{
      console.log(err)
    });
    
  }

  confirmarEliminarTarea(id: string){
    this.eliminarId = id;
    this.confirmarEliminar.show();
  }

  eliminarTarea(){
    this.tareaService.eliminarTarea(this.eliminarId).subscribe(respuesta=>{
      this.confirmarEliminar.hide();
      this.eliminarId = "";
      this.consultarTareas();
      if(this.filtro?.value != ''){
        window.location.reload();
      }
    },err=>{
      console.log(err)
    });
  }

  editarTarea(id: string, e: any){

    let estado = e.target.checked;
    let tarea: any = this.tareas.find(item => item.id == id)
    let descripcion = tarea.title;
    let tareaEditar = new CrearTarea(
      id,
      new Date(),
      estado,
      descripcion
    )
    this.tareaService.editarTarea(id, tareaEditar).subscribe(respuesta=>{
      this.consultarTareas();
    },err=>{
      console.log(err)
    });
  }

  buscar(){
    this.buscarString = {
      stringBusqueda: this.filtro?.value,
      arrayCompleto: this.tareas,
    }
  }
}
