const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let item of this.items) {
                console.log(`${item.name}`);
            }
        }
    }

    takeItem(itemName) {
        const item = this.currentRoom.getItemByName(itemName);
        if (item) {
            this.currentRoom.items = this.currentRoom.items.filter(i => i !== item);
            this.items.push(item);
            console.log(`You picked up ${itemName}.`);
        } else {
            console.log(`${itemName} is not in this room.`);
        }
    }

    dropItem(itemName) {
        const item = this.getItemByName(itemName);
        if (item) {
            this.items = this.items.filter(i => i !== item);
            this.currentRoom.items.push(item);
            console.log(`You dropped ${itemName}.`);
        } else {
            console.log(`You don't have ${itemName}.`);
        }
    }

    eatItem(itemName) {
        const item = this.getItemByName(itemName);
        if (item && item instanceof Food) {
            this.items = this.items.filter(i => i !== item);
            console.log(`You ate the ${itemName}`);
        } else {
            console.log(`You can't eat ${itemName}`);
        }
    }

    getItemByName(name) {
        return this.items.find(item => item.name === name);
    }
}

module.exports = {
  Player,
};
