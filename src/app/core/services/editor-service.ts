import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  code=signal('')
  setCode(value:string){
    this.code.set(value)
  }
}
