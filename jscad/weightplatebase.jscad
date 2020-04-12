



weightPlateBase = function weightPlateBase (param, ClockMode, bumperPlate = false) {

  include("/../weightPlate.jscad");
  include("/../base.jscad");
  
  if(param.invertText === null)
  {
    param.invertText = false;
  }
    var size = param.sizeOpt;
    var cutObjects = []; // our stack of objects
    var unscaledCutObjects = []; // our stack of objects
    var allObjects = []; // our stack of objects
    var textObjects = [];
    var p = []; // our stack of extruded line segments
  
    var plateColor = colorNameToRGB(param.color)
    var textColor = plateColor.map((a, i) => a + .05);
    var accentColor = bumperPlate?colorNameToRGB('white'):textColor;
    var baseTextSize = bumperPlate?40:28;
    var topText = trimText(param.TopText)
    var bottomText = trimText(param.BottomText)
  var font = bumperPlate?'arial':'gothic'
  
  
    var maxTextLength = max(getTotalCharLen(topText, baseTextSize,  font = font, [0,0.2]), getTotalCharLen(bottomText, baseTextSize, font = font, [0.2,0]))
    var textSize = min(baseTextSize, (150*baseTextSize)/maxTextLength)
  var textHeight = 4;
  var textRadius = bumperPlate?122:130;
  var textSpan = bumperPlate?110:85;
  
  if(param.LeftText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(trimText(param.LeftText, 5,3), textSize = textSize, font = font)).setColor(textColor).translate([-110,0,0]));}
  if(param.RightText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(trimText(param.RightText, 5,3), textSize = textSize, font = font)).rotateZ(param.invertText?180:0).setColor(textColor).translate([110,0,0]))}
  if(param.TopText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(topText, textSpan, textRadius, true, textSize = textSize, font = font)).setColor(textColor));}
  if(param.BottomText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(bottomText, textSpan, textRadius, param.invertText, textSize = textSize, font = font)).rotateZ(180).setColor(textColor));}
  if(ClockMode) {
    cutObjects.push(clockTicks().scale(bumperPlate?.99:1).setColor(accentColor));
    //clock kit hole
    unscaledCutObjects.push(cylinder({r: 4, h: 30, center: true}).setColor(textColor)) 
    //clock kit gap on back
    if(!bumperPlate)
    {
      unscaledCutObjects.push(cube({size: [63,63,5], center: true}).setColor(textColor))
    }

  }
  else {
    //center hole
    cutObjects.push(cylinder({r: 21, h: 30, center: true}).setColor(textColor)) 
  //hanger hole on back
    cutObjects.push(cylinder({r: 4, h: 12, center: false}).translate([0, 174,-5]).setColor(textColor))
  }
  
    var baseSTL = bumperPlate?bumperWeightPlate():weightPlate()
    allObjects.push(baseSTL.rotateZ(45).translate([0,-254,-1]).setColor(plateColor));
  
    var items = []
    textObjects.forEach((item, index) => {textObjects[index] = item.scale(size/14.7)})
    if(bumperPlate) {
      var allText = union(textObjects).scale([1,1,2]).setColor(accentColor);
      items.push(union(allObjects).subtract(cutObjects).subtract(allText).scale(size/14.7).subtract(unscaledCutObjects));
    } else {
      items.push(union(allObjects).subtract(cutObjects).scale(size/14.7).subtract(unscaledCutObjects));
      items = items.concat(textObjects);
    }
    return items
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
  
  
  
  
  
      
  