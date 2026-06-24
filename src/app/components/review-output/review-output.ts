import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeReview } from '../../core/services/code-review';

@Component({
  selector: 'app-review-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-output.html',
  styleUrl: './review-output.css',
})
export class ReviewOutput {
  constructor(public codeReview: CodeReview) {}

  severityLabel(s: string): string {
    return { critical: '🔴 Critical', major: '🟠 Major', minor: '🟡 Minor', suggest: '🔵 Suggest' }[s] ?? s;
  }

  severityClass(s: string): string {
    return { critical: 'sev-critical', major: 'sev-major', minor: 'sev-minor', suggest: 'sev-suggest' }[s] ?? '';
  }
}