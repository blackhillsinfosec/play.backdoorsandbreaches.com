// VERSION*/
// B&B - Engine.CS.1.0
//
var finishedBuild = false;
var hasConsultants = false;
var hasAddOns = false;
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
        document.getElementById("remainder").innerHTML = proc.slice(4, proc.length).join("");

        shuffle(init);
        document.getElementById("a").innerHTML = init.slice(0,1);
        document.getElementById("dma").innerHTML = init.slice(0,1);

        shuffle(pivot);
        document.getElementById("b").innerHTML = pivot.slice(0,1);
        document.getElementById("dmb").innerHTML = pivot.slice(0,1);

        shuffle(c2);
        document.getElementById("c").innerHTML = c2.slice(0,1);
        document.getElementById("dmc").innerHTML = c2.slice(0,1);

        shuffle(persist);
        document.getElementById("d").innerHTML = persist.slice(0,1);
        document.getElementById("dmd").innerHTML = persist.slice(0,1);

        //add remainders for add-on scenario
        reminit=init.slice();
        reminit.splice(0, 1);

        remc2=c2.slice();
        remc2.splice(0, 1);

        rempivot=pivot.slice();
        rempivot.splice(0, 1);

        rempersist=persist.slice();
        rempersist.splice(0, 1);

        clear_addon();
        checkaddon();


}

function clear_addon() {

  clear_ic();
  clear_pe();
  clear_ce();
  clear_per();
}

function randcondition() {

        shuffle(ins);
//INJECTS
        //console.log("Inject Pool:");
        //console.log(ins);
        randins = Object.assign([], ins);
        randcons = Object.assign([], cons);
        //console.log("Inject Pool (Randomized):");
        //console.log(randins);

          //set init
        document.getElementById("injectbox").innerHTML = randins.slice(0,1);
        document.getElementById("injectbox").innerHTML += "<button id='clearcon' onclick='clearcondition()'> Clear Starting Condition </button>";
        console.log("Chosen Inject:");
        console.log(randins.slice(0,1));
        randins.shift();
        randcons.shift();
        //set consultants
        

        shuffle(randins);
        shuffle(randcons);
        console.log("Remaining Pool:");
        console.log(randins);


}

function clearcondition() {
document.getElementById("injectbox").innerHTML = "<button onClick=\"randcondition()\">Random Condition</button> <button onClick=\"customtoggle();boxtoggle('start');buildinjmenu()\">Custom Condition</button>";
randins = Object.assign([], ins);
console.log(randins.length);
}


s = 0
t = 1

u = 0
v = 1
function update_ins() {

    document.getElementById("e").innerHTML = randins.slice(s,t);
            s++
            t++
            if (t==randins.length+1)
              {s = 0; t = 1;}
        }

function rem_ins() {
        $.getJSON(cardlist, function(h) {
        $(e).html("<img style='width:200px;' src='"+h.grey+"'>")
        });
    }

    function update_con() {

      document.getElementById("f").innerHTML = randcons.slice(u,v);
              u++
              v++
              if (v==randcons.length+1)
                {u = 0; v = 1;}
          }
  
  function rem_con() {
          $.getJSON(cardlist, function(h) {
          $(f).html("<img style='width:200px;' src='"+h.green+"'>")
          });
      }


//Add-On Scenario code

