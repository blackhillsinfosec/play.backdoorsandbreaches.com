var cardlist = 'js/carddb.json'
var GameType = 'BNB'
var maxproc = 4;

var init;
var pivot;
var c2;
var persist;
var inits = [];
var pivots = [];
var c2s = [];
var persists = [];

var ins = [];
var con = [];
var proc = [];
var chosenprocs = [];
s = 0;
t = 1;
u = 0;
v = 1;

$(document).ready(function() {
    if (window.location.hash) {
        GameType = window.location.hash.substring(1);
    }

    if (GameType != 'BNBExp') {
        $('#butconsultants').hide();
    }

    //INITIAL STATE
    document.getElementById("a").innerHTML = "<img class='full' src='img/CARD_BACK_2.0_DRAGOS_RED.png'>"
    document.getElementById("b").innerHTML = "<img class='full' src='img/CARD_BACK_2.0_DRAGOS_YELLOW.png'>"
    document.getElementById("c").innerHTML = "<img class='full' src='img/CARD_BACK_2.0_DRAGOS_BROWN.png'>"
    document.getElementById("d").innerHTML = "<img class='full' src='img/CARD_BACK_2.0_DRAGOS_PURPLE.png'>"

    //BUILD LISTS
    if (GameType == 'BNBExp') {
        cardtype = ["proc", "initial", "pivot", "c2", "persist", "ins", "con"];
    } else {
        cardtype = ["proc", "initial", "pivot", "c2", "persist", "ins"];
    }

    cardtype.forEach(buildlist);

    $("#estproc").on('keyup mouseup', function() {
        maxproc = $("#estproc").val();
    });
});

function buildlist(item) {
    $.getJSON(cardlist, function(h) {
        if (GameType == 'BNB') {
            data = h.BNB.data
        } else if (GameType == 'BNBExp') {
            data = h.BNBExp.data
        } else {
            data = h.ICSOT.data
        }

        $.each(data, function(i, x) {
            if (item == x.type && x.type == "initial") { inits.push({ "id": x.id, "img": x.image, "type": "ic" }) }
            if (item == x.type && x.type == "pivot") { pivots.push({ "id": x.id, "img": x.image, "type": "pv" }) }
            if (item == x.type && x.type == "c2") { c2s.push({ "id": x.id, "img": x.image, "type": "c2" }) }
            if (item == x.type && x.type == "persist") { persists.push({ "id": x.id, "img": x.image, "type": "ps" }) }

            if (item == "proc" && x.type == "procedure") {
                li = "<div class='" + item + "'><a href='" + x.image + "' data-lightbox='procedure" + x.id + "'><img class='procimg' src='" + x.image + "'></a></div>"
                proc.push(li);
            }
            if (item == "ins" && x.type == "inject") {
                li = "<div class='inject'><a href='" + x.image + "' data-lightbox='inject" + x.id + "'><img src='" + x.image + "'></a></div>"
                ins.push(li)
            }
            if (item == "con" && x.type == "consultant") {
                li = "<div class='consultant'><a href='" + x.image + "' data-lightbox='consultant" + x.id + "'><img src='" + x.image + "'></a></div>"
                con.push(li)
            }
        });

        rando();
    });
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function rando() {
    //Initial
    init = shuffle(inits)[0];
    template = "<a href='" + init.img + "' data-lightbox='initial" + init.id + "'><img class='scenimg' src='" + init.img + "'></a>"
    document.getElementById("a").innerHTML = template;
    document.getElementById("dma").innerHTML = template;

    //Pivot
    pivot = shuffle(pivots)[0];
    template = "<a href='" + pivot.img + "' data-lightbox='pivot" + pivot.id + "'><img class='scenimg' src='" + pivot.img + "'></a>"
    document.getElementById("b").innerHTML = template;
    document.getElementById("dmb").innerHTML = template;

    //C2
    c2 = shuffle(c2s)[0];
    template = "<a href='" + c2.img + "' data-lightbox='c2" + c2.id + "'><img class='scenimg' src='" + c2.img + "'></a>"
    document.getElementById("c").innerHTML = template;
    document.getElementById("dmc").innerHTML = template;

    //Persist
    persist = shuffle(persists)[0];
    template = "<a href='" + persist.img + "' data-lightbox='persist" + persist.id + "'><img class='scenimg' src='" + persist.img + "'></a>"
    document.getElementById("d").innerHTML = template;
    document.getElementById("dmd").innerHTML = template;

    //PROCEDURES
    shuffle(proc);
    document.getElementById("output").innerHTML = proc.slice(0, maxproc).join("");
    document.getElementById("remainder").innerHTML = proc.slice(maxproc, proc.length).join("");

    //INJECTS
    randins = Object.assign([], ins);
    shuffle(randins);
    document.getElementById("injectbox").innerHTML = randins.slice(0, 1);
    randins.shift();

    //CONSULTANTS
    randcon = Object.assign([], con);
    shuffle(randcon);
}

function update_ins() {
    document.getElementById("e").innerHTML = randins.slice(s, t);
    s++
    t++
    if (t == randins.length + 1) {
        s = 0;
        t = 1;
    }
}

function rem_ins() {
    document.getElementById("e").innerHTML = "<img style='width:200px;'' src='img/CARD_BACK_2.0_DRAGOS_GREY.png'>";
}

function update_con() {
    document.getElementById("f").innerHTML = randcon.slice(u, v);
    u++
    v++
    if (v == randcon.length + 1) {
        u = 0;
        v = 1;
    }
}

function rem_con() {
    document.getElementById("f").innerHTML = "<img style='width:200px;'' src='img/CARD_BACK_2.0_DRAGOS_GREEN.png'>";
}