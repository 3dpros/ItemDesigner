

function getParameterDefinitions () {
  return [
    {name: 'Configuration', type: 'group', caption: 'Design Options'},
    {name: 'TopText', initial: 'TOP', type: 'textbox', caption: 'Top Text', maxLength: 14},
    {name: 'BottomText', initial: 'BOTTOM', type: 'textbox', caption: 'Bottom Text', maxLength: 14},
    {name: 'LeftText', initial: '55', type: 'textbox', caption: 'Left Text'},
    {name: 'RightText', initial: '55', type: 'textbox', caption: 'Right Text'},
    {name: 'color',
    type: 'choice',
    caption: 'Color',
    values: ['red', 'blue', 'green'],
    captions: ['Red', 'Blue', 'Green'],
    initial: ''
    },
    {name: 'sizeOpt',
    type: 'choice',
    caption: 'Clock Diameter',
    values: ['11', '15', '18'],
    captions: ['11"', '15"', '18"'],
    initial: '15',
    internal: true
  },
  {name: 'invertText', checked: true, type: 'checkbox', caption: 'Invert Bottom/Right Text', initial: true},

    //{name: 'hidePlate', checked: false, type: 'checkbox', caption: 'Hide Plate'},
    //{name: 'color', type: 'color', initial: '#0F0F0F', caption: 'Color?'}
  ];
}



function main (param) {
  include("./weightplatebase.jscad");

  return weightPlateBase(param,  ClockMode = false, bumperPlate = true);

}
