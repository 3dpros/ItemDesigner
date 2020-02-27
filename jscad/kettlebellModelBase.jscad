kettlebellModel = function kettlebellModel (param) {
  include("/../kettlebell.jscad");
  include("/../base.jscad");
  var baseTextSize = 8

 var text = trimText(param.Text, maxCharsPerLine = 14, maxLines = 4)

  var maxTextLength = getTotalCharLen(text, baseTextSize, param.style);
  var textSize = min(baseTextSize, baseTextSize*80/maxTextLength)
  var textItems = []

  var item = kettlebell().setColor(colorNameToRGB(param.color))
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
    
  return item;
}


