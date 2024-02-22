document.addEventListener('DOMContentLoaded', function() {
    let squares = document.querySelectorAll('.square');
    let emptySquare = document.querySelector('.square[id="c16"]'); 
    let score = 0;
    let translatedSteps = '';

    //Перетасовает числа
    function shuffleNumbers() {
        let numbers = Array.from({length: 15}, (_, i) => i + 1);
        let shuffledNumbers = [];
        
        while (numbers.length > 0) {
            let index = Math.floor(Math.random() * numbers.length);
            shuffledNumbers.push(numbers[index]);
            numbers.splice(index, 1);
        }
        
        if (!isSolvable(shuffledNumbers)) {
            [shuffledNumbers[13], shuffledNumbers[14]] = [shuffledNumbers[14], shuffledNumbers[13]];
        }
        
        squares.forEach(function(square, index) {
            if (index < 15) {
                square.innerText = shuffledNumbers[index];
            }
        });

        checkWinCondition(); 
    }

    //Проверяет, решаема ли комбинация
    function isSolvable(numbers) {
        let inversions = 0;

        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] && numbers[j] && numbers[i] > numbers[j]) {
                    inversions++;
                }
            }
        }

        return inversions % 2 === 0;
    }

    shuffleNumbers();

    // Функция кликов по квадратикам
squares.forEach(function(square) {
    square.addEventListener('click', function() {
        let selectedSquare = this;
        let selectedSquareId = parseInt(selectedSquare.id.slice(1)); 
        let emptySquareId = parseInt(emptySquare.id.slice(1));

        let isNeighbor = Math.abs(selectedSquareId - emptySquareId) === 1 || Math.abs(selectedSquareId - emptySquareId) === 4;

        if (isNeighbor) {
            let selectedSquareText = selectedSquare.innerText;
            emptySquare.innerText = selectedSquareText;
            selectedSquare.innerText = '';
            emptySquare.classList.remove('highlight');
            selectedSquare.classList.add('highlight');
            emptySquare = selectedSquare;

            score++; // Увеличиваем счёт только при перемещении числа

            updateStepsLabel(); // Обновляем отображение количества шагов
        }

        checkWinCondition();
    });
});

    // Обновление текстового содержания для отображения количества шагов
    function updateStepsLabel() {
        document.getElementById("score").innerText = translatedSteps ? translatedSteps : "Steps: " + score;
    }

    //Проверка на победу
    function checkWinCondition() {
        let isWin = true;
        squares.forEach((square, index) => {
            if (index < 15) {
                if (parseInt(square.innerText) !== index + 1) {
                    isWin = false;
                }
            }
        });
    
        if (isWin) {
            console.log("You won!");
            document.getElementById("winMessage").classList.remove("hidden");
        }
    }

    //Кнопка "Restart" перезапускает игру
    document.getElementById("Restart").onclick = function(){
        window.parent.location = window.parent.location.href;
    };
});
