function Question(year, tekst, question, answers){
    this.year = year;
    this.tekst = tekst;
    this.question = question;
    this.answers = answers;
}

Question.prototype = {
    set Year(v) {this.year = v; },
    get Year() {return this.year; },

    set Text(v) {this.tekst = v; },
    get Text() {return this.tekst; },

    set Question(v) {this.question = v; },
    get Question() {return this.question; },

    set Answers(v) {this.answers = v; },
    get Answers() {return this.answers; }

}