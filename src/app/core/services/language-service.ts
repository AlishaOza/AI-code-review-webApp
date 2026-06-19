import { Injectable,signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  selectedLanguage = signal('javascript');
  setLanguage(value:string){
  this.selectedLanguage.set(value)
  }
  
}


