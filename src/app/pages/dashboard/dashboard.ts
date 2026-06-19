import { Component } from '@angular/core';
import { LanguageSelector } from '../../components/language-selector/language-selector';
import { CodeEditor } from '../../components/code-editor/code-editor';
import { Header } from '../../components/header/header';
import { ReviewOutput } from '../../components/review-output/review-output';
import { PromptInput } from '../../components/prompt-input/prompt-input';
import { HistoryPanel } from '../../components/history-panel/history-panel';
import { EditorService } from '../../core/services/editor-service';

@Component({
  selector: 'app-dashboard',
  imports: [LanguageSelector,CodeEditor,Header,ReviewOutput,PromptInput,HistoryPanel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(
    public _edtiorService:EditorService
  ){}
 
}
