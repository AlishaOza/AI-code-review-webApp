import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LlmInvoke {

  constructor(
    private http: HttpClient
  ) {}

  reviewCode(
    language: string,
    code: string,
    userPrompt: string
  ) {

    return this.http.post(
  'https://cooperative-happiness-production-98ad.up.railway.app/chat',
      {
        language,
        code,
        userPrompt
      }
    );

  }

}