/*
ASCII Plasma (c) 2006 by Lee W. Fastenau
Feel free to use and/or modify this code as long as you don't make money from it.
This attribution must stay.  Stay, it must.  Yes.
*/


export function Plasma(elem,width,height) {
  this.elem = elem;
  this.width = width;
  this.height = height;
  
  this.row = 0;
  this.timeShift = 0;
  this.renderString = '';
  
  this.functions = [
    function (x,y,t) {
      return (Math.sin(x*.15-new Date()*.008))+1;
    },
    function (x,y,t) {
      return (Math.sin((y-10)*.3*(t-2)+new Date()*.008))+1;
    },
    function (x,y,t) {
      return (Math.sin(Math.sqrt(Math.pow(x/2-10,2)+Math.pow(y-10,2))*(0.4)))+1;
    }
  ];
  var theThis = this;
  this.intervalId = setInterval (function(){theThis.draw()},1);
}

Plasma.prototype.draw = function () {
    this.timeShift = new Date();
    this.renderString = '\r\n';

  for (var y=0;y<this.height;y++) {
    for (var x=0;x<this.width;x++) {
      this.renderString += Plasma.palette.charAt(Math.round(this.calcValueFaster(x,y,this.timeShift)*(Plasma.maxPaletteIndex)));
    }
    this.renderString += '\r\n';
  }
  //outStr += ' ';
  this.elem.firstChild.nodeValue = this.renderString;
}

Plasma.prototype.calcValue = function (x,y,t) {
  var retVal = 0;
  var numFunctions = this.functions.length;
  for (var i=0;i<numFunctions;i++) {
    retVal += this.functions[i](x,y,t);
  }
  return retVal/(numFunctions*2);
}

Plasma.prototype.calcValueFaster = function (x,y,t) {
  // var retVal = (Math.sin(x*.12-t*.003));
  // retVal += (Math.sin((y-10)*.4*(Math.sin(t/1200)-2)+new Date()*.002));
  // retVal += (Math.sin(Math.sqrt(Math.pow(x/4-10,2)+Math.pow(y-10,2))*(0.2)));
  // retVal = retVal / 8 + 0.5;
  var retVal = (Math.sin(x*.15-t*.008));
  retVal += (Math.sin((y-10)*.3*(Math.sin(t/800)-2)+new Date()*.008));
  retVal += (Math.sin(Math.sqrt(Math.pow(x/2-10,2)+Math.pow(y-10,2))*(0.4)));
  retVal = retVal / 6 + 0.5;
  return retVal;
}

Plasma.palette = ' `.!:/;([icILYOPXBMBXPOYLIci[(;/:!.`';
// Plasma.palette = ' `.!:/;([icILYOPXBMBXPOYLIci[(;/:!.` .:;[cLOXMPLi;!           ';
Plasma.maxPaletteIndex = Plasma.palette.length-1;

