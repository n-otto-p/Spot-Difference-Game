
let gameData = null;
fetch('config.json')
.then(response => 
    {
        if (!response.ok) 
            {
                throw new Error(`Failed to load JSON: ${response.status}`);
            }
        return response.json();
    })
.then(data => 
    {
        gameData = data; 
        initGame(); 
    })
.catch(error => 
    {
        console.error("Error loading JSON:", error);
        alert("Failed to load game configuration. Check the console for details.");
    });

const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");


let score = 0;
let foundDifferences = new Set();

function loadImages()
{
    const img1 = new Image();
    const img2 = new Image();

    img1.src = gameData.images.image1;
    img2.src = gameData.images.image2;

    img1.onload = () => 
        {
            canvas1.width = img1.width;
            canvas1.height = img1.height;
            ctx1.drawImage(img1, 0, 0, canvas1.width, canvas1.height);
        };

    img2.onload = () => 
        {
        canvas2.width = img2.width;
        canvas2.height = img2.height;
        ctx2.drawImage(img2, 0, 0, canvas2.width, canvas2.height);
        };
}

canvas1.addEventListener("click", (event) => {
    const rect = canvas1.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const tolerance = 10; 

    const hitIndex = gameData.differences.findIndex(diff =>
        x >= (diff.x - tolerance) && x <= (diff.x + diff.width + tolerance) &&
        y >= (diff.y - tolerance) && y <= (diff.y + diff.height + tolerance) &&
        !foundDifferences.has(diff) 
    );

    if (hitIndex !== -1) 
        {
            console.log("Difference found at:", gameData.differences[hitIndex]);
            const hit = gameData.differences[hitIndex];
            foundDifferences.add(hit);
            score++;

            ctx1.strokeStyle = "red";
            ctx1.lineWidth = 2;
            ctx1.strokeRect(hit.x, hit.y, hit.width, hit.height);

            ctx2.strokeStyle = "red";
            ctx2.lineWidth = 2;
            ctx2.strokeRect(hit.x, hit.y, hit.width, hit.height);

            scoreElement.textContent = `Score: ${score}`;

            if (score === gameData.differences.length) 
                {
                    alert("Congratulations! You've found all the differences!");
                }
        } 
    else 
        {
            const rect = canvas1.getBoundingClientRect(); // Get canvas position
            const x = event.clientX - rect.left; // X coordinate relative to the canvas
            const y = event.clientY - rect.top;  // Y coordinate relative to the canvas
            console.log("No difference here at : ", x," ",y);
        }
});
        
let timeLeft = 60;
function startTimer() 
    {
        const timerInterval = setInterval(() => 
        {
            if (timeLeft <= 0) 
                {
                    clearInterval(timerInterval);
                    alert("Time's up! Try again.");
                } 
            else 
                {
                    timeLeft--;
                    timerElement.textContent = `${timeLeft}s`;
                }
        }, 1000);
}

function initGame() {

    document.getElementById("game-title").textContent = gameData.gameTitle;
    loadImages();
    startTimer();
    scoreElement.textContent = `${score}`;
    timerElement.textContent = `${timeLeft}s`;
}

window.onload = initGame;
