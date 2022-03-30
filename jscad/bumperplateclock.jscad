

function getParameterDefinitions () {
  return [
    {name: 'Configuration', type: 'group', caption: 'Design Options'},
    {name: 'TopText', initial: 'TOP', type: 'textbox', caption: 'Top Text', maxLength: 14},
    {name: 'BottomText', initial: 'BOTTOM', type: 'textbox', caption: 'Bottom Text', maxLength: 14},
    {name: 'LeftText', initial: 'EST.', type: 'textbox', caption: 'Left Text'},
    {name: 'RightText', initial: '2010', type: 'textbox', caption: 'Right Text'},
    {name: 'color',
    type: 'choice',
    caption: 'Color',
    values: ['red', 'blue', 'green'],
    captions: ['Red', 'Blue', 'Green'],
    initial: ''
    },
    {name: 'textScale', type: 'slider', initial: 100, min: 60, max: 120, step: 1, caption: 'Text Scale'},
    {name: 'kerning', type: 'slider', initial: 100, min: 60, max: 120, step: 1, caption: 'Letter Spacing'},
    {name: 'sizeOpt',
    type: 'choice',
    caption: 'Clock Diameter',
    values: ['11', '15', '18'],
    captions: ['11"', '15"', '18"'],
    initial: '15',
    internal: true
  },
  {name: 'invertText', checked: false, type: 'checkbox', caption: 'Invert Bottom/Right Text', internal: true},

    //{name: 'hidePlate', checked: false, type: 'checkbox', caption: 'Hide Plate'},
    {name: 'displayOptions', type: 'group', caption: 'Render Options'},   
    {name: 'showKitInternal', checked: true, type: 'checkbox', caption: 'Show Clock Hands', internalDefault: false},
    {name: 'bananaInternal', checked: false, type: 'checkbox', caption: 'Banana for Scale', internal: true},
    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}


function main (param) {
  include("./weightplatebase.jscad");
  include("/../clockKit.jscad");
  include("/../base.jscad");

  var items = []
  items = weightPlateBase(param, Mode = "clock", bumperPlate = true, dualColor = false);
  if(param.showKitInternal) {
    items.push(clockAssm(param.sizeOpt, param.color == 'black', showSecondHand = false).translate([-102,-47,-81])); }
//  item = allItemBase(param, item);
  return items;
}
