const worldElement = document.querySelector('#word');
const wrongLettersElement = document.querySelector('#wrong-letters');
const playAgainBtn = document.querySelector('#play-button');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const finalMessage = document.querySelector('#final-message');

const winElement = document.querySelector('#win-count');
const looseElement = document.querySelector('#loose-count');
const figureParts = document.querySelectorAll('.figure-part');

const word = ['application', 'programming', 'interface', 'wizard', 'interface', 'application', 'inheritance', 'orientation', 'flawless', 'conspiracy'];

let selectedWord = word[Math.floor(Math.random() * word.length)];

let winCount = localStorage.getItem('winCount');
let looseCount = localStorage.getItem('looseCount');

const correctLetters = [];
const wrongLetters = [];
let letter = '';
//Show the hidden word
function displayWord()
{
    
   
    worldElement.innerHTML =  `
   ${selectedWord
    .split('').
    map(
        letter =>`
       <span class="letter">
       ${correctLetters.includes(letter) ? letter : ''}
       </span>
       `
       )
       .join('')}
       
    `;

    const innerWord = worldElement.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord)
    {
        winCount =  parseInt(localStorage.getItem('winCount')) ;
        localStorage.setItem('winCount', winCount + 1);
        finalMessage.innerText = 'Congratulation! you won! :)'
        popup.style.display='flex';
        displayStat();
    }


}

//Update th wrong letters
function updateWrongLetterElement()
{

    //Display wrong letters
   wrongLettersElement.innerHTML = `
     ${wrongLetters.length > 0 ? '<p>Wrong Letters</p>' : ''}
     ${wrongLetters.map( letter => `<span>${letter}</span>`)}
   `;

   //Display parts
   figureParts.forEach((part,index) =>
   {
       const error = wrongLetters.length;

       if(index < error)
       {
           part.style.display='block';
       }
       else
       {
           part.style.display='none';
       }
   });

   //Check if lost
   if(wrongLetters.length == figureParts.length)
   {
       looseCount = parseInt(localStorage.getItem('looseCount'));
       localStorage.setItem('looseCount', looseCount + 1);
       finalMessage.innerText='Unfortunately you have lost. :(';
       popup.style.display='flex';
       displayStat();
   }
   
}

//Show Notification
function showNotification()
{
    notification.classList.add('show');
    setTimeout(() =>
    {
        notification.classList.remove  ('show');
    }, 2000);
}

// Keydown letter space 
window.addEventListener('keydown' , e =>
{
    if(e.keyCode >= 65 && e.keyCode<= 90)
    {
        const letter = e.key;

        if(selectedWord.includes(letter))
        {
            if(!correctLetters.includes(letter))
            {
                correctLetters.push(letter);

                displayWord();
            }
            else
            {
                showNotification();
            }
        }
        else
        {
            if(!wrongLetters.includes(letter))
            {
                wrongLetters.push(letter);

                updateWrongLetterElement();
            }
            else
            {
                showNotification();
            }
        }

    }
});

function displayStat()
{
    winElement.innerText=localStorage.getItem('winCount');
    looseElement.innerText=localStorage.getItem('looseCount');
}

//Restart the game - Play Again button
playAgainBtn.addEventListener('click' , () =>
{
    //Empty arrays
   wrongLetters.splice(0);
   correctLetters.splice(0);

  selectedWord = word[Math.floor(Math.random() * word.length)];
   displayStat();
   displayWord();

   updateWrongLetterElement();
   popup.style.display='none';
});
displayStat();
displayWord();

