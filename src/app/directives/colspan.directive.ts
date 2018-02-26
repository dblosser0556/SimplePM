import { Directive, ElementRef, Renderer, OnInit, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appColspan]'
})
export class ColspanDirective implements OnInit{
  _colSpanCount: string;

  @Input('appColspan') colSpanCount: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this._colSpanCount !== this.colSpanCount) {
      this.renderer.setElementAttribute(this.el.nativeElement,'colspan', this.colSpanCount);
      this._colSpanCount = this.colSpanCount;
    }
    
  } 
  constructor(private el: ElementRef, private renderer: Renderer) {}


    ngOnInit() {
      this.renderer.setElementAttribute(this.el.nativeElement,'colspan', this.colSpanCount);
      this._colSpanCount = this.colSpanCount;
    }    


   
}
