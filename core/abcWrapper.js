export function renderAbc(element,sounds,mode,scale,staffwidth){
    /* mode: single */
    if (typeof(sounds) == "string"){
        let note = convertToSingleNote(sounds);
        ABCJS.renderAbc(element,note,{
            scale: scale,
            staffwidth: staffwidth,
            paddingtop: 0,
            paddingbottom: 0,
            paddingright: 0,
            paddingleft: 0
        });
        console.log("note: " + note);
    } else {
        if (mode == "code"){
            let notes = '[';
            for (let i=0; i<sounds.length;i++){
                let note = convertToSingleNote(sounds[i]);
                notes = notes + note;
            }
            notes = notes + ']';
            console.log("notes: " + notes);
            ABCJS.renderAbc(element,notes,{
                scale: scale,
                staffwidth: staffwidth,
                paddingtop: 0,
                paddingbottom: 0,
                paddingright: 0,
                paddingleft: 0
            });
        } else if (mode="melody"){
            let notes = '';
            for (let i=0; i<sounds.length;i++){
                let note = convertToSingleNote(sounds[i]);
                notes = notes + note;
            }
            notes = notes + '|';
            console.log("notes: " + notes);
            ABCJS.renderAbc(element,notes,{
                scale: scale,
                staffwidth: staffwidth,
                paddingtop: 0,
                paddingbottom: 0,
                paddingright: 0,
                paddingleft: 0
            });

        }
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
	    note = note + "''";
    }
	return note;
};

export function convertToMessage(interval){
    let type = interval.substr(0,1);
    let degree = interval.substr(1,1);

    if (type == "P"){
        type = "カンゼン";
    } else if (type == "M"){
        type = "チョウ";
    } else if (type == "m"){
        type = "タン";
    }
    let message = type + degree + "度";
    console.log("Message is "+message);
    return message;
}