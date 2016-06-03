$(document).ready(function(){   //1. document ready
  //1.1. Define global variables
  var boxes = $("td");
  var turnText = $(".playerTurn");
  var turnCounter = 0;
  var OMoves = [];
  var XMoves = [];
  var winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];
//1.2. Reset Board function must be defined
  var resetBoard = function () {
    boxes.each(function(){
      $(this).text("").attr("class", "");
    });
    turnText.text("It is X's turn");
    turnCounter = 1;
    OMoves = [];   //clearing the O & X on the box and making it empty
    XMoves = [];   //clearing the O & X on the box and making it empty
  };
//1.3. Game must check for a winner
  var checkForWin = function (movesArray, name) {
    for (var i=0; i < winningCombinations.length; i++) {
      var winCounter = 0;
      for (var j=0; j < winningCombinations[i].length; j++) {
        if(movesArray.indexOf(winningCombinations[i][j]) !== -1){
          winCounter++;
        }
        if(winCounter === 3){
          alert("Game over, " + name + " wins!");
          resetBoard();
        }
      }
    }
  };

  var addXorO = function (e) {
    var elem = $(this);

    if (elem.text().length === 0){
      if (turnCounter % 2 === 0){
        XMoves.push(parseInt(elem.data("num")));
        elem.text("X").addClass("X");
        turnText.text("It is O's turn");
        turnCounter++;
        checkForWin(XMoves, "X");
      } else {
        OMoves.push(parseInt(elem.data("num"))); // Flip whatever was written on the if statement.
        elem.text("O").addClass("O");
        turnText.text("It is X's turn");
        turnCounter++;
        checkForWin(OMoves, "O");
      }
    }

    if (turnCounter > 9){
      turnText.text("Game Over!");
      var conf = confirm("It's a draw, do you want to play again?");
      if (conf){
        resetBoard();
      }
    }
  };

  var addXandOListener = function () {
    boxes.each(function(){
      $(this).on("click", addXorO);
    });
  };

  var addResetListener = function () {
    $("#reset").on("click", resetBoard);
  };

  var start = function () {
    addXandOListener();
    addResetListener();
  };

  start();
});