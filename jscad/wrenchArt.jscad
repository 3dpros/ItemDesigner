

function getParameterDefinitions () {
  return [
    {name: 'Design', type: 'group', caption: 'Design Options'},
    {name: 'Text', initial: 'Custom Text', type: 'text', caption: 'Text', maxLength: 20},
    {name: 'SizeOptions', type: 'group', caption: 'Text Size Options'},
    {name: 'textScale', type: 'slider', initial: 100, min: 80, max: 120, step: 1, caption: 'Text Scale'},
    {name: 'textPos', type: 'slider', initial: 0, min: -20, max: 20, step: 1, caption: 'Text Position'},

  //  {name: 'kerning', type: 'slider', initial: 100, min: 80, max: 120, step: 1, caption: 'Letter Spacing'},
  {name: 'bananaInternal', checked: false, type: 'checkbox', caption: 'Banana for Scale'},
  {name: 'scaledForViewing', checked: true, type: 'checkbox', caption: 'Scale for Viewing', internalDefault: false, internal: true},


    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}



function main (param) {
  include("./wrenchModel.jscad");
  include("/../base.jscad");
    include("./banana.jscad");


  var objects = [];
  var holeobjects = [];

  var text = validateText(param.Text, 24, maxLines = 1)
  if(text.trim() == '')
    return wrench().setColor([.65,.65,.65])
  var textVector = linear_extrude({height: 4}, straightText(text, 22 * param.textScale/100, param.style)).translate([2 + param.textPos,-19 + .1*param.textScale/100,16])
  objects.push(textVector.setColor([.7,.7,.7]));
  objects.push(wrench().setColor([.65,.65,.65]));
  holeobjects.push(cylinder({r:2,h:20}).translate([120,-20,-5]).setColor([.7,.7,.7]));
  holeobjects.push(cylinder({r:2,h:20}).translate([-120,-20,-5]).setColor([.7,.7,.7]));

  if(param.bananaInternal !== null && param.bananaInternal) {
    objects.push(banana().rotateX(90).translate([-225,150,200]).scale(.68));
  }
  var result = union(objects).subtract(union(holeobjects))
  if(!param.scaledForViewing) {
  return result.scale(1.695).rotateZ(90);
  } else { 
    return result
  }
}
