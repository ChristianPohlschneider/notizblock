
function getNotesTemplate(index) {
    return `<div class="pDiv"><p>${allNotes.noteOptions[index]}: ${allNotes.note[index]} am </p><p class="dateDecoration">${allNotes.noteDate[index]}</p></div>
    <div class="buttonDiv">
    <button onclick='moveNotes(${index}, "note", "trashNote")'>X</button>
    <button onclick='moveNotes(${index}, "note", "archiveNote")'>A</button>
    </div>
    <div class="underlineNotes"></div>
   `;
}

function getTrashNotesTemplate(index) {
    return `<div class="pDiv"><p>${allNotes.trashNoteOptions[index]}: ${allNotes.trashNote[index]} am </p><p class="dateDecoration">${allNotes.trashNoteDate[index]}</p></div>
    <div class="buttonDiv">
    <button onclick='deleteNote(${index}, "trashNote")'>X</button>
    <button onclick='moveNotes(${index}, "trashNote", "archiveNote")'>A</button>
    <button onclick='moveNotes(${index}, "trashNote", "note")'>N</button>
    </div>
    <div class="underlineNotes"></div>
    `;
}

function getArchiveNotesTemplate(index) {
    return `<div class="pDiv"><p>${allNotes.archiveNoteOptions[index]}: ${allNotes.archiveNote[index]} am </p><p class="dateDecoration">${allNotes.archiveNoteDate[index]}</p></div>
    <div class="buttonDiv">
    <button onclick='deleteNote(${index}, "archiveNote")'>X</button>
    <button onclick='moveNotes(${index}, "archiveNote", "note")'>N</button>
    </div>
    <div class="underlineNotes"></div>
    `;
}