document.addEventListener('DOMContentLoaded', () => {

    const cardArray = [
        {
            name: "fool",
            img: "src/images/00fool.png"
        },
        {
            name: "empress",
            img: "src/images/03empress.png"
        },
        {
            name: "wheel",
            img: "src/images/10wheeloffortune.png"
        },
        {
            name: "death",
            img: "src/images/13death.png"
        },
        {
            name: "devil",
            img: "src/images/15thedevil.png"
        },
        {
            name: "tower",
            img: "src/images/16thetower.png"
        },
        {
            name: "fool",
            img: "src/images/00fool.png"
        },
        {
            name: "empress",
            img: "src/images/03empress.png"
        },
        {
            name: "wheel",
            img: "src/images/10wheeloffortune.png"
        },
        {
            name: "death",
            img: "src/images/13death.png"
        },
        {
            name: "devil",
            img: "src/images/15thedevil.png"
        },
        {
            name: "tower",
            img: "src/images/16thetower.png"
        }
    ]

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const matchDisplay = document.querySelector('#match');
    const gameoverDisplay = document.querySelector('.gameover');
    const attemptDisplay = document.querySelector('#attempt');
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];
    let count = 0;


    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'src/images/cardback.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }





    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenIds.push(cardId);
        this.setAttribute('class','flip');
        this.setAttribute('src', cardArray[cardId].img);
        matchDisplay.innerHTML = "<br>";
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }

    }

    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        let card = document.querySelector('img');
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];


        if (optionOneId === optionTwoId) {
            matchDisplay.innerHTML = "You've chosen the same tile."
            cards[optionOneId].setAttribute('src', 'src/images/cardback.png');
            cards[optionTwoId].setAttribute('src', 'src/images/cardback.png');
            cards[optionOneId].removeAttribute('class','flip');
            cards[optionTwoId].removeAttribute('class','flip');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            matchDisplay.innerHTML = "You've found a match! 1 Point."
            cards[optionOneId].setAttribute('src', 'src/images/cardback-blank.png');
            cards[optionTwoId].setAttribute('src', 'src/images/cardback-blank.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen)
            count++;
        } else {
            cards[optionOneId].setAttribute('src', 'src/images/cardback.png');
            cards[optionTwoId].setAttribute('src', 'src/images/cardback.png');
            cards[optionOneId].removeAttribute('class','flip');
            cards[optionTwoId].removeAttribute('class','flip');
            matchDisplay.innerHTML = "Try again."
            count ++;
        }

        if (count >= 16){
            disableCard();
            gameoverDisplay.style.visibility = "visible"; 
            gameoverDisplay.innerHTML = "Game Over";
            
            

        }

        cardsChosen = [];
        cardsChosenIds = [];
        resultDisplay.innerHTML = cardsWon.length;
        attemptDisplay.innerHTML = count;
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.innerHTML = "Congrats! You won!"
        }
        console.log(count);
    }


    function disableCard(){
        const cards = document.querySelectorAll('img');
        cards.forEach(cards => cards.removeEventListener('click', flipCard));
    }

    createBoard();
})

