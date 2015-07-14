'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var Underscore = require('underscore');
var FamousEngine = require('famous/core/FamousEngine');

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
        console.log(payload.node._components[2]._content)
        if (buttonContent == "Hit") {
            playerHit();
        } else if (buttonContent == "Stay") {
            console.log("Player stays")
            playerStay();
        } else if (buttonContent == "Deal") {
            console.log("dealing cards now")
        } else if (buttonContent == "Reset") {
            console.log("resetting game")
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
var stayButton = blackjackApp.addChild();
var currentCash = blackjackApp.addChild();
var messageDisplay = blackjackApp.addChild();
var signature = blackjackApp.addChild();
var dealerLeftAlign = .22;
var playerLeftAlign = .22;
var cardZIndex = 10;
var cardXSize = .08;
var cardYSize = .2;

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
createDeckArray();
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
    // var oneIndex = aceIndex(dealerHand);
    // if (oneIndex != 0) {dealerHand[oneIndex].value = 11;console.log("soft")}
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
    console.log("Low:",lowValue,"High:",highValue)
    if (lowValue <= 21 && highValue > 21) {
        return lowValue
    } else {
        return highValue;
    }
}

function dealGame() {
    console.log(deckArray)
    deckArray = shuffleDeck(deckArray);
    console.log(deckArray)
    // deal out initial 2 cards

    dealerHand.push(dealLastCard(deckArray))
    playerHand.push(dealLastCard(deckArray))
    dealerHand.push(dealLastCard(deckArray))
    playerHand.push(dealLastCard(deckArray))

    viewPlayerCard(blackjackApp, playerHand[0])
    viewPlayerCard(blackjackApp, playerHand[1])
    viewDealerCard(blackjackApp);
}
dealGame();

