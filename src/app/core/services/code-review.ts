import { Injectable, signal } from '@angular/core';
import { EditorService } from '../../core/services/editor-service';
import { LanguageService } from '../../core/services/language-service';
import { interval, Observable } from 'rxjs';
import { ReviewHistory } from './review-history';
@Injectable({
  providedIn: 'root',
})
export class CodeReview {
  isLoading = signal(false);
  review = signal('');
  constructor(
    public reviewHistory: ReviewHistory
  ) {}
reviewCode(
  language: string,
  code: string
): Observable<string> {

  const chunks = [
    `# Code Review\n\n`,
    `Language: ${language}\n\n`,
    `## Issues Found\n\n`,
    `1. Avoid using var.\n`,
    `2. Use const instead.\n`,
    `3. Add error handling.\n`
  ];

  return new Observable<string>((observer) => {

    this.isLoading.set(true);

    let index = 0;

    const subscription = interval(800).subscribe(() => {

      if (index < chunks.length) {

        observer.next(
          chunks[index]
        );

        index++;

      } else {

        this.isLoading.set(false);

        observer.complete();

        subscription.unsubscribe();

      }

    });

  });

}
}
