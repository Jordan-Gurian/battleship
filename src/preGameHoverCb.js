export default function preGameHoverCb(currentPlayer, box, i, shipDir) {
    if (!currentPlayer.isComputer) {
        const shipInds = [];
        for (let j = 0; j < currentPlayer.shipLen[0]; j++) {
            if (shipDir === 'horz') {
                shipInds.push(i + j);
            } else {
                shipInds.push(i + (10 * j));
                box[i + (10 * j)].classList.add('fake-hover');
            }
        }
        for (let j = 0; j < box.length; j++) {
            if (shipInds.includes(j)) {
                box[j].classList.add('fake-hover');
            } else {
                box[j].classList.remove('fake-hover');
            }
        }
    }
}