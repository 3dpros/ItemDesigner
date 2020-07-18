

function getParameterDefinitions () {
  return [
    {name: 'Design', type: 'group', caption: 'Design Options'},
    {name: 'TopText', initial: 'BARBELL', type: 'textbox', caption: 'Top Text', maxLength: 14},
    {name: 'BottomText', initial: 'STANDARD', type: 'textbox', caption: 'Bottom Text', maxLength: 14},
    {name: 'LeftText', initial: '45\nLBS', type: 'textbox', caption: 'Left Text'},
    {name: 'RightText', initial: '20.4\nKGS', type: 'textbox', caption: 'Right Text'},
    {name: 'sizeOpt',
    type: 'choice',
    caption: 'Diameter',
    values: ['11', '15', '18'],
    captions: ['11"', '15"', '18"'],
    initial: '15',
    internal: true
    },
    {name: 'color',
    type: 'choice',
    caption: 'Color',
    values: ['gray', 'black'],
    captions: ['Gray', 'Black'],
    initial: ''
    },
    {name: 'whiteLettersInternal', checked: true, type: 'checkbox', caption: 'Preview Painted Letters', Default: false},
    {name: 'bananaInternal', checked: false, type: 'checkbox', caption: 'Banana for Scale',  internal: true},   
    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}



function main (param) {
  include("./weightplatebase.jscad");

  return weightPlateBase(param,  Mode = "wallart");

}