IC = 0
PE = 0
CE = 0
PER = 0

        //EXPANSION SCENARIO ADD-ONS SCRIPTS
        //NOTE: The custom functions of each add method are designed for the custom scenario tools.
        function addIC() {
            IC++
              document.getElementById("addIC").innerHTML += "<div class=\"cards__single_"+IC+"\" id=\"ic_"+IC+"\"><div class=\"cards__front\"><img src=\"img/bb-back-init.png\"></div><div class=\"cards__back\"><div class=\"init\" id=\"w"+IC+"\">"+init.slice(IC,IC+1);+"</div></div></div>"
              document.getElementById("w"+IC).innerHTML = reminit.slice(IC,IC+1);
              if (IC == 2) {
              buttIC.style.display = "none";
              clearIC.style.display = "inline";
             }
             document.getElementById("solIC").innerHTML += reminit.slice(IC,IC+1);
             const addtrigger = document.querySelectorAll('[id^="ic_"]');
             addtrigger.forEach((xc) =>  {

             if(xc.getAttribute("state")!=="flipped")
	            {
                    xc.addEventListener("click", flipCard);
                }
             });

        }
        function addICCustom(objects)
        {
          console.log(swap);
            IC++
            if (IC > 2) {
                
                clear_ic();
                IC++; //prevents an extra from getting through...
               }
               else if (IC == 2)
               {
                buttIC.style.display = "none";
                clearIC.style.display = "inline";
               }
              document.getElementById("addIC").innerHTML += "<div class=\"cards__single_"+IC+"\" id=\"ic_"+IC+"\"><div class=\"cards__front\"><img src=\"img/bb-back-init.png\"></div><div class=\"cards__back\"><div class=\"init\" id=\"w"+IC+"\">"+init.slice(IC,IC+1);+"</div></div></div>"
              document.getElementById("w"+IC).innerHTML = objects;
              
             document.getElementById("solIC").innerHTML += objects;
             const addtrigger = document.querySelectorAll('[id^="ic_"]');
             addtrigger.forEach((xc) =>  {

             if(xc.getAttribute("state")!=="flipped")
	            {
                    xc.addEventListener("click", flipCard);
                }
             });
        }
        function addPE() {
            PE++
              document.getElementById("addPE").innerHTML += "<div class=\"cards__single_"+PE+"\" id=\"pe_"+PE+"\"><div class=\"cards__front\"><img src=\"img/bb-back-pivot.png\"></div><div class=\"cards__back\"><div class=\"init\" id=\"x"+PE+"\">"+pivot.slice(PE,PE+1);+"</div></div></div>"
              document.getElementById("x"+PE).innerHTML = rempivot.slice(PE,PE+1);
              if (PE == 2) {
              buttPE.style.display = "none";
              clearPE.style.display = "inline";
             }
              document.getElementById("solPE").innerHTML += rempivot.slice(PE,PE+1);
              const addtrigger = document.querySelectorAll('[id^="pe_"]');
              addtrigger.forEach((xc) =>  {

             if(xc.getAttribute("state")!=="flipped")
	            {
                    xc.addEventListener("click", flipCard);
                }
             });
        }
        function addPECustom(objectsPE) {
          PE++
          if (PE > 2) {
                
            clear_pe();
            PE++; //prevents an extra from getting through...
           }
           else if (PE == 2)
           {
            buttPE.style.display = "none";
            clearPE.style.display = "inline";
           }
              document.getElementById("addPE").innerHTML += "<div class=\"cards__single_"+PE+"\" id=\"pe_"+PE+"\"><div class=\"cards__front\"><img src=\"img/bb-back-pivot.png\"></div><div class=\"cards__back\"><div class=\"init\" id=\"x"+PE+"\">"+pivot.slice(PE,PE+1);+"</div></div></div>"
              document.getElementById("x"+PE).innerHTML = objectsPE;
              
              document.getElementById("solPE").innerHTML += objectsPE;
              const addtrigger = document.querySelectorAll('[id^="pe_"]');
              addtrigger.forEach((xc) =>  {

             if(xc.getAttribute("state")!=="flipped")
	            {
                    xc.addEventListener("click", flipCard);
                }
             });
      }
        function addCE() {
            CE++
              document.getElementById("addCE").innerHTML += "<div class=\"cards__single_"+CE+"\" id=\"ce_"+CE+"\"><div class=\"cards__front\"><img src=\"img/bb-back-c2.png\"></div><div class=\"cards__back\"><div class=\"init\" id=\"y"+CE+"\">"+c2.slice(CE,CE+1);+"</div></div></div>"
              document.getElementById("y"+CE).innerHTML = remc2.slice(CE,CE+1);
              if (CE == 2) {
              buttCE.style.display = "none";
              clearCE.style.display = "inline";
             }
              document.getElementById("solCE").innerHTML += remc2.slice(CE,CE+1);
              const addtrigger = document.querySelectorAll('[id^="ce_"]');
              addtrigger.forEach((xc) =>  {

             if(xc.getAttribute("state")!=="flipped")
	            {
                    xc.addEventListener("click", flipCard);
                }
             });
        }
        function addCECustom(objectsCE)
        {
          CE++
          if (CE > 2) {
                
            clear_ce();
            CE++; //prevents an extra from getting through...
           }
           else if (CE == 2)
           {
            buttCE.style.display = "none";
            clearCE.style.display = "inline";
           }
              document.getElementById("addCE").innerHTML += "<div class=\"cards__single_"+CE+"\" id=\"ce_"+CE+"\"><div class=\"cards__front\"><img src=\"img/bb-back-c2.png\"></div><div class=\"cards__back\"><div class=\"init\" id=\"y"+CE+"\">"+c2.slice(CE,CE+1);+"</div></div></div>"
              document.getElementById("y"+CE).innerHTML = objectsCE
              
              document.getElementById("solCE").innerHTML += objectsCE;
              const addtrigger = document.querySelectorAll('[id^="ce_"]');
              addtrigger.forEach((xc) =>  {

             if(xc.getAttribute("state")!=="flipped")
	            {
                    xc.addEventListener("click", flipCard);
                }
             });
        }
        function addPER() {
            PER++
              document.getElementById("addPER").innerHTML += "<div class=\"cards__single_"+PER+"\" id=\"per_"+PER+"\"><div class=\"cards__front\"><img src=\"img/bb-back-persist.png\"></div><div class=\"cards__back\"><div class=\"init\" id=\"z"+PER+"\">"+persist.slice(PER,PER+1);+"</div></div></div>"
              document.getElementById("z"+PER).innerHTML = rempersist.slice(PER,PER+1);
              if (PER == 2) {
              buttPER.style.display = "none";
              clearPER.style.display = "inline";
             }
              document.getElementById("solPER").innerHTML += rempersist.slice(PER,PER+1);
              const addtrigger = document.querySelectorAll('[id^="per_"]');
              addtrigger.forEach((xc) =>  {

             if(xc.getAttribute("state")!=="flipped")
	            {
                    xc.addEventListener("click", flipCard);
                }
             });
        }
        function addPERCustom(objectsPER)
        {
          PER++
          if (PER > 2) {
                
            clear_per();
            PER++; //prevents an extra from getting through...
           }
           else if (PER == 2)
           {
            buttPER.style.display = "none";
            clearPER.style.display = "inline";
           }
              document.getElementById("addPER").innerHTML += "<div class=\"cards__single_"+PER+"\" id=\"per_"+PER+"\"><div class=\"cards__front\"><img src=\"img/bb-back-persist.png\"></div><div class=\"cards__back\"><div class=\"init\" id=\"z"+PER+"\">"+persist.slice(PER,PER+1);+"</div></div></div>"
              document.getElementById("z"+PER).innerHTML = objectsPER;
              
              document.getElementById("solPER").innerHTML += objectsPER;
              const addtrigger = document.querySelectorAll('[id^="per_"]');
              addtrigger.forEach((xc) =>  {

             if(xc.getAttribute("state")!=="flipped")
	            {
                    xc.addEventListener("click", flipCard);
                }
             });
        }



        //Build the list out


    function buildlist(item, i) {
      
      //$.getJSON(cardlist, function(h) {
        //console.log(h);
        //console.log("This is what we are trying to build");

        //There used to be a getJSON call for the deck here
        //This was removed and replaced by cardData, which is stored
        //after the getJSON function in deck-script. 
        let h = cardData;

        //This is needed to track the names of each card in the list. If not present, then we add it to the list
        cardNames = [];

        countID = 1;
        $.each(h.data, function(i, x) {
          console.log(countID);

              if (item=="proc" && x.type=="procedure") {
                  c ="procimg"
                  if (x.details==null  || x.details==""){
                       li = "<div class='"+item+"' id='"+countID+"'><a href='"+x.image+"' data-lightbox='procedure"+countID+"'><img class='"+c+"' src='"+x.image+"'></a></div>"
                     } else {
                       li = "<div class='"+item+"' id='"+countID+"'><a href='"+x.image+"' data-lightbox='procedure"+countID+"' data-title='"+x.details+"'><img class='"+c+"' src='"+x.image+"'></a></div>"
                     }
                  if (!cardNames.includes(x.name))
                  {
                    proc.push(li);
                    cardNames.push(x.name);
                  }
                    
                 }

              if (item=="ins" && x.type=="inject") {
                  c="inject"
                  //console.log("inject found");
                  if (x.details==null|| x.details==""){
                       li = "<div class='"+c+"'><a href='"+x.image+"' data-lightbox='inject"+countID+"'><img src='"+x.image+"'></a></div>"
                     } else {
                       li = "<div class='"+c+"'><a href='"+x.image+"' data-lightbox='inject"+countID+"' data-title='"+x.details+"'><img src='"+x.image+"'></a></div>"
                     }
                     if (!cardNames.includes(x.name))
                     {
                       ins.push(li);
                       cardNames.push(x.name);
                     }
                  randins = shuffle(ins)
                  }
                  


              if (item=="init" && x.type=="initial") {
                  c="scenimg"
                  if (x.details==null|| x.details==""){
                       li = "<a href='"+x.image+"' data-lightbox='initial"+countID+"'><img class='"+c+"' src='"+x.image+"'></a>"
                     } else {
                       li = "<a href='"+x.image+"' data-lightbox='initial"+countID+"' data-title='"+x.details+"'><img class='"+c+"' src='"+x.image+"'></a>"
                     }
                     if (!cardNames.includes(x.name))
                     {
                       init.push(li);
                       cardNames.push(x.name);
                     }
                  }
              if (item=="pivot" && x.type=="pivot") {
                  c="scenimg"
                  if (x.details==null|| x.details==""){
                       li = "<a href='"+x.image+"' data-lightbox='pivot"+countID+"'><img class='"+c+"' src='"+x.image+"'></a>"
                     } else {
                       li = "<a href='"+x.image+"' data-lightbox='pivot"+countID+"' data-title='"+x.details+"'><img class='"+c+"' src='"+x.image+"'></a>"
                     }
                     if (!cardNames.includes(x.name))
                     {
                       pivot.push(li);
                       cardNames.push(x.name);
                     }
                  }
              if (item=="c2" && x.type=="c2") {
                  c="scenimg"
                  if (x.details==null|| x.details==""){
                       li = "<a href='"+x.image+"' data-lightbox='c2"+countID+"'><img class='"+c+"' src='"+x.image+"'></a>"
                     } else {
                       li = "<a href='"+x.image+"' data-lightbox='c2"+countID+"' data-title='"+x.details+"'><img class='"+c+"' src='"+x.image+"'></a>"
                     }
                     if (!cardNames.includes(x.name))
                     {
                       c2.push(li);
                       cardNames.push(x.name);
                     }
                  }
              if (item=="persist" && x.type=="persist") {
                  c="scenimg"
                  if (x.details==null|| x.details==""){
                      li = "<a href='"+x.image+"' data-lightbox='persist"+countID+"'><img class='"+c+"' src='"+x.image+"'></a>"
                    } else {
                      li = "<a href='"+x.image+"' data-lightbox='persist"+countID+"' data-title='"+x.details+"'><img class='"+c+"' src='"+x.image+"'></a>"
                    }
                    if (!cardNames.includes(x.name))
                    {
                      persist.push(li);
                      cardNames.push(x.name);
                    }
                  }

                  if (item=="cons" && x.type=="consultant") {
                    hasConsultants = true; //We have consultants if we reach here, so let the world know!
                    
                    c="consultant"
                    if (x.details==null|| x.details==""){
                         li = "<div class='"+c+"'><a href='"+x.image+"' data-lightbox='consultant"+countID+"'><img src='"+x.image+"'></a></div>"
                       } else {
                         li = "<div class='"+c+"'><a href='"+x.image+"' data-lightbox='consultant"+countID+"' data-title='"+x.details+"'><img src='"+x.image+"'></a></div>"
                       }
                       if (!cardNames.includes(x.name))
                       {
                         cons.push(li);
                         cardNames.push(x.name);
                       }
                    randcons = shuffle(cons)
                    }

                    countID++;

                    
                    
  
                  //console.log("building list...");
              });
              if (h.addOnEnabled == "true" || h.addOnEnabled == "True")
              {
                //console.log("This deck allows add-on scenarios");
                hasAddOns = true;
              }
          //});
      }

