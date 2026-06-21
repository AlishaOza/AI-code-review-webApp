import { Component, effect } from '@angular/core';
import { LanguageSelector } from '../../components/language-selector/language-selector';
import { CodeEditor } from '../../components/code-editor/code-editor';
import { Header } from '../../components/header/header';
import { ReviewOutput } from '../../components/review-output/review-output';
import { PromptInput } from '../../components/prompt-input/prompt-input';
import { HistoryPanel } from '../../components/history-panel/history-panel';
import { EditorService } from '../../core/services/editor-service';
import { ReviewHistory } from '../../core/services/review-history';
import { LanguageService } from '../../core/services/language-service';
import { CodeReview } from '../../core/services/code-review';
@Component({
  selector: 'app-dashboard',
  imports: [LanguageSelector,CodeEditor,Header,ReviewOutput,PromptInput,HistoryPanel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(
    public _edtiorService:EditorService,
    private reviewHistory: ReviewHistory,
  private languageService: LanguageService,
  private codeReview: CodeReview
  ){
     effect(() => {

    const selected =
      this.reviewHistory.selectedReview();

    if (!selected) return;

    this._edtiorService.setCode(
      selected.code
    );

    this.languageService.setLanguage(
      selected.language
    );

    this.codeReview.review.set(
      selected.review
    );

  });
  }
 
}
