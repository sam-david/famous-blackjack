'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var Underscore = require('underscore');
var FamousEngine = require('famous/core/FamousEngine');
var Position = require('famous/components/Position');
var Align = require('famous/components/Align');
var Rotation = require('famous/components/Rotation');
var Transitionable = require('famous/transitions/Transitionable');
console.log(Transitionable);
console.log(Position);
console.log(Align);

FamousEngine.init();

// Initialize with a scene; then, add a 'node' to the scene root
// Add elements into the scene as children of the scene
var blackjackApp = FamousEngine.createScene().addChild();

blackjackApp.onReceive = function (event, payload) {

    // if the event is click then we know
    // that a NavButton was clicked
    // (NavButtons are the only element)
    // With the click event.
    if (event === 'click') {
        var buttonContent = payload.node._components[2]._content;
        // get the id of the nav button
        // var to = payload.node.getId();
        if (buttonContent == "Hit") {
            if (isGameOver === false) {
                playerHit();
            }
        } else if (buttonContent == "Stay") {
            if (isGameOver === false) {
                console.log("Player stays")
                playerStay();
            }
        } else if (buttonContent == "Deal") {
            console.log("dealing cards now")
            resetGame();
        } else if (buttonContent == "Reset") {
            console.log("resetting game")
            resetGame();
        } else if (buttonContent == "↑") {
            console.log('increase bet');
            if (currentBet <= playerCash) {
                console.log("go up")
                currentBet++;
            }
            currentBetDisplay._components[2].setContent('$'+currentBet);
        } else if (buttonContent == "↓") {
            if (currentBet > 1) {
                currentBet--;
            }
            currentBetDisplay._components[2].setContent('$'+currentBet);
        } else if (buttonContent == "Sam David 2015") {
            window.open("http://sam-david.github.io/",'_blank');
        }
    }
};

// Game variables
var deckArray = [];
var dealerHand = [];
var playerHand = [];
var playerCash = 250;
var currentBet = 10;
var dealerFirstCard = true;
var isGameOver = false;
var playerNodes = [];
var dealerNodes = [];
var playerBlackjack = false;
// Famo.us variables
var dealerCard1 = blackjackApp.addChild();
var dealerCard2 = blackjackApp.addChild();
var dealerCard3 = blackjackApp.addChild();
var dealerCard4 = blackjackApp.addChild();
var dealerCard5 = blackjackApp.addChild();
var playerCard1 = blackjackApp.addChild();
var playerCard2 = blackjackApp.addChild();
var playerCard3 = blackjackApp.addChild();
var playerCard4 = blackjackApp.addChild();
var playerCard5 = blackjackApp.addChild();
var dealer = blackjackApp.addChild();
var leftSidePanel = blackjackApp.addChild();
var table = blackjackApp.addChild();
var deck = blackjackApp.addChild();
var dealButton = blackjackApp.addChild();
var resetButton = blackjackApp.addChild();
var hitButton = blackjackApp.addChild();
var hitButtonXOrigin = 0;
var hitButtonYOrigin = .4;
var stayButton = blackjackApp.addChild();
var stayButtonXOrigin = .1;
var stayButtonYOrigin = .4;
var currentCash = blackjackApp.addChild();
var messageDisplay = blackjackApp.addChild();
var balanceTitle = blackjackApp.addChild();
var betTitle = blackjackApp.addChild();
var betIncrease = blackjackApp.addChild();
var betIncreaseXOrigin = 0;
var betIncreaseYOrigin = .85;
var betDecrease = blackjackApp.addChild();
var betDecreaseXOrigin = .1;
var betDecreaseYOrigin = .85;
var currentBetDisplay = blackjackApp.addChild();
var signature = blackjackApp.addChild();
var gameTitle = blackjackApp.addChild();
var famousTitle = blackjackApp.addChild();
var rules = blackjackApp.addChild();
var dealerLeftAlign = .22;
var playerLeftAlign = .22;
var cardZIndex = 10;
var cardXSize = .08;
var cardYSize = .2;

