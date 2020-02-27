
//modes: 0 - model, 1 - planter, 2 - pencil holder
kettlebellModel = function kettlebellModel (param) {
 
  include("/../kettlebell.jscad");
  include("/../base.jscad");
  var baseTextSize = 10

 var text = trimText(param.Text, maxCharsPerLine = 14, maxLines = 4)

  var maxTextLength = getTotalCharLen(text, baseTextSize, param.style);
  var textSize = min(baseTextSize, baseTextSize*70/maxTextLength)
  var textItems = []
  var bodyColor = colorNameToRGB(param.color)

  var item  = kettlebell(param.variant).setColor(bodyColor) 



  var textVector = straightText(text, textSize, param.style)
  textItems.push(linear_extrude({height: 5}, textVector).translate([0,0,33]).setColor([1,1,1]));
  textItems.push(linear_extrude({height: 5}, textVector).translate([0,0,33]).rotateY(180).setColor([1,1,1]));
  if(param.renderMode == 'all') {
  item = item.union(textItems).scale(param.sizeOpt/6)
  } else if(param.renderMode == 'text') {
    item = union(textItems).scale(param.sizeOpt/6)
  } else if (param.renderMode == 'base') {
    item = item.subtract(union(textItems).scale(param.sizeOpt/6));
  }
  item = allItemBase(param, item);
  if(param.sizeOpt > 10) { //camera zoom hack - make the KB bigger and move it to the center of the frame
    return item.translate([0,-75,0]);
  }  
  return item;
}


