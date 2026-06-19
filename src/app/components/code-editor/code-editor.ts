import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import loader from '@monaco-editor/loader';
import { EditorService } from '../../core/services/editor-service';
import { LanguageService } from '../../core/services/language-service';
import { effect } from '@angular/core';
import { CodeReview } from '../../core/services/code-review';
@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.css',
})
export class CodeEditor implements AfterViewInit {
  private editor: any;
  constructor(
    private editorService: EditorService,
    private selectLanguage: LanguageService,
    private codeReview: CodeReview,
  ) {
    effect(() => {
      const language = this.selectLanguage.selectedLanguage();

      if (this.editor) {
        loader.init().then((monaco) => {
          monaco.editor.setModelLanguage(this.editor.getModel(), language);
        });
      }
    });
  }

  ngAfterViewInit(): void {
    loader.init().then((monaco) => {
      // Custom theme matching your website
      monaco.editor.defineTheme('custom-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#020617',
          'editorGutter.background': '#020617',
          'editorLineNumber.foreground': '#64748b',
          'editorCursor.foreground': '#38bdf8',
          'editor.selectionBackground': '#1e293b',
          'editor.lineHighlightBackground': '#0f172a',
          'editor.border': '#020617',
        },
      });

      this.editor = monaco.editor.create(document.getElementById('monaco-editor')!, {
        value: `// Paste your code here for review...

function hello() {
  console.log("Hello World");
}

hello();`,
        language: this.selectLanguage,
        theme: 'custom-dark',
        automaticLayout: true,

        minimap: {
          enabled: false,
        },

        fontSize: 14,
        lineHeight: 22,

        scrollBeyondLastLine: false,

        roundedSelection: false,

        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      });

      // Set initial value in service
      this.editorService.setCode(this.editor.getValue());

      // Update signal whenever code changes
      this.editor.onDidChangeModelContent(() => {
        this.editorService.setCode(this.editor.getValue());
      });
    });
  }
 
}
