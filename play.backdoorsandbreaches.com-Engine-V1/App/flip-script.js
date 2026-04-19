// VERSION*/
// B&B - Engine.FS.1.0
//

const cards = document.querySelectorAll(".cards__single");


function flipBack() {
    const backs = document.querySelectorAll(".cards__single");
    backs.forEach((c) => {
        const currentState = c.getAttribute("state");
        //const isFlippedVisually != c.classList.contains("flip");
        
        // Flip back if the card is in "flipped" state and currently visually flipped
        if (currentState === "flipped") {
            // Flip the card back
            c.classList.toggle("flip");
            c.setAttribute("state", "back");
             
            // Re-add click listener
            c.addEventListener("click", flipCard);
              }
    });
}

//cards.forEach((card) => card.addEventListener("click", flipCard));

//You can see full tutorial here
//https://www.ricardomoreira.io/blog/2020-06-15-flip-cards-with-javascript


function flipBack() {
const backs = document.querySelectorAll(".cards__single flip");
backs.forEach((c) => 
{
	if(c.getAttribute("state")=="flipped")
	{
	c.classList.toggle("flip");
	c.setAttribute("state", "back");
	c.addEventListener("click", flipCard);
 }
});

//card.setAttribute("class", "flipped");
}