var cardlist;

var proc = []
var init = []
var pivot = []
var c2 = []
var persist = []
var ins = []
var cons = [];


function initCardList() {

  // Determine Deck Selection
  deck = localStorage.getItem("deckKey");
  if (deck === null)
  {
    deck = "CoreV22";
    console.log("null deck, choosing default");
  }

  
    //updatedeck(deck);
  
  //GetVersion
    $.getJSON(cardlist, function(h) {
          //console.log(h);
          $(version).append(h.title);
          $(date).append(h.revdate);
          });
  
  
   //BUILD LISTS
   cardtype = ["proc", "init", "pivot", "c2", "persist", "ins", "cons"];
   cardtype.forEach(buildlist);
   //finishedBuild = true;
   //updatedeck(deck);

   //EXPERIMENTAL: Try initializing the deck checks here, which makes a lot more sense
   if (hasConsultants == false)
      {
        $("#consultantButton").hide();

      }
      else{
        $("#consultantButton").show();
      }
      
      //check for Add-On Scenarios as well
      if (hasAddOns == false)
      {
        $("#addonbutton").hide();
        $("#addonbuttonSolution").hide();
      }


   
  }

//DEBUG CARD POOL:
/*
console.log(proc);
console.log(ins);
console.log(init);
console.log(persist);
console.log(c2);
console.log(pivot);
*/
//console.log(ins);
//console.log(cons);




