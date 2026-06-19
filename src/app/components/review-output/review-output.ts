import { Component } from '@angular/core';
import { CodeReview } from '../../core/services/code-review';
import { MarkdownPipe } from '../../shared/pipes/markdown-pipe';

@Component({
  selector: 'app-review-output',
  imports: [MarkdownPipe],
  templateUrl: './review-output.html',
  styleUrl: './review-output.css',
})
export class ReviewOutput {
constructor(
  public codeReview:CodeReview
){}

}
