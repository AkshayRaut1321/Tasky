import { Component, OnInit, Renderer2 } from '@angular/core';
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

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.notes = new Array();

    let textNote = new Note();
    textNote.id = 1;
    textNote.title = 'Diary';
    textNote.text = 'This is my second application and I am trying to make an useful checklist. Try adding one of your own.';

    this.notes.push(textNote);

    let checkItem1 = new ListItem();
    checkItem1.id = 1;
    checkItem1.text = 'Build Tasky app';
    checkItem1.checked = true;

    let checkItem2 = new ListItem();
    checkItem2.id = 2;
    checkItem2.text = 'Deploy Task app';
    checkItem2.checked = false;

    let checkList = new CheckList();
    checkList.id = 2;
    checkList.title = 'Tasks for today';
    checkList.items = new Array();

    checkList.items.push(checkItem1);
    checkList.items.push(checkItem2);

    this.notes.push(checkList);

    this.notes.push(textNote);
    this.notes.push(checkList);
  }

  saveNote(title: string, text: string) {
    if (!isNullOrUndefined(text) && !(text == "")) {
      let newNote = new Note();
      newNote.text = text;
      newNote.id = 3;
      newNote.title = title;
      this.notes.push(newNote);
    }
  }

  openEditor() {
    this.editMode = true;
    const element = this.renderer.selectRootElement('#newText');
    setTimeout(() => element.focus, 0);
  }

  closeEditor(title: HTMLInputElement, text: HTMLTextAreaElement) {
    this.editMode = false;
    let nonWhiteSpaceContent = text.value.replace(/(?:\r\n|\r|\n)/g, '');
    if (nonWhiteSpaceContent !== "" && !isNullOrUndefined(nonWhiteSpaceContent)) {
      this.saveNote(title.value, text.value);
    }
    text.value = "";
    text.rows = 1;
    title.value = "";
  }

  textTyped(event: KeyboardEvent, text: HTMLTextAreaElement) {
    if (event.keyCode !== 13 && (event.keyCode <= 48 || event.keyCode >= 90) && (event.keyCode <= 97 && event.keyCode >= 122)) {
      console.log(event);
      return false;
    }
    if (event.keyCode === 13)
      text.rows++;
  }
}