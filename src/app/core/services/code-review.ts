import { Injectable, signal } from '@angular/core';
import { ReviewHistory } from './review-history';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CodeReview {
  isLoading = signal(false);
  review = signal<any>(null);

  constructor(
    public reviewHistory: ReviewHistory,
    private http: HttpClient
  ) {}

  reviewCode(language: string, code: string, userPrompt: string = ''): void {
    this.isLoading.set(true);
    this.review.set(null);

    this.http.post<{ review: any }>('http://localhost:3001/chat', {
      language,
      code,
      userPrompt
    }).subscribe({
      next: (response) => {
        this.review.set(response.review);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Review error:', err);
        this.isLoading.set(false);
      }
    });
  }
}