



weightPlateBase = function weightPlateBase (param, ClockMode, bumperPlate = false) {

  include("/../weightPlate.jscad");
  include("/../base.jscad");
  
    var size = param.sizeOpt;
    var cutObjects = []; // our stack of objects
    var unscaledCutObjects = []; // our stack of objects
    var allObjects = []; // our stack of objects
    var textObjects = [];
    var p = []; // our stack of extruded line segments
  
    var plateColor = colorNameToRGB(param.color)
    var textColor = plateColor.map((a, i) => a + .05);
    var baseTextSize = bumperPlate?36:28;
    var topText = trimText(param.TopText)
    var bottomText = trimText(param.BottomText)
  var font = bumperPlate?'arial':'gothic'
  
  
    var maxTextLength = max(getTotalCharLen(topText, baseTextSize,  font = font, [0,0.2]), getTotalCharLen(bottomText, baseTextSize, font = font, [0.2,0]))
    var textSize = min(baseTextSize, (165*baseTextSize)/maxTextLength)
  var textHeight = 4;
  
  
  if(param.LeftText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(trimText(param.LeftText, 5,3), textSize = textSize, font = font)).setColor(textColor).translate([-110,0,0]));}
  if(param.RightText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(trimText(param.RightText, 5,3), textSize = textSize, font = font)).rotateZ(bumperPlate?180:0).setColor(textColor).translate([110,0,0]))}
  if(param.TopText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(topText, 85, 130, true, textSize = textSize, font = font)).setColor(textColor));}
  if(param.BottomText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(bottomText, 85, 130, bumperPlate, textSize = textSize, font = font)).rotateZ(180).setColor(textColor));}
  if(ClockMode) {
    cutObjects.push(clockTicks().setColor(textColor));
    //clock kit hole
    unscaledCutObjects.push(cylinder({r: 4, h: 30, center: true}).setColor(textColor)) 
  }
  else {
    //center hole
    cutObjects.push(cylinder({r: 21, h: 30, center: true}).setColor(textColor)) 
  //hanger hole on back
    cutObjects.push(cylinder({r: 4, h: 12, center: false}).translate([0, 174,-5]).setColor(textColor))
  }
  

    if(!param.hidePlate){
      allObjects.push(weightPlate().rotateZ(45).translate([0,-254,-1]).setColor(plateColor));
    }
  
    var items = []
    items.push(union(allObjects).subtract(cutObjects).scale(size/14.7).subtract(unscaledCutObjects));
    return items.concat(textObjects);
  }
  
  function clockTicks() {
    var ticks = []
    var size = 4;
    var width = 3;
    var multiplierForMajor = 2;
   for (var i = 0; i < 60; i++)
    {
      var tick = null
      if(i%15 == 0) {         
        tick = cube({size: [width,size*multiplierForMajor,15], center: true});
      } 
      else if(i%5 == 0) {  
        tick = cube({size: [width,size,15], center: true});
      }
      else {
        //tick = cube({size: [width/2,size/2,15], center: true});
      }
      if(tick !== null)
      ticks.push(tick.translate([0,172,12]).rotateZ(i*(360/60)));
    }
    return union(ticks)
  }
  
  
  
  
  
      
  