new DOMElement(rules, {
    content: 'Dealer draws to 16, Hits soft 17',
    properties: {
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': 'white',
        'font-size': '1.5em',
        zIndex: 10
    }
});
rules.setProportionalSize(.4,.1).setAlign(0.3,0.50);
new DOMElement(gameTitle, {
    content: 'Blackjack',
    properties: {
        'font-family': 'Limelight',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': 'black',
        'font-size': '3.5em',
        zIndex: 6
    }
});
gameTitle.setProportionalSize(.4,.1).setAlign(0.3,0.35);
new DOMElement(famousTitle, {
    content: 'Built with Famo.us Engine',
    properties: {
        'font-family': 'Limelight',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': 'black',
        'font-size': '1.2em',
        zIndex: 10
    }
});
famousTitle.setProportionalSize(.4,.1).setAlign(0.3,0.45);
new DOMElement(balanceTitle, {
    content: 'Balance:',
    properties: {
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': 'black',
        'font-size': '1.8em',
        zIndex: 15
    }
});
balanceTitle.setProportionalSize(.2,.1).setAlign(0,.58);
new DOMElement(betTitle, {
    content: 'Bet:',
    properties: {
        'text-align': 'right',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': 'black',
        'font-size': '1.8em',
        zIndex: 15
    }
});
betTitle.setProportionalSize(.1,.1).setAlign(0,.75);
new DOMElement(currentBetDisplay, {
    content: '$' + currentBet,
    properties: {
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#447343',
        'font-size': '1.8em',
        zIndex: 15
    }
});
currentBetDisplay.setProportionalSize(.1,.1).setAlign(.1,.75);
new DOMElement(betIncrease, {
    content: '↑',
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#447343',
        'border': 'solid #F2F2F2 3px',
        'font-size': '2em',
        'cursor': 'pointer',
        zIndex: 15
    }
});
betIncrease.setProportionalSize(.1,.1).setAlign(0,.85);
betIncrease.addUIEvent('click');
new DOMElement(betDecrease, {
    content: '↓',
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#447343',
        'border': 'solid #F2F2F2 3px',
        'font-size': '2em',
        'cursor': 'pointer',
        zIndex: 15
    }
});
betDecrease.setProportionalSize(.1,.1).setAlign(.1,.85);
betDecrease.addUIEvent('click');
// Constructor functions
function Card(value,suit,face) {
    this.value = value;
    this.suit = suit;
    this.face = face;
}

// Utility functions
function createDeckArray() {
    deckArray.push(new Card(10,"H","J"))
    deckArray.push(new Card(10,"D","J"))
    deckArray.push(new Card(10,"C","J"))
    deckArray.push(new Card(10,"S","J"))
    deckArray.push(new Card(10,"H","Q"))
    deckArray.push(new Card(10,"D","Q"))
    deckArray.push(new Card(10,"C","Q"))
    deckArray.push(new Card(10,"S","Q"))
    deckArray.push(new Card(10,"H","K"))
    deckArray.push(new Card(10,"D","K"))
    deckArray.push(new Card(10,"C","K"))
    deckArray.push(new Card(10,"S","K"))
    for (var i=1;i<=10;i++) {
        deckArray.push(new Card(i,"H"))
        deckArray.push(new Card(i,"D"))
        deckArray.push(new Card(i,"C"))
        deckArray.push(new Card(i,"S"))
    }
}

function shuffleDeck(deck) {
    return Underscore.shuffle(deck); 
}

function dealLastCard(deck) {
    return deck.pop();
}

function aceIndex(hand) {
    var index = 0;
    // return index of most recent ace
    for (var i=0;i<hand.length;i++) {
        if (hand[i].value == 1) {index = i;}
    }
    return index;
}

function cardNodesEqual(card1,card2) {
    if (card1 == null || card2 == null) {
        return false;
    }
    if (card1._id == card2._id) {
        return true;
    } else {
        return false;
    }
}

function constructImageName(card) {
    var finalName = "";
    if (card.face == "K") {finalName += "king"}
    else if (card.face == "Q") {finalName += "queen"}
    else if (card.face == "J") {finalName += "jack"}
    else if (card.value == 1) {finalName += "ace"}
    else {finalName += card.value.toString()}
    finalName += "_of_";
    if (card.suit == "H") {finalName += "hearts"}
    else if (card.suit == "D") {finalName += "diamonds"}
    else if (card.suit == "C") {finalName += "clubs"}
    else if (card.suit == "S") {finalName += "spades"}
    finalName += ".png"
    return finalName;
}

