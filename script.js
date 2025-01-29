
// let noteOptions = [];
// let notes = [];
// let noteDate = [];
// let trashNoteOptions = [];
// let trashNotes = [];
// let trashNoteDate = [];
// let archiveNotes = [];
// let archiveNoteOptions = [];
// let archiveNoteDate = [];

let allNotes = {
    "noteOptions": [],
    "note": [],
    "noteDate": [],
    "trashNoteOptions": [],
    "trashNote": [],
    "trashNoteDate": [],
    "archiveNote": [],
    "archiveNoteOptions": [],
    "archiveNoteDate": []
}

function moveNotes(index, startKey, destinationKey) {
    allNotes[destinationKey].push(allNotes[startKey][index]);
    allNotes[startKey].splice(index, 1);
    localStorage.setItem(destinationKey, JSON.stringify(allNotes[destinationKey]));
    localStorage.setItem(startKey, JSON.stringify(allNotes[startKey]));

    allNotes[destinationKey + "Options"].push(allNotes[startKey + "Options"][index]);
    allNotes[startKey + "Options"].splice(index, 1);
    localStorage.setItem(destinationKey + "Options", JSON.stringify(allNotes[destinationKey + "Options"]));
    localStorage.setItem(startKey + "Options", JSON.stringify(allNotes[startKey + "Options"]));

    allNotes[destinationKey + "Date"].push(allNotes[startKey + "Date"][index]);
    allNotes[startKey + "Date"].splice(index, 1);
    localStorage.setItem(destinationKey + "Date", JSON.stringify(allNotes[destinationKey + "Date"]));
    localStorage.setItem(startKey + "Date", JSON.stringify(allNotes[startKey + "Date"]));

    renderNotes();
}


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
    if (localStorage.getItem("note") == null) {
        renderTrashNotes()
        renderArchiveNotes()
        return
    }

    else if (localStorage.getItem("noteDate") == null) {
        renderTrashNotes()
        renderArchiveNotes()
        return
    }
    else {
        allNotes.noteOptions = JSON.parse(localStorage.getItem("noteOptions"));
        allNotes.note = JSON.parse(localStorage.getItem("note"));
        allNotes.noteDate = JSON.parse(localStorage.getItem("noteDate"));
        for (let index = 0; index < allNotes.noteOptions.length; index++) {
            contentRef.innerHTML += getNotesTemplate(index);
        }
        renderTrashNotes()
        renderArchiveNotes()
    }
}

