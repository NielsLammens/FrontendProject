/**
 * Created by nielslammens on 1/12/14.
 */

function Player(id, firstname, name, dob, caps, selecties, doelpunten, speelminuten, info, position, image){
    this.id = id
    this.firstname = firstname;
    this.name = name;
    this.dob = dob;
    this.caps = caps;
    this.selecties = selecties;
    this.doelpunten = doelpunten;
    this.speelminuten = speelminuten;
    this.info = info;
    this.position = position;
    this.image = image;
    this.points = 0;
}

Player.prototype = {
    set Id(v) {this.id = v;},
    get Id() {return this.id;},

    set Firstname(v) {this.firstname = v;},
    get Firstname() {return this.firstname;},

    set Name(v) {this.name = v;},
    get Name() {return this.name;},

    set Dob(v) {this.dob = v;},
    get Dob() {return this.dob;},

    set Caps(v) {this.caps = v;},
    get Caps() {return this.caps;},

    set Selecties(v) {this.selecties = v;},
    get Selecties() {return this.selecties;},

    set Doelpunten(v) {this.doelpunten = v;},
    get Doelpunten() {return this.doelpunten;},

    set Speelminuten(v) {this.speelminuten = v;},
    get Speelminuten() {return this.speelminuten;},

    set Info(v) {this.info = v;},
    get Info() {return this.info;},

    set Position(v) {this.position = v;},
    get Position() {return this.position;},

    set Image(v) {this.image = v;},
    get Image() {return this.image;},

    set Points(v) {this.points = v;},
    get Points() {return this.points;}
}