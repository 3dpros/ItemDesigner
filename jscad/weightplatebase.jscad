



weightPlateBase = function weightPlateBase (param, ClockMode, bumperPlate = false, dualColor = false) {

  include("/../weightPlate.jscad");
  include("/../base.jscad");
  invertText = false;

  if(param.invertText != null) {
    invertText = param.invertText;
  }

    var size = param.sizeOpt;
    var cutObjects = []; // our stack of objects
    var unscaledCutObjects = []; // our stack of objects
    var allObjects = []; // our stack of objects
    var textObjects = [];
    var p = []; // our stack of extruded line segments
  
    var plateColor = colorNameToRGB(param.color)
    var accentColor = dualColor?colorNameToRGB('white'):plateColor.map((a, i) => a + .05);
    var baseTextSize = bumperPlate?40:28;
    var topText = trimText(param.TopText)
    var bottomText = trimText(param.BottomText)
  var font = bumperPlate?'arial':'gothic'
  var sizeScalingFactor = size/14.7;
  
    var maxTextLength = max(getTotalCharLen(topText, baseTextSize,  font = font, [0,0.2]), getTotalCharLen(bottomText, baseTextSize, font = font, [0,0.2]))
    var textSize = min(baseTextSize, (155*baseTextSize)/maxTextLength)
  var textHeight = 4;
  var textRadius = bumperPlate?122:130;
  var sideTextOffset = bumperPlate?112:110
  var textSpan = bumperPlate?110:75;
  var sideTextSize = textSize
 //for bumper plates, scale the side text a bit smaller if needed since there is less room
  if(bumperPlate)
  {
    var maxSideTextLength = max(getTotalCharLen(param.LeftText, baseTextSize,  font = font), getTotalCharLen(param.RightText, baseTextSize, font = font))
    sideTextSize = min(baseTextSize, (50*baseTextSize)/maxSideTextLength)
  }

  if(param.LeftText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(trimText(param.LeftText, 5,3), sideTextSize, font = font)).setColor(accentColor).translate([-sideTextOffset,0,0]));}
  if(param.RightText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(trimText(param.RightText, 5,3), sideTextSize, font = font)).rotateZ(invertText?180:0).setColor(accentColor).translate([sideTextOffset,0,0]))}
  if(param.TopText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(topText, textSpan, textRadius, true, textSize = textSize, font = font)).setColor(accentColor));}
  if(param.BottomText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(bottomText, textSpan, textRadius, invertText, textSize = textSize, font = font)).rotateZ(180).setColor(accentColor));}
  if(ClockMode) {
    cutObjects.push(clockTicks().scale(bumperPlate?.99:1).setColor(accentColor));
    //clock kit hole
    unscaledCutObjects.push(cylinder({r: 4.5, h: 30, center: true}).setColor(accentColor)) 
    //clock kit gap on back
    if(!bumperPlate && size > 15)
    {
      unscaledCutObjects.push(cube({size: [63,63,5], center: true}).setColor(accentColor))
    }

  }
  else {
    //center hole
    cutObjects.push(cylinder({r: 21, h: 30, center: true}).setColor(accentColor)) 
  //hanger hole on back
    cutObjects.push(cylinder({r: 4, h: 12, center: false}).translate([0, 174,-5]).setColor(accentColor))
  }
  
    var baseSTL = bumperPlate?bumperWeightPlate():weightPlate()
    allObjects.push(baseSTL.rotateZ(45).translate([0,-254,-1]).setColor(plateColor));

    var items = []
    var plateScalingFactor = [sizeScalingFactor, sizeScalingFactor, pow(sizeScalingFactor, .5)];

    textObjects.forEach((item, index) => {textObjects[index] = item.scale(plateScalingFactor).scale([1,1,bumperPlate?2:1])})

    if(bumperPlate) {
      items.push(union(allObjects).subtract(cutObjects).scale(plateScalingFactor).subtract(union(textObjects).union(unscaledCutObjects)));
    } else {
      items.push(union(allObjects).subtract(union(cutObjects)).scale(plateScalingFactor).subtract(unscaledCutObjects));
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
  
  
  
  
  
      
  