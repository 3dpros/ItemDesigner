

function getParameterDefinitions () {
  return [
    {name: 'Configuration', type: 'group', caption: 'Design Options'},
    {name: 'TopText', initial: 'BARBELL', type: 'textbox', caption: 'Top Text', maxLength: 14},
    {name: 'BottomText', initial: 'STANDARD', type: 'textbox', caption: 'Bottom Text', maxLength: 14},
    {name: 'LeftText', initial: '45\nLBS', type: 'textbox', caption: 'Left Text'},
    {name: 'RightText', initial: '20.4\nKGS', type: 'textbox', caption: 'Right Text'},
    {name: 'color',
    type: 'choice',
    caption: 'Color',
    values: ['gray', 'black', 'red', 'gold'], //, 'dual'], temporarily disable!
    captions: ['Silver', 'Black', 'Red', 'Gold'], // , 'Black w/ Silver Text'],
    initial: ''
    },    
    {name: 'textScale', type: 'slider', initial: 100, min: 80, max: 120, step: 1, caption: 'Text Scale'},
    {name: 'kerning', type: 'slider', initial: 100, min: 80, max: 120, step: 1, caption: 'Letter Spacing'},
    //{name: 'hidePlate', checked: false, type: 'checkbox', caption: 'Hide Plate'},
    {name: 'renderMode',
    type: 'choice',
    caption: 'Render Mode',
    values: ['all', 'base', 'text'],
    captions: ['Show All', 'Base Only', 'Text Only'],
    initial: 'all', internal: true
  },
  {name: 'scaledForViewing', checked: true, type: 'checkbox', caption: 'Scale for Viewing', internalDefault: false, internal: true},

    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}


function main (param) {
  include("./weightplatebase.jscad");
  include("/../clockKit.jscad");
  include("/../base.jscad");

  var items = [];
  //small scaling down to make the concentrics work
  param.sizeOpt = .988*2.75*(param.scaledForViewing?5:1);
  if(param.color == 'dual')
  {
    param['whiteLettersInternal'] = true;
    param.color = 'Black';
  }
  items = weightPlateBase(param, Mode = "ornament", bumperPlate = false, dualColor = false, textAdjustFactor = 1.1);

 
  return items;
}
