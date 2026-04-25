var MemoryGame = /** @class */ (function () {
    function MemoryGame() {
        this.array = [];
        this.Scorecount = 0;
        this.lockboard = false;
        this.flipSound = new Audio("Sounds/freesound_community-flipcard-91468.mp3");
        this.matchSound = new Audio("Sounds/freesound_community-correct-83487.mp3");
        this.wrongSound = new Audio("Sounds/eritnhut1992-buzzer-or-wrong-answer-20582.mp3");
        this.winSound = new Audio("Sounds/yoursperfectguy-sci-fi-congratulations-message-notification-sound-sfx-334728.mp3");
        this.card = document.getElementsByClassName('card');
        this.score = document.getElementById("score");
        //  this.shuffleCards(); 
        this.Start();
    }
    MemoryGame.prototype.Start = function () {
        var _this = this;
        for (var i = 0; i < this.card.length; i++) {
            this.card[i].addEventListener('click', function (e) {
                // console.log(this.card);
                _this.CardFunctionality(e.currentTarget);
            });
        }
    };
    MemoryGame.prototype.CardFunctionality = function (card) {
        var _this = this;
        if (this.lockboard)
            return;
        if (card.classList.contains("flipped"))
            return;
        this.flipSound.play();
        card.classList.add("flipped");
        this.array.push(card);
        if (this.array.length == 2) {
            if (this.array[0].firstElementChild.src == this.array[1].firstElementChild.src) {
                this.array.length = 0;
                this.Scorecount += 10;
                this.matchSound.play();
                //  check win after match
                if (this.checkGamefinished())
                    this.showWin();
            }
            else {
                this.lockboard = true;
                this.wrongSound.play();
                setTimeout(function () {
                    _this.array[0].classList.remove("flipped");
                    _this.array[1].classList.remove("flipped");
                    _this.array.length = 0;
                    _this.lockboard = false;
                }, 1000);
                if (this.Scorecount > 0) {
                    this.Scorecount -= 2;
                }
            }
        }
        this.updatescore();
    };
    MemoryGame.prototype.checkGamefinished = function () {
        for (var i = 0; i < this.card.length; i++) {
            if (!this.card[i].classList.contains("flipped")) {
                return false;
            }
        }
        return true;
    };
    MemoryGame.prototype.updatescore = function () {
        this.score.innerText = String(this.Scorecount);
    };
    MemoryGame.prototype.showWin = function () {
        var _this = this;
        var winScreen = document.getElementById("win-screen");
        var finalScore = document.getElementById("final-score");
        var playAgain = document.getElementById("play-again");
        this.winSound.play();
        finalScore.innerText = String(this.Scorecount);
        winScreen.classList.remove("hidden");
        playAgain.addEventListener('click', function () {
            winScreen.classList.add("hidden");
            _this.resetGame();
        });
    };
    MemoryGame.prototype.resetGame = function () {
        this.Scorecount = 0;
        this.array = [];
        this.lockboard = false;
        this.updatescore();
        for (var i = 0; i < this.card.length; i++) {
            this.card[i].classList.remove("flipped");
        }
        this.shuffleCards();
    };
    MemoryGame.prototype.shuffleCards = function () {
        var parent = this.card[0].parentElement;
        var cardsArray = Array.from(this.card);
        cardsArray.sort(function () { return Math.random() - 0.5; });
        cardsArray.forEach(function (card) {
            parent === null || parent === void 0 ? void 0 : parent.appendChild(card);
        });
    };
    return MemoryGame;
}());
new MemoryGame();
