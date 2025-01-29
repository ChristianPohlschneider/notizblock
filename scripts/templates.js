
function getNotesTemplate(index) {
    return `<div class="pDiv"><p>${allNotes.noteOptions[index]}: ${allNotes.note[index]} am </p><p class="dateDecoration">${allNotes.noteDate[index]}</p></div>
    <div class="buttonDiv">
    <button onclick='moveNotes(${index}, "note", "trashNote")'>X</button>
    </div>
    <div class="underlineNotes"></div>
   `;
}

function getTrashNotesTemplate(index) {
    return `<div class="pDiv"><p>${allNotes.trashNoteOptions[index]}: ${allNotes.trashNote[index]} am </p><p class="dateDecoration">${allNotes.trashNoteDate[index]}</p></div>
    <div class="buttonDiv">
    <button onclick="deleteNote(${index})">X</button>
    <button onclick="transferToArchive(${index})">A</button>
    <button id="option1" value="1" onclick="transferBackToNotes(${index})">N</button>
    </div>
    <div class="underlineNotes"></div>
    `;
}

function getArchiveNotesTemplate(index) {
    return `<div class="pDiv"><p>${allNotes.archiveNoteOptions[index]}: ${allNotes.archiveNote[index]} am </p><p class="dateDecoration">${allNotes.archiveNoteDate[index]}</p></div>
    <div class="buttonDiv">
    <button id="option1" value="2" onclick="transferBackToNotes(${index})">N</button>
    </div>
    <div class="underlineNotes"></div>
    `;
}