"use strict";

//Lamp
class Lamp extends Device{
   constructor(locationName){
      super(locationName);
   }
}

//AirConditioning
class AirConditioning extends Device{
   constructor(locationName) {
      super(locationName);
      this._temperature = new Range("Temperature", 15, 40);
      this._modes = new Modes("Mode", ["Cool", "Heat", "Dry", "Air"]);
   }
   info(){
      let info = super.info();
      if(super.switchState){
         info += `${this._temperature.name}:${this._temperature.currentValue}`;
         info += `. ${this._modes.name}:${this._modes.currentMode}`;
      }
      return info;
   }
}

//TvSet
class TvSet extends Device{
   constructor(locationName) {
      super(locationName);
      this._volume = new Range("Volume", 0, 85);
      this._channels = new Range("Channel", 1, 28);
   }
   info(){
      let info = super.info();
      if(super.switchState){
         info += `${this._volume.name}:${this._volume.currentValue}`;
         info += `. ${this._channels.name}:${this._channels.currentValue}`;
      }
      return info;
   }
}

//Fridge
class Fridge extends Device{
   constructor(locationName) {
      super(locationName);
      this._temperature = new Range("Temperature", -5,10);
      this._modes = new Modes("Mode", ["Freez", "Cold", "Frost"]);
   }
   info(){
      let info = super.info();
      if(super.switchState){
         info += `${this._temperature.name}:${this._temperature.currentValue}`;
         info += `. ${this._modes.name}:${this._modes.currentMode}`;
      }
      return info;
   }
   
}