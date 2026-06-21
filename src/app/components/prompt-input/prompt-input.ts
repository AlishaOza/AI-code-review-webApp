import { Component } from '@angular/core';
import { CodeReview } from '../../core/services/code-review';
import { EditorService } from '../../core/services/editor-service';
import { LanguageService } from '../../core/services/language-service';
import { RateLimiterService } from '../../core/services/rate-limiter';
@Component({
  selector: 'app-prompt-input',
  imports: [],
  templateUrl: './prompt-input.html',
  styleUrl: './prompt-input.css',
})
export class PromptInput {
  constructor(
    public codeReview:CodeReview,
     private editorService: EditorService,
  private languageService: LanguageService,
  private rateLimiter: RateLimiterService,
  
  ){}
sendCode() {

  if (!this.rateLimiter.canRequest()) {

    alert(
      'Rate limit exceeded. Try again later.'
    );

    return;

  }

  this.rateLimiter.addRequest();

  const code =
    this.editorService.code();

  const language =
    this.languageService.selectedLanguage();

  this.codeReview.review.set('');

  this.codeReview
    .reviewCode(language, code)
    .subscribe({

      next: (chunk) => {

        this.codeReview.review.update(
          current => current + chunk
        );

      },

      complete: () => {

        this.codeReview.reviewHistory.addReview({
          id: Date.now(),
          language,
          code,
          review: this.codeReview.review(),
          timestamp: new Date()
        });

      }

    });

}


}