function handTotalValue(hand) {
    var lowValue = 0;
    var highValue = 0;
    var firstAce = false;
    for (var c=0;c<hand.length;c++) {
        if (hand[c].value == 1 && firstAce == false) {
            lowValue += 1;
            highValue += 11;
            firstAce = true;
        } else {
            lowValue += hand[c].value;
            highValue += hand[c].value;
        }
    }
    // console.log("Low:",lowValue,"High:",highValue)
    if (lowValue <= 21 && highValue > 21) {
        return lowValue
    } else {
        return highValue;
    }
}

function initializeGame() {
    // shuffle before dealing out for first time
    messageDisplay._components[2].setContent("Hit or Stay?");
    resetDeck();
    dealGame();    
}

function resetDeck() {
    deckArray = [];
    createDeckArray();
    deckArray = shuffleDeck(deckArray);
}

function dealGame() {
    dealerHand.push(dealLastCard(deckArray))
    playerHand.push(dealLastCard(deckArray))
    dealerHand.push(dealLastCard(deckArray))
    playerHand.push(dealLastCard(deckArray))
    viewPlayerCard(blackjackApp, playerHand[0], true)
    viewPlayerCard(blackjackApp, playerHand[1], true)
    viewDealerCard(blackjackApp, dealerHand[0]);
    viewDealerCard(blackjackApp, dealerHand[1],true);
    if (aceIndex(playerHand) != 0 && handTotalValue(playerHand) == 21) {
        console.log("Blackjack!!!")
        playerBlackjack = true;
        dealerSequence();
        if (handTotalValue(dealerHand) == handTotalValue(playerHand)) {
            gameOver("push");
        } else if (handTotalValue(dealerHand) < handTotalValue(playerHand)) {
            console.log('gameover bj')
            gameOver("player blackjack");
        } 
    } 
}

function viewPlayerCard(node,card,showTransition) {
    var imgSrc = './images/cards/' + constructImageName(card);
    var playerCard = node.addChild()
        .setProportionalSize(cardXSize, cardYSize)
        .setAlign(.875, 0.4)
        .setMountPoint(0, 0.5);
    new DOMElement(playerCard, {
    tagName: 'img',
    properties: {
        zIndex: cardZIndex
    }
    })
    .setAttribute('src', imgSrc);
    if (showTransition == true) {
        new Align(playerCard).set(playerLeftAlign,.7,cardZIndex,{duration:500});
        // var spinner = playerCard.addComponent({
        //     onUpdate: function(time) {
        //         playerCard.setRotation(0, time / 1000, 0);
        //         playerCard.requestUpdateOnNextTick(spinner);
        //     }
        // });
    }
    playerNodes.push(playerCard);
    playerLeftAlign += .1;
}

function viewDealerCard(node,card,isSecondCard) {
    if (isSecondCard == true) {
        var imgSrc = './images/cards/playing-card-back.png';
    } else {
        var imgSrc = './images/cards/' + constructImageName(card);
    }
    var dealerCard = node.addChild()
        .setProportionalSize(cardXSize, cardYSize)
        .setAlign(.875, 0.4)
        .setMountPoint(0, 0.5);
    new DOMElement(dealerCard, {
    tagName: 'img',
    properties: {
        zIndex: cardZIndex
    }
    })
    .setAttribute('src', imgSrc);
    var align = new Align(dealerCard).set(dealerLeftAlign,.2,cardZIndex,{duration:500})
    dealerNodes.push(dealerCard);
    dealerLeftAlign += .1;
}

function dealerSequence() {
    if (handTotalValue(dealerHand) > 17) {
        // do nothing
    } else if (handTotalValue(dealerHand) == 17 && aceIndex(dealerHand) != 0) {
        dealerHit();
    } else if (handTotalValue(dealerHand) == 17) {
        // do nothing
    } else if (handTotalValue(dealerHand) <= 16) {
        dealerHit();
        dealerSequence();
    }
}

