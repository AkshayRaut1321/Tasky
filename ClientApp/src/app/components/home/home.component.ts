import { Component, OnInit, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Note } from '../../models/Note';
import { BaseNote } from '../../models/BaseNote';
import { CheckList } from '../../models/CheckList';
import { ListItem } from '../../models/ListItem';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes: BaseNote[];
  editMode = false;
  newChecklist: CheckList;
  newChecklistItemIdKey = 'newChecklistText';
  newChecklistBoxIdKey = 'newChecklistBox';
  checkBoxMode = false;

  @ViewChild('title') newTitle: ElementRef;
  @ViewChild('divNewNote') divNewNote: ElementRef;
  @ViewChild('text') newText: ElementRef;
  @ViewChild('divNewChecklist') divNewChecklist: ElementRef;
  @ViewChildren('checkBoxes') checkBoxes: QueryList<ElementRef<HTMLElement>>;

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.notes = [];
    this.resetChecklist();

    let textNote = new Note();
    textNote.id = 1;
    textNote.title = 'Diary';
    textNote.text = 'This is my second application and I am trying to make an useful checklist. Try adding one of your own.';

    this.notes.push(textNote);

    let checkItem1 = new ListItem();
    checkItem1.id = 1;
    checkItem1.text = 'Build Tasky app';
    checkItem1.checked = true;

    let newChecklistItem = new ListItem();
    newChecklistItem.id = 2;
    newChecklistItem.text = 'Deploy Task app';
    newChecklistItem.checked = false;

    let checkList = new CheckList();
    checkList.id = 2;
    checkList.title = 'Tasks for today';
    checkList.items = new Array();

    checkList.items.push(checkItem1);
    checkList.items.push(newChecklistItem);

    this.notes.push(checkList);

    this.notes.push(textNote);
    this.notes.push(checkList);
  }

  resetChecklist() {
    this.newChecklist = new CheckList();
    this.newChecklist.items = [];
  }

  hasText(text: string) {
    if (isNullOrUndefined(text))
      return false;
    let nonWhiteSpaceContent = text.replace(/(?:\r\n|\r|\n)/g, '');
    return (nonWhiteSpaceContent != "" && !isNullOrUndefined(nonWhiteSpaceContent));
  }

  getText() {

  }

  saveNote(title: string, text: string) {
    if (!isNullOrUndefined(text) && text != "") {
      let newNote = new Note();
      newNote.text = text;
      newNote.id = this.getMaxNoteId() + 1;
      newNote.title = title;
      this.notes.push(newNote);
    }
  }

  getMaxNoteId(): number {
    return this.notes.length == 0 ? 0 : Math.max.apply(Math, this.notes.map(function (o) { return o.id; }));
  }

  // openEditor() {
  //   this.editMode = true;
  //   const element = this.renderer.selectRootElement('#newText');
  //   setTimeout(() => element.focus, 0);
  // }

  // closeEditor(event: FocusEvent, title: HTMLInputElement, text: HTMLTextAreaElement) {
  //   let divEl = (this.divNewNote.nativeElement as HTMLElement);
  //   if (divEl.contains(event.relatedTarget as HTMLElement))
  //     return false;

  //   if (this.hasText(text.value)) {
  //     this.saveNote(title.value, text.value);
  //   }
  //   text.value = "";
  //   text.rows = 1;
  //   title.value = "";
  //   this.editMode = false;
  // }

  // textTyped(event: KeyboardEvent, text: HTMLTextAreaElement) {
  //   if (event.keyCode !== 13 && (event.keyCode <= 48 || event.keyCode >= 90) && (event.keyCode <= 97 && event.keyCode >= 122)) {
  //     console.log(event);
  //     return false;
  //   }
  //   if (event.keyCode === 13)
  //     text.rows++;
  //   else if (event.keyCode === 8) {
  //     let matchedLineBreak = RegExp(/\r\n|\r|\n/).exec(text.value[text.value.length - 1]);
  //     if (!isNullOrUndefined(matchedLineBreak)) {
  //       let totalNewLines = text.value.split(/\r\n|\r|\n/).length;
  //       text.rows = totalNewLines > 1 ? totalNewLines - 1 : 1;
  //     }
  //   }
  // }

  saveChecklist(title: string) {
    let checklist = Object.assign({}, this.newChecklist);
    checklist.title = title;
    this.notes.push(checklist);
  }

  hasChecklistItems() {
    return this.newChecklist.items.length > 0;
  }

  // openChecklist() {
  //   this.editMode = true;
  // }

  // checkListTyped(event: KeyboardEvent, text: HTMLInputElement) {
  //   if (event.keyCode !== 13 && (event.keyCode <= 48 || event.keyCode >= 90) && (event.keyCode <= 97 && event.keyCode >= 122)) {
  //     console.log(event);
  //     return false;
  //   }
  //   if (event.keyCode === 13) {
  //     if (this.hasText(text.value)) {
  //       this.saveChecklistItem(text.value);
  //       text.value = '';
  //     }
  //   }
  // }

  editExistingChecklist(event: KeyboardEvent, checklistItem: ListItem, checklistItemElement: HTMLInputElement) {
    if (event.keyCode !== 13 && (event.keyCode <= 48 || event.keyCode >= 90) && (event.keyCode <= 97 && event.keyCode >= 122)) {
      console.log(event);
      return false;
    }
    if (event.keyCode === 13 && !isNullOrUndefined(checklistItem)) {
      let existingChecklistItemIndex = this.newChecklist.items.indexOf(checklistItem);
      let newChecklistItem = new ListItem();
      newChecklistItem.id = Infinity;
      newChecklistItem.text = '';
      newChecklistItem.checked = false;
      this.newChecklist.items.splice(existingChecklistItemIndex + 1, 0, newChecklistItem);
      setTimeout(() => {
        var data = this.checkBoxes.toArray();
        var currentElementIndex = data.findIndex((a: ElementRef<HTMLElement>) => a.nativeElement.lastChild == checklistItemElement);
        var nextElement = data[currentElementIndex + 1].nativeElement.lastChild as HTMLElement;
        // const element = this.renderer.selectRootElement('#' + this.newChecklistItemIdKey + newChecklistItem.id) as HTMLElement;
        nextElement.focus();
      }, 1);
    }
  }

  // focusEl() {
  // }

  saveChecklistItem(checkBoxText: string) {
    let newChecklistItem = new ListItem();
    newChecklistItem.id = this.getMaxChecklistItemId(this.newChecklist) + 1;
    newChecklistItem.text = checkBoxText;
    newChecklistItem.checked = false;
    this.newChecklist.items.push(newChecklistItem);
  }

  getMaxChecklistItemId(checklist: CheckList): number {
    return checklist.items.length == 0 ? 0 : Math.max.apply(Math, checklist.items.map(function (o) { return o.id; }));
  }

  // closeChecklist(event: FocusEvent, title: HTMLInputElement, checklistText: HTMLInputElement) {
  //   let divEl = (this.divNewChecklist.nativeElement as HTMLElement);
  //   if (divEl.contains(event.relatedTarget as HTMLElement))
  //     return false;

  //   if (this.hasText(checklistText.value))
  //     this.saveChecklistItem(checklistText.value);
  //   if (this.hasChecklistItems()) {
  //     this.saveChecklist(title.value);
  //   }
  //   this.resetChecklist();
  //   checklistText.value = "";
  //   title.value = "";
  //   this.editMode = false;
  // }

  close(event: FocusEvent, title: HTMLInputElement) {
    if (this.editMode) {
      let divEl = (this.divNewNote.nativeElement as HTMLElement);
      if (divEl.contains(event.relatedTarget as HTMLElement))
        return false;
      let text = this.renderer.selectRootElement('#newText');
      if (text instanceof HTMLTextAreaElement) {
        var textArea = text as HTMLTextAreaElement;
        if (this.hasText(textArea.value)) {
          this.saveNote(title.value, textArea.value);
        }
        textArea.value = "";
        textArea.rows = 1;
      }
      else if (text instanceof HTMLInputElement) {
        var inputText = text as HTMLInputElement;
        if (this.hasText(inputText.value))
          this.saveChecklistItem(inputText.value);
        if (this.hasChecklistItems()) {
          this.saveChecklist(title.value);
        }
        this.resetChecklist();
        inputText.value = "";
      }
      title.value = "";
      this.editMode = false;
    }
  }

  typed(event: KeyboardEvent, text: HTMLElement) {
    if (event.keyCode !== 13 && (event.keyCode <= 48 || event.keyCode >= 90) && (event.keyCode <= 97 && event.keyCode >= 122)) {
      console.log(event);
      return false;
    }

    if (text instanceof HTMLTextAreaElement) {
      if (event.keyCode === 13)
        text.rows++;
      else if (event.keyCode === 8) {
        let matchedLineBreak = RegExp(/\r\n|\r|\n/).exec(text.value[text.value.length - 1]);
        if (!isNullOrUndefined(matchedLineBreak)) {
          let totalNewLines = text.value.split(/\r\n|\r|\n/).length;
          text.rows = totalNewLines > 1 ? totalNewLines - 1 : 1;
        }
      }
    }
    else if (text instanceof HTMLInputElement) {
      if (event.keyCode === 13) {
        if (this.hasText(text.value)) {
          this.saveChecklistItem(text.value);
          text.value = '';
        }
      }
    }
  }

  open() {
    this.editMode = true;
    setTimeout(() => {
      const element = this.renderer.selectRootElement('#newText');
      element.focus()
    }, 1);
  }

  changeEditorMode(checkBoxMode: boolean) {
    this.checkBoxMode = checkBoxMode;
    var elementId = '#newText';
    // if (this.checkBoxMode) {
    //   elementId = '#newChecklistText';
    // }
    // else {
    //   elementId = '#newText';
    // }
    setTimeout(() => {
      this.open(elementId);
    }, 0);
  }

  onClickedOutside(e: Event) {
    console.log(e);
  }
}