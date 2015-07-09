'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');

// Boilerplate code to make your life easier
FamousEngine.init();

// Initialize with a scene; then, add a 'node' to the scene root
// Add elements into the scene as children of the scene
var scene = FamousEngine.createScene();
var dealerCard1 = scene.addChild();
var dealerCard2 = scene.addChild();
var dealerCard3 = scene.addChild();
var dealerCard4 = scene.addChild();
var dealerCard5 = scene.addChild();
var playerCard1 = scene.addChild();
var playerCard2 = scene.addChild();
var playerCard3 = scene.addChild();
var playerCard4 = scene.addChild();
var playerCard5 = scene.addChild();
var dealer = scene.addChild();
var leftSidePanel = scene.addChild();
var table = scene.addChild();
var deck = scene.addChild();
var button = scene.addChild();
var resetButton = scene.addChild();
var hitButton = scene.addChild();
var currentCash = scene.addChild();


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

new DOMElement(playerCard1, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/queen_of_spades2.svg')
    playerCard1
    .setProportionalSize(0.2, 0.2)
    .setAlign(0.20, 0.7)
    .setMountPoint(0, 0.5);
new DOMElement(playerCard2, {
    tagName: 'img',
    properties: {
        zIndex: 10
    }
    })
    .setAttribute('src','./images/cards/queen_of_spades2.svg')
    playerCard2
    .setProportionalSize(0.2, 0.2)
    .setAlign(0.30, 0.7)
    .setMountPoint(0, 0.5)
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
new DOMElement(button, {
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
button.setProportionalSize(.1,.05)
deck.setProportionalSize(.2,.4).setAlign(.8,.2);
table.setProportionalSize(.8,.9).setAlign(.2,0);
leftSidePanel.setProportionalSize(0.2, 0.9)
console.log(table.getZ(),dealerCard1.getZ())