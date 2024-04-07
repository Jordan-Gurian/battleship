export default function events(myInterface) {
    const newGameButton = document.querySelector('.new-game');
    newGameButton.addEventListener('click', () => {
        const gameOver = document.querySelector('.game-over');
        gameOver.textContent = '';
        myInterface.interfaceSetUp();
    })
}