function dealerHit() {
    dealerHand.push(dealLastCard(deckArray));
    viewDealerCard(blackjackApp, dealerHand[dealerHand.length-1])
    if (handTotalValue(dealerHand) > 21) {
        console.log("DEALER BUST");
        gameOver("dealer bust");
    }
}



function removeDealerCards() {
    for (var i=0;i<dealerNodes.length;i++) {
        for (var c=0;c<blackjackApp._children.length;c++) {
            if (cardNodesEqual(blackjackApp._children[c], dealerNodes[i])) {
                blackjackApp.removeChild(blackjackApp._children[c])
            }
        }
    }
    dealerLeftAlign = .22;
    dealerNodes = [];
}

function revealSecondCard() {
    console.log('revealing second dealer card',dealerHand[1])
    var secondCardSrc = './images/cards/' + constructImageName(dealerHand[1])
    var secondDealerCard = blackjackApp.addChild()
        .setProportionalSize(cardXSize, cardYSize)
        .setAlign(.32, 0.2)
        .setMountPoint(0, 0.5);
    new DOMElement(secondDealerCard, {
    tagName: 'img',
    properties: {
        zIndex: cardZIndex
    }
    })
    .setAttribute('src', secondCardSrc);
    for (var i=0;i<blackjackApp._children.length;i++) {
        if (blackjackApp._children[i] == dealerNodes[1]) {
            console.log('removing card back', blackjackApp._children[i])
            blackjackApp.removeChild(blackjackApp._children[i]);
        }
    }
    dealerNodes.push(secondDealerCard);
}

function removePlayerCards() {
    for (var i=0;i<playerNodes.length;i++) {
        for (var c=0;c<blackjackApp._children.length;c++) {
            if (cardNodesEqual(blackjackApp._children[c], playerNodes[i])) {
                blackjackApp.removeChild(blackjackApp._children[c])
            }
        }
    }
    playerLeftAlign = .22;
    playerNodes = [];
    playerHand = [];
}

function playerHit() {
    playerHand.push(dealLastCard(deckArray));
    var lastIndex = playerHand.length - 1;
    viewPlayerCard(blackjackApp, playerHand[lastIndex], true);
    if (handTotalValue(playerHand) > 21) {
        console.log("BUST!")
        gameOver("player bust");
    }
}


function playerStay() {
    dealerSequence();
    if (handTotalValue(dealerHand) > handTotalValue(playerHand) && handTotalValue(dealerHand) <= 21) {
        gameOver("dealer wins");
    } else if (handTotalValue(dealerHand) < handTotalValue(playerHand)) {
        gameOver("player wins");
    } else if (handTotalValue(dealerHand) == handTotalValue(playerHand)) {
        gameOver("push");
    }
}

function gameOver(result) {
    if (result == "player bust") {
        playerCash -= currentBet;
        messageDisplay._components[2].setContent("Player Bust");
    } else if (result == "dealer bust") {
        console.log(playerBlackjack)
        if (playerBlackjack == false) {
            messageDisplay._components[2].setContent("Dealer Bust");
            playerCash += currentBet;
        } else {
            console.log('dealer bust on player blackjack');
            messageDisplay._components[2].setContent("Blackjack!");
        }
    } else if (result == "player wins") {
        messageDisplay._components[2].setContent("Player Wins");
        playerCash += currentBet;
    } else if (result == "dealer wins") {
        playerCash -= currentBet;
        messageDisplay._components[2].setContent("Dealer Wins");
    } else if (result == "player blackjack") {
        messageDisplay._components[2].setContent("Blackjack!");
    } else if (result == "push") {
        messageDisplay._components[2].setContent("Push");
    }
    if (playerBlackjack == true) {
        playerCash += currentBet * 1.5;
        playerBlackjack = false;
    }
    revealSecondCard();
    currentCash._components[2].setContent('$' + playerCash);
    isGameOver = true;
    new Align(hitButton).set(1,1)
    new Align(stayButton).set(1,1)
    new Align(betIncrease).set(betIncreaseXOrigin,betIncreaseYOrigin)
    new Align(betDecrease).set(betDecreaseXOrigin,betDecreaseYOrigin)
}

