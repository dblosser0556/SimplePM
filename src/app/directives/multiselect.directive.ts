import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appMultiselect]'
})
export class MultiselectDirective {
  clearFlag = false;
  startCell = null;
  dragging = false;
  finalCell = null;
  cntrlPressed = false;
  multiCellIds = [];

  constructor(private el: ElementRef) {
  }

  @Output() selectedIds = new EventEmitter<string[]>();

  @HostListener('mousedown', ['$event.target', '$event.which']) onMouseDown(el, button) {

    this.dragging = true;
    if (!this.cntrlPressed) {
      this.clearCells();
    }
    const el1 = this.findTD(el);

    this.setStartCell(el1);
    this.setRangeArea(this.startCell, el1);

   }

  @HostListener('mouseup', ['$event.target']) onMouseUp(el) {
  
    this.dragging = false;
    this.finalCell = this.findTD(el);
    this.setSelectedCells(this.startCell, this.finalCell);
    this.selectedIds.emit(this.multiCellIds);
    this.startCell = null;
  }

  @HostListener('mouseenter', ['$event.target']) onMouseEnter(el) {
    if (!this.dragging) {
      return;
    } else {

      this.setRangeArea(this.startCell, el);
    }
  }

  @HostListener('mouseleave', ['$event.target']) onMouseLeave(el) {
    if (this.dragging) {
      this.dragging = false;
      this.startCell = null;
      this.clearCells();
    }
  }

  @HostListener('mouseover', ['$event.target']) onMouseOver(el) {


    if (!this.dragging) {
      return;
    } else {
      const el1 = this.findTD(el);
      if (el1.nodeName === 'TD') {
        this.setRangeArea(this.startCell, el1);
      }
    }
  }

  @HostListener('document:keydown', ['$event']) handleKeyDownEvent(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.cntrlPressed = true;
    }
  }

  @HostListener('document:keyup', ['$event']) handleKeyUpEvent(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.cntrlPressed = false;
    }
  }

  setStartCell(el) {
    this.startCell = el;
  }

  setRangeArea(start, el) {
    if (this.dragging) {
      if (el.classList.contains('ui-state-default')) {
        this.cellsBetween(this.startCell, el).forEach(element => {
          element.classList.add('hover-area');
         
        });
      } else if (el.classList.contains('hover-ara')) {
        this.cellsBetween(this.startCell, el).forEach(elem => {
          elem.classList.remove('hover-area');
        });
      }
    }
  }

  setSelectedCells(start, end) {
    if (start && end) {
      this.cellsBetween(start, end).forEach(el => {
        el.classList.add('eng-selected-item');
        el.classList.remove('hover-area');

        if (this.multiCellIds.indexOf(el.attributes['id'].nodeValue === -1)) {
          this.multiCellIds.push(el.attributes['id'].nodeValue);
        }
      });
    }
  }

  cellsBetween(start, end) {
    const coordsStart = this.getCoords(start);
    const coordsEnd = this.getCoords(end);
    const topLeft = {
      column: Math.min(coordsStart.column, coordsEnd.column),
      row: Math.min(coordsStart.row, coordsEnd.row)
    };

    const bottomRight = {
      column: Math.max(coordsStart.column, coordsEnd.column),
      row: Math.max(coordsStart.row, coordsEnd.row)
    };

    const tds = this.el.nativeElement.querySelectorAll('td');
    return Array.prototype.filter.call(tds, el => {
      const coords = this.getCoords(el);
      return coords.column >= topLeft.column && coords.column <= bottomRight.column &&
        coords.row >= topLeft.row && coords.row <= bottomRight.row;
    });

  }

  clearCells() {
    this.multiCellIds = [];
    Array.prototype.forEach.call(this.el.nativeElement.querySelectorAll('td'), td => {
      td.classList.remove('eng-selected-item');
      td.classList.remove('hover-area');
    });
  }

  getCoords(cell) {

    return {
      column: cell.cellIndex,
      row: cell.parentElement.rowIndex
    };
  }

  findTD(el) {
    if (el.nodeName === 'TD') {
      return el;
    } else if (el.parentElement.nodeName === 'TD') {
      return el.parentElement;
    } else if (el.parentElement.parentElement.nodeName === 'TD') {

      return el.parentElement.parentElement;
    } else if (el.parentElement.parentElement.parentElement.nodeName === 'TD') {

      return el.parentElement.parentElement.parentElement;
    } else {
      return el;
    }
  }
}