function viewDealerCard(node,revealAll) {
    var imgSrc = './images/cards/playing-card-back.png';
    for (var d=0;d<dealerHand.length;d++) {
        if (revealAll == true) {
            imgSrc = './images/cards/' + constructImageName(dealerHand[d]);
        } else {
            if (dealerFirstCard == true) {
                imgSrc = './images/cards/' + constructImageName(dealerHand[d]);
                dealerFirstCard = false;
            } else {
                imgSrc = './images/cards/playing-card-back.png';
            }
        }
        var dealerCard = node.addChild()
            .setProportionalSize(cardXSize, cardYSize)
            .setAlign(dealerLeftAlign, 0.2)
            .setMountPoint(0, 0.5);
        new DOMElement(dealerCard, {
        tagName: 'img',
        properties: {
            zIndex: cardZIndex
        }
        })
        .setAttribute('src', imgSrc);
        dealerNodes.push(dealerCard);
        dealerLeftAlign += .1;
    }
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
    viewDealerCard(blackjackApp, false)
    if (handTotalValue(dealerHand) > 21) {
        console.log("DEALER BUST");
        gameOver("dealer bust");
        isGameOver = true;
    }
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

function removeDealerCards() {
    for (var i=0;i<dealerNodes.length;i++) {
        for (var c=0;c<blackjackApp._children.length;c++) {
            if (cardNodesEqual(blackjackApp._children[c], dealerNodes[i])) {
                blackjackApp.removeChild(blackjackApp._children[c])
                dealerNodes.splice(i,1)
            }
        }
    }
    dealerLeftAlign = .22;
}

function revealDealerCards() {
    removeDealerCards();
    viewDealerCard(blackjackApp,true)
}

function playerHit() {
    // check if game is over, disabling button
    if (isGameOver == false) {
        playerHand.push(dealLastCard(deckArray));
        var lastIndex = playerHand.length - 1;
        viewPlayerCard(blackjackApp, playerHand[lastIndex]);
        if (handTotalValue(playerHand) > 21) {
            console.log("BUST!")
            gameOver("player bust");
            isGameOver = true;
        }
        console.log("total value",handTotalValue(playerHand));
    }
}

function viewPlayerCard(node,card) {
    console.log(card);
    var imgSrc = './images/cards/' + constructImageName(card);
    console.log(imgSrc);
    var playerCard = node.addChild()
        .setProportionalSize(cardXSize, cardYSize)
        .setAlign(playerLeftAlign, 0.7)
        .setMountPoint(0, 0.5);
    new DOMElement(playerCard, {
    tagName: 'img',
    properties: {
        zIndex: cardZIndex
    }
    })
    .setAttribute('src', imgSrc);
    playerNodes.push(playerCard);
    playerLeftAlign += .1;
    console.log("blackjackApp:check nodes",blackjackApp, playerCard, playerNodes);
}

function playerStay() {
    dealerSequence();
    revealDealerCards();
    if (isGameOver != true) {
        if (handTotalValue(dealerHand) > handTotalValue(playerHand)) {
            console.log(handTotalValue(dealerHand),handTotalValue(playerHand))
            gameOver("dealer wins");
        } else if (handTotalValue(dealerHand) < handTotalValue(playerHand)) {
            console.log(handTotalValue(dealerHand),handTotalValue(playerHand))
            gameOver("player wins");
        } else {
            gameOver("push");
        }
    }
}

function gameOver(result) {
    if (result == "player bust") {
        playerCash -= currentBet;
        resetBoard();
        currentCash._components[2].setContent('$' + playerCash);
        messageDisplay._components[2].setContent("Player Bust");
        // clear card nodes
    } else if (result == "dealer bust") {
        messageDisplay._components[2].setContent("Dealer Bust");
        playerCash += currentBet;
        currentCash._components[2].setContent('$' + playerCash);
        resetBoard();
    } else if (result == "player wins") {
        messageDisplay._components[2].setContent("Player Wins");
    } else if (result == "dealer wins") {
        messageDisplay._components[2].setContent("Dealer Wins");
    } else if (result == "push") {
        messageDisplay._components[2].setContent("Push");
    }
}

function resetBoard() {
    console.log("blackjack children",blackjackApp.children)
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
        'background-color': '#590202'
    }
});
new DOMElement(table, {
    properties: {
        'background-color': '#355934'
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
        'font-size': '1.2rem',
        'border': 'solid #F2F2F2 2px',
        'cursor': 'pointer',
        zIndex: 15
    }
});

new DOMElement(resetButton, {
    content: "Reset Deck",
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#F2F2F2',
        'font-size': '1.2rem',
        'border': 'solid #F2F2F2 2px',
        'cursor': 'pointer',
        zIndex: 15
    }
});

new DOMElement(hitButton, {
    content: "Hit",
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#F2F2F2',
        'font-size': '1.2rem',
        'border': 'solid #F2F2F2 2px',
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
        'font-size': '1.2rem',
        'border': 'solid #F2F2F2 2px',
        'cursor': 'pointer',
        zIndex: 15
    }
});

hitButton.addUIEvent('click');
stayButton.addUIEvent('click');

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
    content: "Test",
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': '#447343',
        'border': 'solid #F2F2F2 3px',
        'font-size': '2rem',
        zIndex: 15
    }
});

new DOMElement(signature, {
    content: "Sam David 2015",
    properties: {
        'color': 'red',
        'font-size': '.8rem',
        zIndex: 15
    }
});

messageDisplay.setProportionalSize(.2,.1).setAlign(0,.4)
currentCash.setProportionalSize(.2,.1).setAlign(0,.6);
hitButton.setProportionalSize(.1,.1).setAlign(0,.80);
signature.setAlign(.9,.93);
stayButton.setProportionalSize(.1,.1).setAlign(.1,.8);
resetButton.setProportionalSize(.1,.1).setAlign(.1,0);
dealButton.setProportionalSize(.1,.1)
deck.setProportionalSize(.2,.4).setAlign(.8,.2);
table.setProportionalSize(.8,.9).setAlign(.2,0);
leftSidePanel.setProportionalSize(0.2, 0.9)
