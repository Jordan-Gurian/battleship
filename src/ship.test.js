import Ship from './Ship';


test('has expected properties', () => {
    const myShip = Ship(5);
    expect(myShip).toHaveProperty('length');
    expect(myShip).toHaveProperty('numHits');
});


test('hit function increments', () => {
    const myShip = Ship(5);
    myShip.hit();
    myShip.hit();
    expect(myShip).toMatchObject({ numHits: 2 });
});

test('hit function does not exceed length', () => {
    const myShip = Ship(2);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip).toMatchObject({ numHits: 2 });
});

test('sunk works', () => {
    const myShip = Ship(2);
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
});
