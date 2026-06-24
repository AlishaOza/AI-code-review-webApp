import { Component } from '@angular/core';
import { CodeReview } from '../../core/services/code-review';
import { EditorService } from '../../core/services/editor-service';
import { LanguageService } from '../../core/services/language-service';
import { RateLimiterService } from '../../core/services/rate-limiter';
import { ReviewHistory } from '../../core/services/review-history';
import { LlmInvoke } from '../../core/services/llm-invoke';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-prompt-input',
  imports: [FormsModule],
  templateUrl: './prompt-input.html',
  styleUrl: './prompt-input.css',
})
export class PromptInput {
  userPrompt:string=''
  constructor(
    public codeReview:CodeReview,
     private editorService: EditorService,
  private languageService: LanguageService,
  private rateLimiter: RateLimiterService,
  private reviewHistory:ReviewHistory,
  private llmInvoke:LlmInvoke
  
  ){}
sendCode() {

  // Rate limit check
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

  this.codeReview.isLoading.set(true);

  this.llmInvoke
    .reviewCode(
      language,
      code,
      this.userPrompt
    )
    .subscribe({

      next: (response: any) => {

        // Show review
        this.codeReview.review.set(
          response.review
        );

        // Save history
        this.reviewHistory.addReview({
          language,
          code,
          review: response.review,
          timestamp: new Date()
        });

        this.codeReview.isLoading.set(false);

      },

      error: (err) => {

        console.error(err);

        this.codeReview.isLoading.set(false);

      }

    });

}
// sendCode() {

//   this.codeReview.review.set({
//     issues: [
//       {
//         severity: 'major',
//         title: 'Test Issue',
//         line: '1',
//         category: 'Testing',
//         problem: 'Testing UI',
//         fix: 'const x = 10;'
//       }
//     ],
//     summary: {
//       total: 1,
//       counts: {
//         critical: 0,
//         major: 1,
//         minor: 0,
//         suggest: 0
//       },
//       themes: 'Testing',
//       nextStep: 'Fix it'
//     }
//   });

//   return; // stop here temporarily

// }
}
