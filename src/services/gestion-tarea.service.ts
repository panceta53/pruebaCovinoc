import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearTarea } from 'src/models/crearTareaRequest';
import { Tareas } from 'src/models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class GestionTareaService {

  constructor(private _http: HttpClient) { }

  getTareas(){
    return this._http.get<Tareas[]>(environment.URL_Obtener_tareas);
  }

  crearTareas(tarea: CrearTarea){
    return this._http.post(environment.URL_Crear_tarea, tarea);
  }

  eliminarTarea(id:string){
    return this._http.delete(`${environment.URL_Crear_tarea}/${id}`);
  }

  editarTarea(id:string, tarea: CrearTarea){
    return this._http.put(`${environment.URL_Actualizar_tarea}/${id}`,tarea);
  }
}
