



weightPlateBase = function weightPlateBase (param, Mode, bumperPlate = false, dualColor = false, textAdjustFactor = 1) {

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
    var renderMode = (param.renderMode == null)?'all':param.renderMode;
    var textScale = (param.textScale == null)?100:param.textScale;

    var plateColor = colorNameToRGB(param.color)
    var accentColor = dualColor?colorNameToRGB('white'):plateColor.map((a, i) => a - .03);
    var textColor = param.whiteLettersInternal?colorNameToRGB('white'):accentColor;
    var baseTextSize = bumperPlate?((Mode == "ornament")?40:40):34;
    var topText = trimText(param.TopText)
    var bottomText = trimText(param.BottomText)
  var font = bumperPlate?'arial':'gothic'
  var sizeScalingFactor = size/14.7;
  
    var maxTextLength = max(getTotalCharLen(topText, baseTextSize,  font = font, [0,0.2]), getTotalCharLen(bottomText, baseTextSize, font = font, [0,0.2]))
    var textSize = min(baseTextSize, (165*baseTextSize)/maxTextLength) * textAdjustFactor * textScale / 100;
  var textHeight = 4;
  var textRadius = bumperPlate?122:134;
  var sideTextOffset = bumperPlate?112:110
  var textSpan = bumperPlate?130:80;
  var sideTextSize = textSize
 //for bumper plates, scale the side text a bit smaller if needed since there is less room
  if(bumperPlate)
  {
    var maxSideTextLength = max(getTotalCharLen(param.LeftText, baseTextSize,  font = font), getTotalCharLen(param.RightText, baseTextSize, font = font))
    sideTextSize = min(baseTextSize, (50*baseTextSize)/maxSideTextLength) * textAdjustFactor
  }

  if(param.LeftText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(trimText(param.LeftText.toUpperCase(), 5,3), sideTextSize, font = font)).setColor(textColor).translate([-sideTextOffset,0,0]));}
  if(param.RightText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(trimText(param.RightText.toUpperCase(), 5,3), sideTextSize, font = font)).rotateZ(invertText?180:0).setColor(textColor).translate([sideTextOffset,0,0]))}
  if(param.TopText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(topText.toUpperCase(), textSpan, textRadius, true, textSize = textSize, font = font)).setColor(textColor));}
  if(param.BottomText.trim() !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(bottomText.toUpperCase(), textSpan, textRadius, invertText, textSize = textSize, font = font)).rotateZ(180).setColor(textColor));}
  if(Mode == "clock") {
    cutObjects.push(clockTicks().scale(bumperPlate?.99:1).setColor(accentColor));
    //clock kit hole
    unscaledCutObjects.push(cylinder({r: 5, h: 30, center: true}).setColor(accentColor)) 
    allObjects.push(cylinder({r: 20, h: 2, center: true}).setColor(plateColor));

    //clock kit gap on back
    //if(!bumperPlate && size > 15)
    //{
    //  unscaledCutObjects.push(cube({size: [63,63,5], center: true}).setColor(accentColor))
    //}

  }

  
  if(Mode == "wallart"){
    //center hole
    cutObjects.push(cylinder({r: 21, h: 30, center: true}).setColor(accentColor)) 
    //hanger hole on back
    cutObjects.push(cylinder({r: 4, h: 12, center: false}).translate([0, 174,-5]).setColor(accentColor))
  }
  
    var baseSTL
    if(Mode == "ornament") {
      baseSTL = (bumperPlate?bumperPlateOrnament():weightPlateOrnament()).rotateZ(-45).scale(14.7/2.75*.9987).translate([-265, 2,-22])
    } else {
    baseSTL = (bumperPlate?bumperWeightPlate():weightPlate()).rotateZ(45).translate([0,-254,-1])
    }
    allObjects.push(baseSTL.setColor(plateColor));

    var items = []
    var plateScalingFactor = [sizeScalingFactor, sizeScalingFactor, (Mode == "ornament")?sizeScalingFactor:pow(sizeScalingFactor, .5)];

    textObjects.forEach((item, index) => {textObjects[index] = item.scale(plateScalingFactor).scale([1,1,bumperPlate?2:1])})

    if(bumperPlate && !dualColor) {
      items.push(union(allObjects).subtract(cutObjects).scale(plateScalingFactor).subtract(union(textObjects).union(unscaledCutObjects)));
    } else {
      if(renderMode == 'all') {
      items.push(union(allObjects).subtract(union(cutObjects)).scale(plateScalingFactor).subtract(unscaledCutObjects));
      items = items.concat(textObjects);
      }
      if(renderMode == 'text') {
        items = items.concat(union(textObjects).subtract(union(allObjects)));
      }
      if(renderMode == 'base') {
        items.push(union(allObjects).subtract(union(cutObjects)).scale(plateScalingFactor).subtract(unscaledCutObjects));
      }


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
  
  
  
  
  
      
  