function saveNotesToLocalStorage() {
    if (document.getElementById("note_option").value == "") {
        document.getElementById("warning_one").innerHTML = "Bitte eine Eingabe tätigen!";
        document.getElementById("warning_two").innerHTML = "";
        return
    }
    else if (document.getElementById("note_input").value == "") {
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

        allNotes.noteOptions.push(optionRef);
        allNotes.note.push(notesRef);
        allNotes.noteDate.push(noteDateRef);

        localStorage.setItem("noteOptions", JSON.stringify(allNotes.noteOptions));
        localStorage.setItem("note", JSON.stringify(allNotes.note));
        localStorage.setItem("noteDate", JSON.stringify(allNotes.noteDate));
        document.getElementById('note_option').value = "";
        document.getElementById('note_input').value = "";
        getDate()
        renderNotes();
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    if (localStorage.getItem("trashNote") == null || localStorage.getItem("trashNoteDate") == null) {
        return
    }
    else {
        allNotes.trashNoteOptions = JSON.parse(localStorage.getItem("trashNoteOptions"));
        allNotes.trashNote = JSON.parse(localStorage.getItem("trashNote"));
        allNotes.trashNoteDate = JSON.parse(localStorage.getItem("trashNoteDate"));

        for (let index = 0; index < allNotes.trashNote.length; index++) {
            trashContentRef.innerHTML += getTrashNotesTemplate(index);
        }
    }
}

function transferToWaste(index) {

    allNotes.trashNoteOptions.push(allNotes.noteOptions[index]);
    allNotes.noteOptions.splice(index, 1);
    localStorage.setItem("trashNoteOptions", JSON.stringify(trashNoteOptions));

    trashNote.push(note[index]);
    note.splice(index, 1);
    localStorage.setItem("trashNote", JSON.stringify(trashNote));

    trashNoteDate.push(noteDate[index]);
    noteDate.splice(index, 1);
    localStorage.setItem("trashNoteDate", JSON.stringify(trashNoteDate));

    localStorage.setItem("noteOptions", JSON.stringify(noteOptions));
    localStorage.setItem("note", JSON.stringify(note));
    localStorage.setItem("noteDate", JSON.stringify(noteDate));

    renderNotes();
}

function transferToArchive(index) {

    archiveNote.push(trashNote[index]);
    trashNote.splice(index, 1);
    localStorage.setItem("archiveNote", JSON.stringify(archiveNote));

    archiveNoteOptions.push(trashNoteOptions[index]);
    trashNoteOptions.splice(index, 1);
    localStorage.setItem("archiveNoteOptions", JSON.stringify(archiveNoteOptions));

    archiveNoteDate.push(trashNoteDate[index]);
    trashNoteDate.splice(index, 1);
    localStorage.setItem("archiveNoteDate", JSON.stringify(archiveNoteDate));

    localStorage.setItem("trashNote", JSON.stringify(trashNote));
    localStorage.setItem("trashNoteOptions", JSON.stringify(trashNoteOptions));
    localStorage.setItem("trashNoteDate", JSON.stringify(trashNoteDate));

    renderNotes();
}

function renderArchiveNotes() {
    let archiveContentRef = document.getElementById('archive_content');
    if (localStorage.getItem("archiveNote") == null || localStorage.getItem("archiveNoteDate") == null) {
        return
    } else {

        archiveContentRef.innerHTML = "";
        allNotes.archiveNoteOptions = JSON.parse(localStorage.getItem("archiveNoteOptions"));
        allNotes.archiveNote = JSON.parse(localStorage.getItem("archiveNote"));
        allNotes.archiveNoteDate = JSON.parse(localStorage.getItem("archiveNoteDate"));
        for (let index = 0; index < allNotes.archiveNote.length; index++) {
            archiveContentRef.innerHTML += getArchiveNotesTemplate(index);
        }
    }
}

function transferBackToNotes(index) {
    if (document.getElementById('option1').value == 1) {
        noteOptions.push(trashNoteOptions[index]);
        note.push(trashNote[index]);
        noteDate.push(trashNoteDate[index]);

        trashNoteOptions.splice(index, 1);
        trashNote.splice(index, 1);
        trashNoteDate.splice(index, 1);

        localStorage.setItem("trashNoteOptions", JSON.stringify(trashNoteOptions));
        localStorage.setItem("trashNote", JSON.stringify(trashNote));
        localStorage.setItem("trashNoteDate", JSON.stringify(trashNoteDate));

        localStorage.setItem("noteOptions", JSON.stringify(noteOptions));
        localStorage.setItem("note", JSON.stringify(note));
        localStorage.setItem("noteDate", JSON.stringify(noteDate));

    } else {
        noteOptions.push(archiveNoteOptions[index]);
        note.push(archiveNotes[index]);
        noteDate.push(archiveNoteDate[index]);

        archiveNoteOptions.splice(index, 1);
        archiveNote.splice(index, 1);
        archiveNoteDate.splice(index, 1);

        localStorage.setItem("archiveNoteOptions", JSON.stringify(archiveNoteOptions));
        localStorage.setItem("archiveNote", JSON.stringify(archiveNote));
        localStorage.setItem("archiveNoteDate", JSON.stringify(archiveNoteDate));

        localStorage.setItem("noteOptions", JSON.stringify(noteOptions));
        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("noteDate", JSON.stringify(noteDate));
    }
    renderNotes()
}

function deleteNote(index) {
    allNotes.trashNote.splice(index, 1);
    allNotes.trashNoteOptions.splice(index, 1);
    allNotes.trashNoteDate.splice(index, 1);

    localStorage.setItem("trashNoteOptions", JSON.stringify(allNotes.trashNoteOptions));
    localStorage.setItem("trashNote", JSON.stringify(allNotes.trashNote));
    localStorage.setItem("trashNoteDate", JSON.stringify(allNotes.trashNoteDate));

    renderNotes();
}
