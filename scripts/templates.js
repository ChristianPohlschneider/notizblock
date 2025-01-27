
function getNotesTemplate(index) {
    return `<div class="pDiv"><p>${noteOptions[index]}: ${notes[index]} am </p><p class="dateDecoration">${noteDate[index]}</p></div>
    <div class="buttonDiv">
    <button onclick="transferToWaste(${index})">X</button>
    </div>
    <div class="underlineNotes"></div>
   `;
}

function getTrashNotesTemplate(index) {
    return `<div class="pDiv"><p>${trashNoteOptions[index]}: ${trashNotes[index]} am </p><p class="dateDecoration">${trashNoteDate[index]}</p></div>
    <div class="buttonDiv">
    <button onclick="deleteNote(${index})">X</button>
    <button onclick="transferToArchive(${index})">A</button>
    <button id="option1" value="1" onclick="transferBackToNotes(${index})">N</button>
    </div>
    <div class="underlineNotes"></div>
    `;
}

function getArchiveNotesTemplate(index) {
    return `<div class="pDiv"><p>${archiveNoteOptions[index]}: ${archiveNotes[index]} am </p><p class="dateDecoration">${archiveNoteDate[index]}</p></div>
    <div class="buttonDiv">
    <button id="option1" value="2" onclick="transferBackToNotes(${index})">N</button>
    </div>
    <div class="underlineNotes"></div>
    `;
}