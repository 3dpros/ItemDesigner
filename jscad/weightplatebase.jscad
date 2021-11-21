



weightPlateBase = function weightPlateBase (param, Mode, bumperPlate = false, dualColor = false, textAdjustFactor = 1) {

  include("/../weightPlate.jscad");
  include("/../base.jscad");
  invertText = false;

  if(param.invertText != null) {
    invertText = param.invertText;
  }  
  if(param.invertRightText != null) {
    invertRightText = param.invertRightText;
  }
    var size = param.sizeOpt;
    var cutObjects = []; // our stack of objects
    var unscaledCutObjects = []; // our stack of objects
    var allObjects = []; // our stack of objects
    var textObjects = [];
    var p = []; // our stack of extruded line segments
    var renderMode = (param.renderMode == null)?'all':param.renderMode;
    var textScale = (param.textScale == null)?100:param.textScale;
    var kerning = (param.kerning == null)?100:param.kerning;
    var maxSideChars = ((bumperPlate && Mode == "ornament")?5:7)
    var maxTopBottomChars = bumperPlate?10:(Mode == "ornament")?12:15

    var plateColor = colorNameToRGB(param.color)
    var accentColor = dualColor?colorNameToRGB('white'):plateColor.map((a, i) => a - .03);
    var textColor = param.whiteLettersInternal?colorNameToRGB('white'):accentColor;
    var baseTextSize = bumperPlate?((Mode == "ornament")?40:40):34;
    var topText = validateText(param.TopText.trim(), maxTopBottomChars).toUpperCase()
    var bottomText = validateText(param.BottomText.trim(), maxTopBottomChars).toUpperCase()
    var leftText = validateText(param.LeftText.trim(), maxSideChars,3).toUpperCase()
    var rightText = validateText(param.RightText.trim(), maxSideChars,3).toUpperCase()
  var font = bumperPlate?'arial':'gothic'
  var sizeScalingFactor = size/14.7;
  
    var maxTextLength = max(getTotalCharLen(topText, baseTextSize,  font = font, [0,0.2]), getTotalCharLen(bottomText, baseTextSize, font = font, [0,0.2]))
    var textSize = min(baseTextSize, (165*baseTextSize)/maxTextLength) * textAdjustFactor * textScale / 100;
  var textHeight = (Mode == "ornament")?(bumperPlate?11:7):4;
  var textRadius = bumperPlate?122:(Mode == "ornament")?143:134;
 var textSpan = bumperPlate?130:80;
  var sideTextSize = textSize*.94
 //for bumper plates, scale the side text a bit smaller if needed since there is less room
  if(bumperPlate)
  {
    var maxSideTextLength = max(getTotalCharLen(param.LeftText, baseTextSize,  font = font), getTotalCharLen(param.RightText, baseTextSize, font = font))
    sideTextSize = min(baseTextSize, (58*baseTextSize)/maxSideTextLength) * textAdjustFactor
  }
  var sideTextOffset = bumperPlate?112:(sideTextSize == baseTextSize)?110:(Mode == "ornament")?111:106

  if(leftText !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(leftText, sideTextSize, font = font)).setColor(textColor).translate([-sideTextOffset,0,0]));}
  if(rightText !== ''){textObjects.push(linear_extrude({height: textHeight}, straightText(rightText, sideTextSize, font = font)).rotateZ((invertText || invertRightText)?180:0).setColor(textColor).translate([sideTextOffset,0,0]))}
  if(topText !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(topText, textSpan, textRadius, true, textSize = textSize, font = font, kerning/100)).setColor(textColor));}
  if(bottomText !== ''){textObjects.push(linear_extrude({height: textHeight}, revolveMultilineText(bottomText, textSpan, textRadius, invertText, textSize = textSize, font = font, kerning/100)).rotateZ(180).setColor(textColor));}
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
      baseSTL = (bumperPlate?bumperPlateOrnament():weightPlateOrnament()).rotateZ(-45).scale(14.7/2.75*.9987).translate([-265, 2,-20])
    } else {
    baseSTL = (bumperPlate?bumperWeightPlate():weightPlate()).rotateZ(45).translate([0,-254,-1])
    }
    allObjects.push(baseSTL.setColor(plateColor));

    var items = []
    var plateScalingFactor = [sizeScalingFactor, sizeScalingFactor, (Mode == "ornament")?sizeScalingFactor:pow(18/14.7, .5)];

    textObjects.forEach((item, index) => {textObjects[index] = item})

    if(bumperPlate && !dualColor) {
      items.push(union(allObjects).subtract(cutObjects).scale(plateScalingFactor).subtract(union(textObjects).scale([1,1,2.4]).scale(plateScalingFactor).union(unscaledCutObjects)));
    } else {
      if(renderMode == 'all') {
      items.push(union(textObjects).union(allObjects).subtract(union(cutObjects)).scale(plateScalingFactor).subtract(unscaledCutObjects));
      }
      if(renderMode == 'text') {
        items.push(union(textObjects).subtract(union(allObjects)).scale(plateScalingFactor));
      }
      if(renderMode == 'base') {
        items.push(union(allObjects).subtract(union(cutObjects)).scale(plateScalingFactor).subtract(unscaledCutObjects));
      }
      if(param.hideClock)
      {
        items = []
        items.push(union(textObjects).scale(plateScalingFactor).scale([1,1,.88]));
        items.push(cylinder({r: 2, h: .1}).setColor(accentColor)) 

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
  
  
  
  
  
      
  