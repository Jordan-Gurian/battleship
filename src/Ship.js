export default function Ship(length) {
    const hit = function() {
        this.numHits += 1;
    }

    const isSunk = function() {
        if (this.numHits >= this.length) {
            return true;
        }
        return false;
    }

    return { length, numHits: 0, hit, isSunk }
}