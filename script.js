
let noteOptions = [];
let notes = [];
let noteDate = [];
let trashNoteOptions = [];
let trashNotes = [];
let trashNoteDate = [];
let archiveNotes = [];
let archiveNoteOptions = [];
let archiveNoteDate = [];


function renderNotes() {
    let contentRef = document.getElementById('content');
    let archiveRef = document.getElementById('archive_content');
    let trashContentRef = document.getElementById('trash_content');
    let noteDateRef = document.getElementById('date');
    contentRef.innerHTML = "";
    archiveRef.innerHTML = "";
    trashContentRef.innerHTML = "";
    getNotesFromLocalStorage();
}

function getNotesFromLocalStorage() {
    let contentRef = document.getElementById('content');
    if (localStorage.getItem("Notes") == null) {
        renderTrashNotes()
        renderArchiveNotes()
        return
    }

    else if (localStorage.getItem("NoteDate") == null){
        renderTrashNotes()
        renderArchiveNotes()
        return
    }
    else {
        noteOptions = JSON.parse(localStorage.getItem("Option"));
        notes = JSON.parse(localStorage.getItem("Notes"));
        noteDate = JSON.parse(localStorage.getItem("NoteDate"));
        for (let index = 0; index < noteOptions.length; index++) {
            contentRef.innerHTML += getNotesTemplate(index);
        }
        renderTrashNotes()
        renderArchiveNotes()
    }
}

function saveNotesToLocalStorage() {
    if (document.getElementById('note_option').value == "") {
        document.getElementById("warning_one").innerHTML = "Bitte eine Eingabe tätigen!";
        document.getElementById("warning_two").innerHTML = "";
        return
    }
    else if (document.getElementById('note_input').value == "") {
        document.getElementById("warning_two").innerHTML = "Bitte eine Eingabe tätigen!";
        document.getElementById("warning_one").innerHTML = "";
        return
    }
    else {
        let optionRef = document.getElementById('note_option').value;
        let notesRef = document.getElementById('note_input').value;
        let noteDateRef = document.getElementById('date').value;

        document.getElementById("warning_one").innerHTML = "";
        document.getElementById("warning_two").innerHTML = "";

        noteOptions.push(optionRef);
        notes.push(notesRef);
        noteDate.push(noteDateRef);

        localStorage.setItem("Option", JSON.stringify(noteOptions));
        localStorage.setItem("Notes", JSON.stringify(notes));
        localStorage.setItem("NoteDate", JSON.stringify(noteDate));
        document.getElementById('note_option').value = "";
        document.getElementById('note_input').value = "";
        getDate()
        renderNotes();
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    if (localStorage.getItem("TrashNotes") == null || localStorage.getItem("TrashNoteDate") == null) {
        return
    }    
    else {
        trashNoteOptions = JSON.parse(localStorage.getItem("TrashNoteOptions"));
        trashNotes = JSON.parse(localStorage.getItem("TrashNotes"));
        trashNoteDate = JSON.parse(localStorage.getItem("TrashNoteDate"));

        for (let index = 0; index < trashNotes.length; index++) {
            trashContentRef.innerHTML += getTrashNotesTemplate(index);
        }
    }
}

function transferToWaste(index) {

    trashNoteOptions.push(noteOptions[index]);
    noteOptions.splice(index, 1);
    localStorage.setItem("TrashNoteOptions", JSON.stringify(trashNoteOptions));

    trashNotes.push(notes[index]);
    notes.splice(index, 1);
    localStorage.setItem("TrashNotes", JSON.stringify(trashNotes));

    trashNoteDate.push(noteDate[index]);
    noteDate.splice(index, 1);
    localStorage.setItem("TrashNoteDate", JSON.stringify(trashNoteDate));

    localStorage.setItem("Option", JSON.stringify(noteOptions));
    localStorage.setItem("Notes", JSON.stringify(notes));
    localStorage.setItem("NoteDate", JSON.stringify(noteDate));

    renderNotes();
}

function transferToArchive(index) {

    archiveNotes.push(trashNotes[index]);
    trashNotes.splice(index, 1);
    localStorage.setItem("ArchiveNotes", JSON.stringify(archiveNotes));   

    archiveNoteOptions.push(trashNoteOptions[index]);
    trashNoteOptions.splice(index, 1);
    localStorage.setItem("ArchiveNoteOptions", JSON.stringify(archiveNoteOptions));

    archiveNoteDate.push(trashNoteDate[index]);
    trashNoteDate.splice(index, 1);
    localStorage.setItem("ArchiveNoteDate", JSON.stringify(archiveNoteDate));

    localStorage.setItem("TrashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("TrashNoteOptions", JSON.stringify(trashNoteOptions));
    localStorage.setItem("TrashNoteDate", JSON.stringify(trashNoteDate));

    renderNotes();
}

function renderArchiveNotes() {
    let archiveContentRef = document.getElementById('archive_content');
    if (localStorage.getItem("ArchiveNotes") == null || localStorage.getItem("ArchiveNoteDate") == null) {
        return
    } else {

        archiveContentRef.innerHTML = "";
        archiveNoteOptions = JSON.parse(localStorage.getItem("ArchiveNoteOptions"));
        archiveNotes = JSON.parse(localStorage.getItem("ArchiveNotes"));
        archiveNoteDate = JSON.parse(localStorage.getItem("ArchiveNoteDate"));
        for (let index = 0; index < archiveNotes.length; index++) {
            archiveContentRef.innerHTML += getArchiveNotesTemplate(index);
        }
    }
}

function transferBackToNotes(index) {
    if (document.getElementById('option1').value == 1) {
        noteOptions.push(trashNoteOptions[index]);
        notes.push(trashNotes[index]);
        noteDate.push(trashNoteDate[index]);
        
        trashNoteOptions.splice(index, 1);
        trashNotes.splice(index, 1);
        trashNoteDate.splice(index, 1);

        localStorage.setItem("TrashNoteOptions", JSON.stringify(trashNoteOptions));
        localStorage.setItem("TrashNotes", JSON.stringify(trashNotes));
        localStorage.setItem("TrashNoteDate", JSON.stringify(trashNoteDate));

        localStorage.setItem("Option", JSON.stringify(noteOptions));
        localStorage.setItem("Notes", JSON.stringify(notes));
        localStorage.setItem("NoteDate", JSON.stringify(noteDate));

    } else {
        noteOptions.push(archiveNoteOptions[index]);
        notes.push(archiveNotes[index]);
        noteDate.push(archiveNoteDate[index]);

        archiveNoteOptions.splice(index, 1);
        archiveNotes.splice(index, 1);
        archiveNoteDate.splice(index, 1);

        localStorage.setItem("ArchiveNoteOptions", JSON.stringify(archiveNoteOptions));
        localStorage.setItem("ArchiveNotes", JSON.stringify(archiveNotes));
        localStorage.setItem("ArchiveNoteDate", JSON.stringify(archiveNoteDate));

        localStorage.setItem("Option", JSON.stringify(noteOptions));
        localStorage.setItem("Notes", JSON.stringify(notes));
        localStorage.setItem("NoteDate", JSON.stringify(noteDate));
    }
    renderNotes()
}

function deleteNote(index) {
    trashNotes.splice(index, 1);
    trashNoteOptions.splice(index, 1);
    trashNoteDate.splice(index, 1);

    localStorage.setItem("TrashNoteOptions", JSON.stringify(trashNoteOptions));
    localStorage.setItem("TrashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("TrashNoteDate", JSON.stringify(trashNoteDate));

    renderNotes();
}
