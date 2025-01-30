
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
    let archiveRef = document.getElementById('archiveNote');
    let trashContentRef = document.getElementById('trashNote');
    contentRef.innerHTML = "";
    archiveRef.innerHTML = "";
    trashContentRef.innerHTML = "";
    getNotesFromLocalStorage();
}

function getNotesFromLocalStorage() {
    let contentRef = document.getElementById('content');
    if (localStorage.getItem("note") == null || localStorage.getItem("noteDate") == null) {
        renderXNotes("trashNote");
        renderXNotes("archiveNote");
        return;
    }
    else {
        allNotes.noteOptions = JSON.parse(localStorage.getItem("noteOptions"));
        allNotes.note = JSON.parse(localStorage.getItem("note"));
        allNotes.noteDate = JSON.parse(localStorage.getItem("noteDate"));
        for (let index = 0; index < allNotes.noteOptions.length; index++) {
            contentRef.innerHTML += getNotesTemplate(index);
        }
        renderXNotes("trashNote");
        renderXNotes("archiveNote");
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

function renderXNotes(xNote) {
    let contentRef = document.getElementById(xNote);
    contentRef.innerHTML = "";

    if (localStorage.getItem(xNote) == null || localStorage.getItem(xNote + "Date") == null) {
        return
    }
    else {
        allNotes[xNote] = JSON.parse(localStorage.getItem(xNote));
        allNotes[xNote + "Options"] = JSON.parse(localStorage.getItem(xNote + "Options"));
        allNotes[xNote + "Date"] = JSON.parse(localStorage.getItem(xNote + "Date"));


        if (xNote == "trashNote") {
            for (let index = 0; index < allNotes.trashNote.length; index++) {
                contentRef.innerHTML += getTrashNotesTemplate(index);
            }
        }
        else {
            for (let index = 0; index < allNotes.archiveNote.length; index++) {
                contentRef.innerHTML += getArchiveNotesTemplate(index);
            }
        }
    }
}

function deleteNote(index, deleteKey) {
    allNotes[deleteKey].splice(index, 1);
    allNotes[deleteKey + "Options"].splice(index, 1);
    allNotes[deleteKey + "Date"].splice(index, 1);

    localStorage.setItem(deleteKey, JSON.stringify(allNotes[deleteKey]));
    localStorage.setItem(deleteKey + "Options", JSON.stringify(allNotes[deleteKey + "Options"]));
    localStorage.setItem(deleteKey + "Date", JSON.stringify(allNotes[deleteKey + "Date"]));

    renderNotes();
}