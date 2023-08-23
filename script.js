        // Dark mode toggle functionality
        const darkModeToggle = document.getElementById("darkModeToggle");
        const body = document.body;
        const darkModeLabel = document.querySelector(".dark-mode-label");


        darkModeToggle.addEventListener("change", () => {
            body.classList.toggle("dark-mode", darkModeToggle.checked);

            // Toggle icons
            if (darkModeToggle.checked) {
                darkModeLabel.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            } else {
                darkModeLabel.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            }
        });

        let music = new Audio("music/music.mp3")
        let audioTurn = new Audio("music/ting.mp3")
        let gameover = new Audio("music/gameover.mp3")
        const cells = document.querySelectorAll(".cell");
        const statusText = document.querySelector("#statusText");
        const restartBtn = document.querySelector("#restartBtn");

        const winConditions = [  // creating a list of conditions in the box
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let options = ["", "", "", "", "", "", "", "", ""]; 
        let currentPlayer = "X";
        let running = false;

        initializeGame(); //game begins
        music.play();

        function initializeGame() {
            cells.forEach(cell => cell.addEventListener("click", cellClicked)); //adding event listener for each cell
            restartBtn.addEventListener("click", restartGame);
            statusText.textContent = `${currentPlayer}'s turn`; //updating status text 
            running = true; //started running
            music.play();
        }

        function cellClicked() {
            const cellIndex = this.getAttribute("cellIndex"); // getting the cell index
            audioTurn.play();
            if (options[cellIndex] != "" || !running) { //checking if our options with cellIndex are not empty or game not running return
                return;
            }

            updateCell(this, cellIndex); //updating 
            checkWinner(); //finding winner
        }

        function updateCell(cell, index) {
            options[index] = currentPlayer; //updating placeholder's
            cell.textContent = currentPlayer;
        }

        function changePlayer() {
            currentPlayer = (currentPlayer == "X") ? "O" : "X"; // if currentPlayer is "X" then assign it to "O" else X; 
            statusText.textContent = `${currentPlayer}'s turn`; // update statustext
        }

        function checkWinner() {
            let roundWon = false;

            for (let i = 0; i < winConditions.length; i++) { //iterate through all the winconditions array
                const condition = winConditions[i];
                const cellA = options[condition[0]]; //each row has 3 indeces
                const cellB = options[condition[1]];
                const cellC = options[condition[2]];

                if (cellA == "" || cellB == "" || cellC == "") { //check if the condition is empty or not 
                    continue;
                }

                if (cellA == cellB && cellB == cellC) { //check the cell's and updating the winner 
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) { //update winner
                statusText.textContent = `${currentPlayer} wins!`;
                running = false; // stopping the running
                audioTurn.pause();
                music.pause();
                gameover.play();
                document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            }
            else if (!options.includes("")) {
                statusText.textContent = `Draw!`; // if no one won it will be a tie!
                running = false;
                music.pause();
            }
            else {
                changePlayer();
            }
        }

        function restartGame() {
            currentPlayer = "X";
            options = ["", "", "", "", "", "", "", "", ""];
            statusText.textContent = `${currentPlayer}'s turn`;
            cells.forEach(cell => cell.textContent = "");
            running = true;
            music.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0";
        }