//TOGGLE FUNCTIONS
function customtoggle() {
    var x = document.getElementById("builder");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function boxtoggle(a) {
    menus = ["ic", "pv", "c2", "ps", "proc", "start"]
    menus.forEach(function(b, i) {
        if (b != a) {
            document.getElementById(b).style.display = "none";
        } else {
            document.getElementById(a).style.display = "block";
        }
    });
}

function buildscenemenu(s) {
    if (s == 'ic') {
        selected = init;
        data = inits;
    } else if (s == 'pv') {
        selected = pivot;
        data = pivots;
    } else if (s == 'c2') {
        selected = c2;
        data = c2s;
    } else if (s == 'ps') {
        selected = persist;
        data = persists;
    }

    //Card Selectors
    document.getElementById(s).innerHTML = "";
    data.forEach(function(card, i) {
        var cssSelected = ((selected) && (selected.img == card.img) ? 'selected' : '');
        var cardtile = "<a href='javascript:void(0)'><img class='scenimgbuild' src='" + card.img + "'></a>"
        cdv = "<div id='" + s + "_" + card.id + "' class='custcard " + cssSelected + "' onclick='choosescene(\"" + card.id + "\",\"" + s + "\",\"" + card.img + "\");'>" + cardtile + "</div>"
        document.getElementById(s).innerHTML += cdv;
    });
}

function choosescene(id, type, img) {
    $('.custcard').removeClass('selected');
    $('#' + type + '_' + id).addClass('selected');

    if (type == 'ic') {
        init = { "id": id, "img": img, "type": type }
        template = "<a href='" + img + "' data-lightbox='initial" + id + "'><img class='scenimg' src='" + img + "'></a>"
        document.getElementById("a").innerHTML = template;
        document.getElementById("dma").innerHTML = template;
    } else if (type == 'pv') {
        pivot = { "id": id, "img": img, "type": type }
        template = "<a href='" + img + "' data-lightbox='pivot" + id + "'><img class='scenimg' src='" + img + "'></a>"
        document.getElementById("b").innerHTML = template;
        document.getElementById("dmb").innerHTML = template;
    } else if (type == 'c2') {
        c2 = { "id": id, "img": img, "type": type }
        template = "<a href='" + img + "' data-lightbox='c2" + id + "'><img class='scenimg' src='" + img + "'></a>"
        document.getElementById("c").innerHTML = template;
        document.getElementById("dmc").innerHTML = template;
    } else if (type == 'ps') {
        persist = { "id": id, "img": img, "type": type }
        template = "<a href='" + img + "' data-lightbox='persist" + id + "'><img class='scenimg' src='" + img + "'></a>"
        document.getElementById("d").innerHTML = template;
        document.getElementById("dmd").innerHTML = template;
    }

    return false;
}

function buildinjmenu() {

    //Card Selectors
    document.getElementById("start").innerHTML = "";
    ins.forEach(buildselector);

    function buildselector(card, i) {
        //console.log(i)
        cardtile = card


        //change style to fit box
        cardtile = cardtile.replace("<a ", "<a onclick='return false;' ")
        cardtile = cardtile.replace("data-lightbox", "data")

        //console.log(card)
        //create containing div
        cdv = "<div id='inj_" + i + "' onclick='chooseinj(this.id, this);'>" + cardtile + "</div>"
        document.getElementById("start").innerHTML += cdv;
    };
}

function chooseinj(id, contents) {
    //fix lightbox and formatting
    card = contents.innerHTML;
    swap = card.replace("scenimgbuild", "scenimg");
    swap = swap.replace("return false;", "")
    swap = swap.replace("data", "data-lightbox")

    document.getElementById("injectbox").innerHTML = swap;

    randins = Object.assign([], ins);
    idx = id.replace("inj_", "")
    randins.splice(idx, 1);

    shuffle(randins);
    //boxtoggle('start');

    return false;
}

function buildprocmenu() {
    document.getElementById("proc").innerHTML = "";
    procs.forEach(function(card, i) {
        var cardtile = "<a href='javascript:void(0)'><img class='procimgbuild' src='" + card.img + "'></a>"
        document.getElementById("proc").innerHTML += "<div id='proc_" + card.id + "' class='custcard proc' onclick='chooseproc(\"" + card.id + "\");'>" + cardtile + "</div>";
    });
}

function chooseproc(id) {
    $('#proc_' + id).addClass('selected');

    if (chosenprocs.length < maxproc) {
        chosenprocs.push(id);
    } else {
        chosenprocs = [];
        $('.custcard').removeClass('selected');
    }

    document.getElementById('output').innerHTML = '';
    document.getElementById('remainder').innerHTML = '';

    procs.forEach(function(card, i) {
        if (chosenprocs.includes(card.id)) {
            type = 'output'
        } else {
            type = 'remainder'
        }
        template = "<div class='proc'><a href='" + card.img + "' data-lightbox='procedure" + card.id + "'><img class='procimg' src='" + card.img + "'></a></div>"
        document.getElementById(type).innerHTML += template;
    });

    return false;
}