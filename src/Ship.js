export default function Ship(length) {
    if (length > 5) { 
        this.length = 5;
    }

    if (length < 2) {
        this.length = 2;
    }
    
    const hit = function() {
        if (!this.isSunk()) {
            this.numHits += 1;
        }
    }

    const isSunk = function() {
        if (this.numHits >= this.length) {
            return true;
        }
        return false;
    }

    return { length, numHits: 0, hit, isSunk }
}