

function getParameterDefinitions () {
  return [
    {name: 'Configuration', type: 'group', caption: 'Design Options'},
    {name: 'TopText', initial: 'TOP', type: 'textbox', caption: 'Top Text', maxLength: 14},
    {name: 'BottomText', initial: 'BOTTOM', type: 'textbox', caption: 'Bottom Text', maxLength: 14},
    {name: 'LeftText', initial: 'EST.', type: 'textbox', caption: 'Left Text'},
    {name: 'RightText', initial: '2020', type: 'textbox', caption: 'Right Text'},
    {name: 'color',
    type: 'choice',
    caption: 'Color',
    values: ['red', 'blue', 'green', 'yellow', 'black'],
    captions: ['Red', 'Blue', 'Green', 'Yellow', 'Black'],
    initial: ''
    },    
    {name: 'invertText', checked: false, type: 'checkbox', caption: 'Invert Right and Bottom Text'},
    //{name: 'hidePlate', checked: false, type: 'checkbox', caption: 'Hide Plate'},
    {name: 'displayOptions', type: 'group', caption: 'Render Options'},   
    {name: 'bananaInternal', checked: false, type: 'checkbox', caption: 'Banana for Scale', internal: true},
    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
    {name: 'renderMode',
    type: 'choice',
    caption: 'Render Mode',
    values: ['all', 'base', 'text'],
    captions: ['Show All', 'Base Only', 'Text Only'],
    initial: 'all', internal: true
  },
  {name: 'scaledForViewing', checked: true, type: 'checkbox', caption: 'Scale for Viewing', internalDefault: false, internal: true},

  ];
}


function main (param) {
  include("./weightplatebase.jscad");
  include("/../clockKit.jscad");
  include("/../base.jscad");

  var items = [];
  param.sizeOpt = 2.75*(param.scaledForViewing?5:1); 
  if(param.color == 'dual')
  {
   // param['whiteLettersInternal'] = true;
    param.color = 'Red';
  }
  items = weightPlateBase(param, Mode = "ornament", bumperPlate = true, dualColor = true, textAdjustFactor = 1.15);

 
  return items;
}
