function Bubble(bubbleInitializer){
  bubbleInitializer = bubbleInitializer || {};

  var maxRadius = 20;
  var minRadius = 5;

  var maxLifespan = 20;
  var minLifespan = 3;

  var defaultColor = '#ffb200';

  function lifespan(radius){
    return((maxLifespan - minLifespan) * (radius - minRadius) / ( maxRadius - minRadius ) + minLifespan);
  }

  this.radius = bubbleInitializer.radius || minRadius + Math.random() * (maxRadius - minRadius);
  this.color = bubbleInitializer.color || defaultColor;
  this.lifespan = bubbleInitializer.lifespan || lifespan(this.radius);
  this.horizontalPosition = bubbleInitializer.horizontalPosition || Math.random() * window.innerWidth;

  this.id = guid();
  this.selector = '#' + this.id;

  this.domElement = function(){
    return($(this.selector));
  };

  this.positionStyle = positionStyle(this.horizontalPosition);
  this.sizeStyle = sizeStyle(this.radius);
  this.lifespanStyle = lifespanStyle(this.lifespan);
  this.colorStyle = colorStyle(this.color);
  this.divElement = divElement(this);

  this.launch = function(){
    addDomElement(this);
    programDeath(this);
  };

  this.kill = function(){
    this.domElement().remove();
  };

  function positionStyle(horizontalPosition){
    return("margin-left: " + horizontalPosition + "px;");
  }

  function sizeStyle(radius){
    var diameter = 2 * radius;
    var widthProperty = "width: " + diameter + "px;";
    var heightProperty = "height: " + diameter + "px;";
    var borderRadiusProperty = "-webkit-border-radius: " + radius + "px;";
    return(widthProperty + " " + heightProperty + " " + borderRadiusProperty);
  }

  function lifespanStyle(lifespan){
    return("-webkit-animation: movebubbles " + lifespan + "s linear;");
  }

  function colorStyle(color){
    return("background: " + color + ";");
  }

  function divElement(that){
    var style;
    style = that.positionStyle + that.sizeStyle + that.lifespanStyle + that.colorStyle;
    return("<div id='" + that.id + "' class='bubble' style='" + style + "'></div>");
  }

  function addDomElement(that){
    $('#bubbles').append(that.divElement);
  }

  function programDeath(that){
    this.setTimeout(function(){that.kill.call(that);}, that.lifespan * 1000 - 100);
  }
}
