allItemBase = function allItemBase (param, item) {

    include("/../banana.jscad");
    
    if(param.bananaInternal !== null && param.bananaInternal) {
        return item.union(banana());
      }
      return item
}

logMsg = function log(msg) {

    var debugControl = document.getElementById('debug') 
    if(debugControl !== null)
      debugControl.innerHTML += '<br>' + msg;
    }

trimText = function trimText(text, maxCharsPerLine = 18, maxLines = 2) {
      var trimmedArray = [];
      var textArray = text.split('\n').slice(0,maxLines)
      textArray.forEach((word) => {
        trimmedArray.push(word.substr(0,maxCharsPerLine));
      });
      return trimmedArray.filter(x => x != '').join('\n');
    
    }

straightText = function straightText(text, textSize = 20, font = 'gothic')
    {

      var vSpacing = textSize * 1.25
      var textArray = text.split('\n')
      var allText = [];
    
      var zh = vSpacing/2 * (max(0,textArray.length - 1)) - textSize/2.7;
      textArray.forEach((word) => {
        if(word.trim() !== ''){
         let extrudedText = getText(word, textSize, font).translate([-getTextWidth(word, textSize, font)/2,zh,0]);
    
          zh-=vSpacing;
          allText.push(extrudedText)
      }
      });
      return union(allText);
    }     

revolveMultilineText =  function revolveMultilineText(text, textAngle = 90, radius = 180, faceUp = true, textSize = 28, font = 'gothic', kerning = 1) {

      var textArray = text.split('\n')
      if(textArray.length == 1)  {
        return revolveText(text, textAngle, radius, faceUp, textSize, font, kerning);
      }
      
      if(!faceUp)
      {
        textArray = textArray.reverse();
      }
      var allText = [];
      var lineRadius = radius + (textArray.length - 1)/2*textSize -5
      textArray.forEach((word) => {
        allText.push(revolveText(word, textAngle, lineRadius, faceUp, textSize, font, kerning));
        lineRadius -= textSize
      });
      return union(allText);
    }
    
    
    function revolveText(text, textAngle, radius, invert, textSize, font, kerning = 1)
    {
      var invertVal = invert?1:-1
      var totalCharLen = getTotalCharLen(text, textSize, font);
      var word = [];
      var iRadius = radius-invertVal*(textSize/3)+ (28-textSize)/2;
    
    
      spanAngle = min(textAngle, getTextWidth(text, textSize, font) /2 * 130/radius)*kerning;
      
      var charLen = 0;
      for (var x = 0; x < text.length; x++)
      {
        var c = text.charAt(x);
            var result = getCharWidth(c, textSize, font)
            var charWidth = result.width;
            var shift = result.shift;
            charLen += charWidth;
          if(c.trim() !== ''){
            word.push(getText(c,textSize-3, font).translate([-shift,invertVal*iRadius,0]).rotateZ(-invertVal*( (charLen- charWidth/2)/totalCharLen*spanAngle) +invertVal*(spanAngle/2)));
          }
        }
      if(invertVal>0){
         return union(word); 
        } else {
          return union(word).rotateZ(180); 
         }
  }

  getTotalCharLen = function getTotalCharLen(text, textSize, font, LineFactor = [0, 0, 0,0,0,0,0,0]) {    
    var totalCharLens = [];
    var lineNum = 0
    text.split('\n').forEach((line) => {
        var totalCharLen = 0
        for (var x = 0; x < line.length; x++)
        {
          var c = line.charAt(x);
          totalCharLen += getCharWidth(c, textSize, font).width;
        }
        totalCharLens.push(totalCharLen * (1 + LineFactor[lineNum]))
        lineNum++;
      })
    return Math.max(...totalCharLens);
  
  }

  adjustColor = function adjustColor(color, factor)
  {
     return [color[0]+factor,color[1]+factor,color[2]+factor]
  }

  colorNameToRGB = function colorNameToRGB(colorName) {
  colorValues = {
    'gray': '#ebebeb',
    'black': '#1c1c1c',
    'white': '#ffffff',
    'blue': '#242da6',
    'red': '#c72222',
    'yellow': '#ffc31f',
    'gold': '#f0db62',
    'green': '#24a642'
  };

  colorName = colorName.toLowerCase()
  if(colorValues.hasOwnProperty(colorName)) {  
    return html2rgb(colorValues[colorName])
  } else {
    return  html2rgb('black')
  }

  }

function getCharWidthDefaultFont(c)
{
  return max(10,vector_char(0,0,c).width);
}

function getText(text, textSize, fontID){
  include("/../fonts/opentype.min.jscad");

        var font
        switch(fontID.toLowerCase()) {
          case 'gothic':
            font = getTextGothicBold();
            break;
          case 'arial':
            font = getTextArialRounded();
            break;
          default:
            logMsg('fail');
            throw('invalid font: ' + fontID)
        }
        var cagText = Font3D.cagFromString(font, text, textSize);
        return union(cagText, textSize);
      
      }

function getTextGothicBold() {
  include("/../fonts/fontsgothicb_ttf.jscad");
  return Font3D.parse(fontsgothicb_ttf_data.buffer);
}


function getTextArialRounded() {
  include("/../fonts/arlrdbd_ttf.jscad")
  return Font3D.parse(arlrdbd_ttf_data.buffer);

}

function getTextWidth(c, textSize = 28, font) {
    return getTextWidthBase(c, textSize, laxKerning = false, font).width
    }
function getCharWidth(c, textSize = 28, font) {
    return getTextWidthBase(c, textSize, laxKerning = true, font)
    }



function getTextWidthBase(c, textSize = 28, laxKerning, font) {

  var shift = 1
  var finalWidth
    if(c.trim() !== '')
    {
     // var testingFontSize = 28

    var character = getText(c,textSize, font).toPoints();
    var minVal =100;
    minVal = character.reduce((minVal, p) => p.x < minVal ? p.x : minVal, character[0].x)
    var maxVal = character.reduce((maxVal, p) => p.x > maxVal ? p.x : maxVal, character[0].x);
    var letterWidth = maxVal-minVal

    shift = (letterWidth/2 + minVal);
    if(laxKerning) {
       finalWidth = (pow(letterWidth / textSize * 2, .5) )*textSize/2;
      }
    else
       finalWidth = letterWidth;
    }
    else
    {
      finalWidth = textSize / 2;
    }  
    return {width: finalWidth, shift: shift}  
}

      