function resetBoard() {
}

function resetGame() {
    //clear title
    new Align(gameTitle).set(1,1,0)
    new Align(famousTitle).set(1,1,0)
    new Align(rules).set(1,1,0)
    new Align(betIncrease).set(1,1,0)
    new Align(betDecrease).set(1,1,0)
    new Align(hitButton).set(hitButtonXOrigin,hitButtonYOrigin)
    new Align(stayButton).set(stayButtonXOrigin,stayButtonYOrigin)
    removeDealerCards();
    removePlayerCards();
    resetDeck(); //possibly change later so deck is continuous 
    isGameOver = false;
    dealerFirstCard = true;
    messageDisplay._components[2].setContent("Hit or Stay?");
    dealerHand = [];

    dealGame();
}

new DOMElement(dealer, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src', './images/cards/playing-card-back.png');

dealer
    // responsive proportional size
    .setProportionalSize(0.08, 0.2)
    // align first card
    .setAlign(.875, 0.4)
    // not exact center to prevent from falling off screen
    .setMountPoint(0, 0.5)
// logo.requestUpdate(spinner);
new DOMElement(leftSidePanel, {
    properties: {
        'background-color': '#590202',
        'bottom-border': 'solid black 1px',
        zIndex: 5
    }
});
new DOMElement(table, {
    properties: {
        'background-color': '#355934',
        'bottom-border': 'solid black 1px',
        zIndex: 5
    }
});
new DOMElement(deck, {
    properties: {
        'background-color': '#730202'
    }
});
new DOMElement(dealButton, {
    content: "Deal",
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#F2F2F2',
        'font-size': '1.8rem',
        'border': 'solid #F2F2F2 5px',
        'cursor': 'pointer',
        zIndex: 15
    }
});

// new DOMElement(resetButton, {
//     content: "Reset Deck",
//     properties: {
//         'background-color': '#0D0D0D',
//         'text-align': 'center',
//         'padding-top': '1%',
//         'padding-bottom': '1%',
//         'color': '#F2F2F2',
//         'font-size': '1.2rem',
//         'border': 'solid #F2F2F2 2px',
//         'cursor': 'pointer',
//         zIndex: 15
//     }
// });

new DOMElement(hitButton, {
    content: "Hit",
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#F2F2F2',
        'font-size': '1.7rem',
        'border': 'solid #F2F2F2 3px',
        'cursor': 'pointer',
        zIndex: 15
    }
});

new DOMElement(stayButton, {
    content: "Stay",
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#F2F2F2', 
        'font-size': '1.7rem',
        'border': 'solid #F2F2F2 3px',
        'cursor': 'pointer',
        zIndex: 15
    }
});

hitButton.addUIEvent('click');
stayButton.addUIEvent('click');
dealButton.addUIEvent('click');
// resetButton.addUIEvent('click');

new DOMElement(currentCash, {
    content: '$' + playerCash,
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#447343',
        'border': 'solid #F2F2F2 3px',
        'font-size': '2em',
        zIndex: 15
    }
});

new DOMElement(messageDisplay, {
    content: "Click Deal",
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#614BF2',
        'border': 'solid #F2F2F2 2px',
        'font-size': '2rem',
        zIndex: 15
    }
});

new DOMElement(signature, {
    content: "Sam David 2015 ©",
    properties: {
        'color': '#614BF2',
        'font-size': '.8rem',
        zIndex: 15
    }
});

signature.addUIEvent('click')

messageDisplay.setProportionalSize(.2,.1).setAlign(0,.3)
currentCash.setProportionalSize(.2,.1).setAlign(0,.65);
hitButton.setProportionalSize(.1,.1).setAlign(1,1);
stayButton.setProportionalSize(.1,.1).setAlign(1,1);
resetButton.setProportionalSize(.1,.1).setAlign(.1,0);
dealButton.setProportionalSize(.2,.1)
deck.setProportionalSize(.2,.4).setAlign(.8,.2);
table.setProportionalSize(.8,.95).setAlign(.2,0);
leftSidePanel.setProportionalSize(0.2, 0.95)
signature.setAlign(.9,.965);
