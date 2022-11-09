

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
    {name: 'SizeOptions', type: 'group', caption: 'Text Size Options'},
    {name: 'textScale', type: 'slider', initial: 100, min: 80, max: 120, step: 1, caption: 'Text Scale'},
    {name: 'kerning', type: 'slider', initial: 100, min: 80, max: 120, step: 1, caption: 'Letter Spacing'},
    {name: 'bottomTextScale', type: 'slider', initial: 100, min: 60, max: 120, step: 1, caption: 'Bottom Text Scale', internal: true},

    {name: 'hideClockInternal', checked: false, type: 'checkbox', caption: 'Letters Only', internal: true, internalDefault: true, default: false},
    {name: 'bananaInternal', checked: false, type: 'checkbox', caption: 'Banana for Scale',  internal: true},   
  ];
}



function main (param) {
  include("./weightplatebase.jscad");
  param.color = 'black'

  return weightPlateBase(param,  Mode = "wallart", false, true);

}
