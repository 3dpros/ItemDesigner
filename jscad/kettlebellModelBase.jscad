
//modes: 0 - model, 1 - planter, 2 - pencil holder
kettlebellModel = function kettlebellModel (param) {
 
  include("/../kettlebell.jscad");
  include("/../base.jscad");
  var baseTextSize = 10

 var text = trimText(param.Text, maxCharsPerLine = 14, maxLines = 4)

  var maxTextLength = getTotalCharLen(text, baseTextSize, param.style);
  var textSize = min(baseTextSize, baseTextSize*45/maxTextLength)
  var textItems = []
  var bodyColor = colorNameToRGB(param.color)

  var item  = kettlebell(param.variant).setColor(bodyColor) 
  var objects = [];


  var textVector = straightText(text, textSize, param.style)
  textItems.push(linear_extrude({height: 5}, textVector).translate([0,0,33]).setColor([1,1,1]));
  textItems.push(linear_extrude({height: 5}, textVector).translate([0,0,33]).rotateY(180).setColor([1,1,1]));
  if(param.renderMode == 'all') {
    objects.push(item);
    objects = objects.concat(textItems)
  item = objects
  
  } else if(param.renderMode == 'text') {
    objects = [union(item).intersect(union(textItems))]
  } else if (param.renderMode == 'base') {
    objects = [union(item).subtract(union(textItems))]
  }
  objects.forEach((item, index) => {
    objects[index] = item.scale(param.sizeOpt/6).translate([0,-75,0])
  })
    return objects;
}


