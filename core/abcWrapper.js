export function renderAbc(element,sounds){
    if (typeof(sounds) == "string"){
        let note = convertToSingleNote(sounds);
        ABCJS.renderAbc(element,note,{
            scale: 1,
            staffwidth: 70,
            paddingtop: 0,
            paddingbottom: 0,
            paddingright: 0,
            paddingleft: 0
        });
        console.log("note: " + note);
    } else {
        let notes = '[';
        for (let i=0; i<sounds.length;i++){
            let note = convertToSingleNote(sounds[i]);
            notes = notes + note;
        }
        notes = notes + ']';
        console.log("note: " + notes);
        ABCJS.renderAbc(element,notes,{
            scale: 1,
            staffwidth: 70,
            paddingtop: 0,
            paddingbottom: 0,
            paddingright: 0,
            paddingleft: 0
        });
    }
};

export function convertToSingleNote(sound){
    let letter = [];
    let note;
	for (let i=0; i<sound.length; i++){
	    letter.push(sound.substr(i,1));
	}
	if (letter[1] == "#"){
	    note = "^"+letter[0];
	} else if (letter[1] == "b"){
	    note = "_"+letter[0];
	} else {
	    note = letter[0];
    }
	let letterTail = letter[letter.length - 1];
	if (letterTail == "3"){
	    note = note + ",";
	} else if (letterTail == "5"){
	    note = note.toLowerCase(note);
	} else if (letterTail == "6"){
	    note = note + "'";
    }
	return note;
};