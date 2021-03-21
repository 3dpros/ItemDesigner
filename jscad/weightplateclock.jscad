

function getParameterDefinitions () {
  return [
    {name: 'Configuration', type: 'group', caption: 'Design Options'},
    {name: 'TopText', initial: 'BARBELL', type: 'textbox', caption: 'Top Text', maxLength: 14},
    {name: 'BottomText', initial: 'STANDARD', type: 'textbox', caption: 'Bottom Text', maxLength: 14},
    {name: 'LeftText', initial: '45\nLBS', type: 'textbox', caption: 'Left Text'},
    {name: 'RightText', initial: '20.4\nKGS', type: 'textbox', caption: 'Right Text'},
    {name: 'SizeOptions', type: 'group', caption: 'Text Size Options'},
    {name: 'textScale', type: 'slider', initial: 100, min: 80, max: 120, step: 1, caption: 'Text Scale'},
    {name: 'kerning', type: 'slider', initial: 100, min: 80, max: 120, step: 1, caption: 'Letter Spacing'},
    {name: 'sizeOpt',
    type: 'choice',
    caption: 'Clock Diameter',
    values: ['11', '15', '18'],
    captions: ['11"', '15"', '18"'],
    initial: '15',
    internal: true
  },
    //{name: 'hidePlate', checked: false, type: 'checkbox', caption: 'Hide Plate'},
    {name: 'displayOptions', type: 'group', caption: 'Render Options'},   
    {name: 'whiteLettersInternal', checked: true, type: 'checkbox', caption: 'Preview Painted Letters', internalDefault: false},

    {name: 'showKitInternal', checked: true, type: 'checkbox', caption: 'Show Clock Hands', internalDefault: false},
    {name: 'bananaInternal', checked: false, type: 'checkbox', caption: 'Banana for Scale', internal: true},
    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}


function main (param) {
  include("./weightplatebase.jscad");
  include("/../clockKit.jscad");
  include("/../base.jscad");
  param.color = 'black'
  var items = [];
  items = weightPlateBase(param, Mode = "clock");
  if(param.showKitInternal) {
    items.push(clockAssm(param.sizeOpt, param.color == 'black', true).translate([-102,-47,-81])); }
//  item = allItemBase(param, item);
  return items;
}
