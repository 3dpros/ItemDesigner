
//modes: 0 - model, 1 - planter, 2 - pencil holder
kettlebellModel = function kettlebellModel (param, dualColor = true) {
 
  include("/../kettlebell.jscad");
  include("/../base.jscad");
  var baseTextSize = 10

 var text = trimText(param.Text, maxCharsPerLine = 16, maxLines = 4)
 var backtext = text
 if(param.BackText != '') {
 var backtext = trimText(param.BackText, maxCharsPerLine = 16, maxLines = 4)
 }
 
  var maxTextLength = getTotalCharLen(text, baseTextSize, param.style);
  var textSize = min(baseTextSize, baseTextSize*38/maxTextLength);
  var textItems = []
  var bodyColor = colorNameToRGB(param.color)
  var accentColor = dualColor?colorNameToRGB('white'):adjustColor(bodyColor, -.2);

  var item  = kettlebell(param.variant).setColor(bodyColor) 
  var objects = [];

if(text != '')
{
  var textVector = straightText(text, textSize, param.style)
  textItems.push(linear_extrude({height: 2}, textVector).translate([0,0,36]).setColor(accentColor));
}
if(backtext != '')
{
  var backTextVector = straightText(backtext, textSize, param.style)
  textItems.push(linear_extrude({height: 2}, backTextVector).translate([0,0,36]).rotateY(180).setColor(accentColor));
}
  var renderMode = 'all'
  if (!dualColor) {
    renderMode = 'base'
  } 
  if(param.renderMode != null) {
    renderMode = param.renderMode
  } 

  if(renderMode == 'all') {
    objects.push(item);
    objects = objects.concat(textItems)
  item = objects
  
  } else if(renderMode == 'text') {
    objects = [union(item).intersect(union(textItems))]
  } else if (renderMode == 'base') {
    objects = [union(item).subtract(union(textItems))]
  }
  objects.forEach((item, index) => {
    objects[index] = item.scale(param.sizeOpt/6).translate([0,-75,0])
  })
    return objects;
}


