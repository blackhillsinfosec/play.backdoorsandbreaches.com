var cardlist = 'js/carddb.json'
var GameType = 'BNB'
var proc = []
var init = []
var pivot = []
var c2 = []
var persist = []
var ins = []
var con = []
s = 0
t = 1
u = 0
v = 1

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
        cardtype = ["proc", "init", "pivot", "c2", "persist", "ins", "con"];
    } else {
        cardtype = ["proc", "init", "pivot", "c2", "persist", "ins"];
    }

    cardtype.forEach(buildlist);
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
            if (item == "proc" && x.type == "procedure") {
                c = "procimg"
                li = "<div class='" + item + "'><a href='" + x.image + "' data-lightbox='procedure" + x.id + "'><img class='" + c + "' src='" + x.image + "'></a></div>"
                proc.push(li);
            }
            if (item == "ins" && x.type == "inject") {
                c = "inject"
                li = "<div class='" + c + "'><a href='" + x.image + "' data-lightbox='inject" + x.id + "'><img src='" + x.image + "'></a></div>"
                ins.push(li)
            }
            if (item == "con" && x.type == "consultant") {
                c = "consultant"
                li = "<div class='" + c + "'><a href='" + x.image + "' data-lightbox='consultant" + x.id + "'><img src='" + x.image + "'></a></div>"
                con.push(li)
            }
            if (item == "init" && x.type == "initial") {
                c = "scenimg"
                li = "<a href='" + x.image + "' data-lightbox='initial" + x.id + "'><img class='" + c + "' src='" + x.image + "'></a>"
                init.push(li)
            }
            if (item == "pivot" && x.type == "pivot") {
                c = "scenimg"
                li = "<a href='" + x.image + "' data-lightbox='pivot" + x.id + "'><img class='" + c + "' src='" + x.image + "'></a>"
                pivot.push(li)
            }
            if (item == "c2" && x.type == "c2") {
                c = "scenimg"
                li = "<a href='" + x.image + "' data-lightbox='c2" + x.id + "'><img class='" + c + "' src='" + x.image + "'></a>"
                c2.push(li)
            }
            if (item == "persist" && x.type == "persist") {
                c = "scenimg"
                li = "<a href='" + x.image + "' data-lightbox='persist" + x.id + "'><img class='" + c + "' src='" + x.image + "'></a>"
                persist.push(li)
            }

        });
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
    //document.getElementById("dm_solution").innerHTML = "";

    shuffle(proc);
    document.getElementById("output").innerHTML = proc.slice(0, 4).join("");
    document.getElementById("remainder").innerHTML = proc.slice(4, 11).join("");

    shuffle(init);
    document.getElementById("a").innerHTML = init.slice(0, 1);
    document.getElementById("dma").innerHTML = init.slice(0, 1);

    shuffle(pivot);
    document.getElementById("b").innerHTML = pivot.slice(0, 1);
    document.getElementById("dmb").innerHTML = pivot.slice(0, 1);

    shuffle(c2);
    document.getElementById("c").innerHTML = c2.slice(0, 1);
    document.getElementById("dmc").innerHTML = c2.slice(0, 1);

    shuffle(persist);
    document.getElementById("d").innerHTML = persist.slice(0, 1);
    document.getElementById("dmd").innerHTML = persist.slice(0, 1);

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