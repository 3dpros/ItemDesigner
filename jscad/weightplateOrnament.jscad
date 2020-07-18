

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
    values: ['gray', 'black', 'red', 'gold', 'dual'],
    captions: ['Gray', 'Black', 'Red', 'Gold', 'Black w/ Gray Text'],
    initial: ''
    },    
    //{name: 'hidePlate', checked: false, type: 'checkbox', caption: 'Hide Plate'},
    {name: 'displayOptions', type: 'group', caption: 'Render Options'},   
    {name: 'bananaInternal', checked: false, type: 'checkbox', caption: 'Banana for Scale', internal: true},
    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}


function main (param) {
  include("./weightplatebase.jscad");
  include("/../clockKit.jscad");
  include("/../base.jscad");

  var items = [];
  param.sizeOpt = 2.75*5;
  if(param.color == 'dual')
  {
    param['whiteLetters'] = true;
    param.color = 'Black';
    //param.whiteLetters = true;
  }
  items = weightPlateBase(param, Mode = "ornament");

 
  return items;
}
