import { Pipe, PipeTransform } from '@angular/core';
import { Tareas } from 'src/models/tareas.model';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(tareas: Tareas[], buscarString: any): Tareas[] {
    let tareasFiltradas: Tareas[] = []
    if(buscarString === undefined){
      tareasFiltradas = tareas
    }else{
      let tareasfil: Tareas[]  = buscarString.arrayCompleto;
      let strigBusqueda: string = buscarString.stringBusqueda
      tareasfil.forEach(element => {
        if(element.title !== null && element.title !== undefined && element.title !== ''){
          if(element.title.includes(strigBusqueda)){
            tareasFiltradas.push(element);
          }
        }
      });
    }
    return tareasFiltradas;
  }

}
