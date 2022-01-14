class Quiz {
  constructor(){
    this.title = createElement('h1');
    //this.player = createElement('h2');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
    question.hide();

    //escribe aquí el código para cambiar el color de fondo
    background("yellow");

    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
    this.title.html("Resultado del Cuestionario");
    this.title.position(270, 0);

    //llama aquí a getContestantInfo( )
    Contestant.getPlayerInfo();

    //escribe la condición para comprobar si contestantInfor no está indefinido 
    if(allContestants !== undefined){
      //escribe aquí el código para agregar una nota
      fill("blue");
      textSize(20);
      text("*Nota: ¡El concursante que respondió correctamente, está resaltado en color verde!", 60, 230);
      var disPos = 230;

      //escribe el código para resaltar al concursante que respondió correctamente
      for(var plr in allContestants){
        var correctAnswer = "2";
        if(correctAnswer === allContestants[plr].answer){
          fill("green");
        }
        else{
          fill("red");
        }

        disPos += 30;
        textSize(20);
        text(allContestants[plr].name +  ": " + allContestants[plr].answer, 200, disPos);
       
      }

    }
    
  }

}
