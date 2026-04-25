
class MemoryGame{

card:HTMLCollectionOf<HTMLElement>;
score:HTMLElement;
array:HTMLElement[]=[];
Scorecount:number=0
lockboard:boolean=false;
flipSound = new Audio("Sounds/freesound_community-flipcard-91468.mp3");
matchSound = new Audio("Sounds/freesound_community-correct-83487.mp3");
wrongSound = new Audio("Sounds/eritnhut1992-buzzer-or-wrong-answer-20582.mp3");
winSound = new Audio("Sounds/yoursperfectguy-sci-fi-congratulations-message-notification-sound-sfx-334728.mp3");

constructor(){
    this.card= document.getElementsByClassName('card') as HTMLCollectionOf<HTMLElement>;
    this.score=document.getElementById("score") as HTMLElement
        //  this.shuffleCards(); 
       this.Start();
   
  
}

 Start(){
    
           for(let i=0;i<this.card.length;i++){
                                this.card[i].addEventListener('click',(e)=>{
                                    // console.log(this.card);
                                    
                                     this.CardFunctionality(e.currentTarget as HTMLElement);

           });
 }
}

CardFunctionality(card: HTMLElement){

      if(this.lockboard)
                return;
             
            
               if (card.classList.contains("flipped")) return;

           
               this.flipSound.play();
               card.classList.add("flipped");
              
              this.array.push(card);
               
                if(this.array.length==2){
                      if((this.array[0].firstElementChild as HTMLImageElement).src==(this.array[1].firstElementChild as HTMLImageElement).src){
                      this.array.length=0;
                      this.Scorecount+=10;
                      this.matchSound.play();
                       //  check win after match
                    if (this.checkGamefinished()) 
                            this.showWin();
                                                
                }
                else{
                   this. lockboard=true;
                   this.wrongSound.play();
                   setTimeout(()=>{
                    this.array[0].classList.remove("flipped");
                    this.array[1].classList.remove("flipped");
                        this.array.length=0; 
                        this.lockboard=false;
                        
                    },1000)
                    if(this.Scorecount>0){
                         this.Scorecount-=2;
                    }
                 
               
                }
              
               
            }
           this.updatescore();
}
checkGamefinished():boolean{
    for(let i=0;i<this.card.length;i++){
         if(!this.card[i].classList.contains("flipped")){
                    return false;
         }
    }
    return true;
}
updatescore(){
 this.score.innerText=String(this.Scorecount)
}

showWin() {
  const winScreen = document.getElementById("win-screen")!;
  const finalScore = document.getElementById("final-score")!;
   const playAgain = document.getElementById("play-again")!;
  this.winSound.play();
  finalScore.innerText = String(this.Scorecount);
  winScreen.classList.remove("hidden");
  playAgain.addEventListener('click',()=>{
  winScreen.classList.add("hidden");
    this.resetGame();
  })

}

resetGame() {
  this.Scorecount = 0;
  this.array = [];
  this.lockboard = false;

  this.updatescore();

  for (let i = 0; i < this.card.length; i++) {
    this.card[i].classList.remove("flipped");
  }

  this.shuffleCards();
}

shuffleCards() {
  const parent = this.card[0].parentElement;

  const cardsArray = Array.from(this.card);

  cardsArray.sort(() => Math.random() - 0.5);

  cardsArray.forEach(card => {
    parent?.appendChild(card);
  });
}
}


new MemoryGame();


           
             


