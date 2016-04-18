var gameStart;
var position = 1;
var specialBubble;
var bubblesInterval;

function getPositionElement(){
  return($('#position' + position))
}

function keyCodeToPosition(code){
  var pos;
  switch(code) {
    case 65: pos = 1; break;
    case 90: pos = 2; break;
    case 69: pos = 3; break;
    case 73: pos = 4; break;
    case 79: pos = 5; break;
    case 80: pos = 6; break;
    default: pos = null;
  }
  return(pos);
}

function positionTransfer(newPos){
  leavePosition(position);
  position = newPos;
  goToPosition(position);
}

function goToPosition(pos){
  var positionElement = $('#position' + pos);
  positionElement.addClass('background-red');
  positionElement.removeClass('background-green');
}

function leavePosition(pos){
  var positionElement = $('#position' + pos);
  positionElement.removeClass('background-red');
  positionElement.addClass('background-green');
}

function launchNewBubble(){
  var newBubble = new Bubble();
  newBubble.launch();
  setupCollisionController(newBubble);
}

function centerCoordinates(div){
  var offset = div.offset();
  var x = offset.left + div.width()/2;
  var y = offset.top + div.height()/2;
  return([x, y]);
}

function setupCollisionController(bubble){
  function checkCollision(){
    var positionElement = getPositionElement();
    var bubbleElement = bubble.domElement();
    if(bubbleElement[0]){
      var xPosition, yPosition, xBubble, yBubble;

      [xPosition, yPosition] = centerCoordinates(positionElement);
      [xBubble, yBubble] = centerCoordinates(bubbleElement);

      var squaredDistance = Math.pow(yPosition - yBubble, 2) + Math.pow(xPosition - xBubble, 2);
      var radiusSum = bubble.radius + positionElement.height()/2;

      if(squaredDistance < Math.pow(radiusSum, 2)){
        $(document).trigger('collision');
      }
    }
  }

  var collisionInterval = setInterval(checkCollision, 25);
  setTimeout(function(){clearInterval(collisionInterval);}, bubble.lifespan * 1000 - 100);
}


function launchBubbles(){
  bubblesInterval = setInterval(launchNewBubble, 120);
}

function killAllBubbles(){
  $('.bubble').remove();
}

function stopLaunchingBubbles(){
  clearInterval(bubblesInterval);
}

function triggerCollision(){
  var secondsAlive = (new Date()).getTime() - gameStart;
  $('#game-over-text')[0].innerText = "GAME OVER... Score: " + secondsAlive;
  stopListeningToCollisions();
  stopLaunchingBubbles();
  $('#game-over').removeClass('hidden');
}

function resetGame(){
  gameStart = (new Date()).getTime();
  killAllBubbles();
  $('#game-over').addClass('hidden');
  launchBubbles();
  listenToCollisions();
}

function listenToCollisions(){
  $(document).on('collision', function(){
    triggerCollision();
  });
}

function stopListeningToCollisions(){
  $(document).off('collision');
}

$(document).ready(function(){
  var bubbles = $('#bubbles');

  goToPosition(position);
  listenToCollisions();

  $(document).keydown(function(event){
    var code = event.keyCode || event.which;
    var newPos = keyCodeToPosition(code);
    if(newPos){
      positionTransfer(newPos);
    }
  });

  $('#game-over').on('click', function(){
    resetGame();
  });

  resetGame();

  //specialBubble = new Bubble();
  //specialBubble.launch();

  //launchNewBubble();
  //launchNewBubble();
  //launchNewBubble();

});
