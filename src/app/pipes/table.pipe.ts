import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'table'
})
export class TablePipe implements PipeTransform {

  transform(name: string, gender: string) {
    if(gender == 'male'){
      return "Mr " + name;
    }
    else{
      return "Miss " + name;
    }
  }

}
