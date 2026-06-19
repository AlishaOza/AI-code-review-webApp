import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
@Pipe({
  name: 'markdown',
  standalone:true
})
export class MarkdownPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(value:string): SafeHtml {

     const html = marked.parse(value) as string;

    const cleanHtml =
      DOMPurify.sanitize(html);

    return this.sanitizer
      .bypassSecurityTrustHtml(cleanHtml);
  }
  }


