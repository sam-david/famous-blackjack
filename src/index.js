'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var Underscore = require('underscore');
var FamousEngine = require('famous/core/FamousEngine');

FamousEngine.init();

// Initialize with a scene; then, add a 'node' to the scene root
// Add elements into the scene as children of the scene
var blackjackApp = FamousEngine.createScene().addChild();
console.log("blackjackApp",blackjackApp)
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
            console.log("Hit the player");
            playerHit();
        } else if (buttonContent == "Stay") {
            console.log("Player stays")
        } else if (buttonContent == "Deal") {
            console.log("dealing cards now")
        } else if (buttonContent == "Reset") {
            console.log("resetting game")
        } 
        console.log(payload.node);
    }
};

var deckArray = [];
var dealerHand = [];
var playerHand = [];

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

function Card(value,suit,face) {
    this.value = value;
    this.suit = suit;
    this.face = face;
}

createDeckArray();

console.log("create deck array", deckArray)
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
var currentCash = blackjackApp.addChild();
var dealerLeftAlign = .22;
var playerLeftAlign = .22;
var cardZIndex = 10;
var cardXSize = .08;
var cardYSize = .2;
var dealerFirstCard = true;

function shuffleDeck(deck) {
    return Underscore.shuffle(deck); 
}

function dealLastCard(deck) {
    return deck.pop();
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
}
dealGame();

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

function viewDealerCard(node) {
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
    .setAttribute('src', './images/cards/playing-card-back.png');
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
    playerLeftAlign += .1;
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

function playerHit() {
    playerHand.push(dealLastCard(deckArray));
    var lastIndex = playerHand.length - 1;
    console.log(deckArray,"last card", playerHand[lastIndex])
    viewPlayerCard(blackjackApp, playerHand[lastIndex]);
    if (handTotalValue(playerHand) > 21) {
        console.log("BUST!")
    }
    console.log("total value",handTotalValue(playerHand));
}

viewDealerCard(blackjackApp);

new DOMElement(dealerCard1, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src', './images/cards/queen_of_hearts2.svg');

dealerCard1
    // responsive proportional size
    .setProportionalSize(0.2, 0.2)
    // align first card
    .setAlign(.2, 0.2)
    // not exact center to prevent from falling off screen
    .setMountPoint(0, 0.5)

console.log(dealerCard1);
new DOMElement(dealerCard2, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/queen_of_spades2.svg')
    dealerCard2
    .setProportionalSize(0.2, 0.2)
    .setAlign(0.30, 0.2)
    .setMountPoint(0, 0.5)

new DOMElement(dealerCard3, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/queen_of_spades2.svg')
    dealerCard3
    .setProportionalSize(0.2, 0.2)
    .setAlign(0.40, 0.2)
    .setMountPoint(0, 0.5)

new DOMElement(dealerCard4, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/queen_of_spades2.svg')
    dealerCard4
    .setProportionalSize(0.2, 0.2)
    .setAlign(0.50, 0.2)
    .setMountPoint(0, 0.5)

new DOMElement(dealerCard5, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/queen_of_spades2.svg')
    dealerCard5
    .setProportionalSize(0.2, 0.2)
    .setAlign(0.60, 0.2)
    .setMountPoint(0, 0.5);


new DOMElement(playerCard3, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/queen_of_spades2.svg')
    playerCard3
    .setProportionalSize(0.2, 0.2)
    .setAlign(0.40, 0.7)
    .setMountPoint(0, 0.5)
new DOMElement(playerCard4, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/playing-card-back.png')
    playerCard4
    .setProportionalSize(0.08, 0.2)
    .setAlign(0.50, 0.7)
    .setMountPoint(0, 0.5)
new DOMElement(playerCard5, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/png/PNG-cards-1.3/10_of_clubs.png')
    playerCard5
    .setProportionalSize(0.08, 0.2)
    .setAlign(0.60, 0.7)
    .setMountPoint(0, 0.5)

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
        'background-color': 'brown'
    }
});
new DOMElement(dealButton, {
    content: "Deal",
    properties: {
        'background-color': 'blue',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        zIndex: 15
    }
});

new DOMElement(resetButton, {
    content: "Reset",
    properties: {
        'background-color': 'blue',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
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
        'border': 'solid #F2F2F2 1px',
        zIndex: 15
    }
});

hitButton.addUIEvent('click');
// blackjackApp.prototype.onReceive = function onReceive (event, payload) {

//     // if the event is click then we know
//     // that a NavButton was clicked
//     // (NavButtons are the only element)
//     // With the click event.
//     if (event === 'click') {

//         // get the id of the nav button
//         var to = payload.node.getId();

//         console.log(to);
//     }
// };

new DOMElement(currentCash, {
    content: "$200",
    properties: {
        'background-color': '#0D0D0D',
        'text-align': 'center',
        'padding-top': '1%',
        'padding-bottom': '1%',
        'color': 'yellow',
        'border': 'solid #F2F2F2 1px',
        'font-size': '2em',
        zIndex: 15
    }
});

currentCash.setProportionalSize(.2,.1).setAlign(0,.5);
hitButton.setProportionalSize(.1,.05).setAlign(0,.85);
resetButton.setProportionalSize(.1,.05).setAlign(.1,0);
dealButton.setProportionalSize(.1,.05)
deck.setProportionalSize(.2,.4).setAlign(.8,.2);
table.setProportionalSize(.8,.9).setAlign(.2,0);
leftSidePanel.setProportionalSize(0.2, 0.9)
