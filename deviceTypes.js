"use strict";

//type Switch
class Switch{
   constructor(){
      this._state = false;
   }
   get state(){
      return this._state;
   }
   set state(booleanValue){
      this._state = booleanValue;
   }
};


//type Range
class Range{
   constructor(nameRange, minValue, maxValue) {
      this._name = nameRange;
      this._minValue = minValue;
      this._maxValue = maxValue;
      this._currentValue = minValue;
   }
   get name(){
      return this._name;
   }
   get currentValue(){
      return this._currentValue;
   }
   set currentValue(newCurrentValue){
      if (newCurrentValue >= this._minValue && newCurrentValue <= this._maxValue) {
         this._currentValue = newCurrentValue;
      }
   }
   previousValue(){
      if (this._currentValue > this._minValue) {
         this._currentValue--;
      }
   }
   nextValue() {
      if (this._currentValue < this._maxValue) {
         this._currentValue++;
      }
   }
}


//type Modes
class Modes{
   constructor(nameModes, modesArr) {
      this._name = nameModes;
      this._modes = modesArr;
      this._currentMode = this._modes[0];
   }
   get name(){
      return this._name;
   }
   get modes(){
      return this._modes;
   }
   get currentMode(){
      return this._currentMode;
   }
   set currentMode(newCurrentMode){
      if(this._modes.indexOf(newCurrentMode) !== -1) {
         this._currentMode = newCurrentMode;
      }
   }
}


//Device
class Device{
   constructor(locationName){
      this._locationName = locationName;
      this._switch = new Switch();
   }
   get location(){
      return this._locationName;
   }
   get switchState(){
      return this._switch.state;
   }
   on(){
      this._switch.state = true;
   }
   off(){
      this._switch.state = false;
   }
   info(){
      if(this._switch.state) {
         return "Device is on. "; 
      } else {
         return "Device is off. "; 
      }
   }
}