"use strict";

let divMainContent = document.getElementById("mainContent");
let deviceSelect = document.forms.deviceCreator.children[0];
let locationSelect = document.forms.deviceCreator.children[1];
let submitBtn = document.forms.deviceCreator.children[2];
let devices = [];

function refresh(){
   divMainContent.innerHTML = "";
   let deviceItem;
   for (let device of devices){
      deviceItem = buildDeviceItem(device);
      divMainContent.appendChild(deviceItem);
   }
}

function removeArrElem(arr, elem){
   let indexElem = arr.indexOf(elem);
   if(indexElem !== -1){
      arr.splice(indexElem, 1);
   }
   return arr;
}

submitBtn.onclick = function() {
   let deviceValue = deviceSelect.value;
   let locationValue = locationSelect.value;
   let deviceItemObj;
   let newDeviceItem;
   if(locationValue === ""){
      alert("Please select location!")
   } else {
      switch(deviceValue) {
         case "AirConditioning":
            deviceItemObj = new AirConditioning(locationValue);
            devices.push(deviceItemObj);
            break;
         case "Fridge":
            deviceItemObj = new Fridge(locationValue);
            devices.push(deviceItemObj);
            break;
         case "Lamp":
            deviceItemObj = new Lamp(locationValue);
            devices.push(deviceItemObj);
            break;
         case "TvSet":
            deviceItemObj = new TvSet(locationValue);
            devices.push(deviceItemObj);
            break;
         default:
            alert("Please select device!")
            break;
      }
      newDeviceItem = buildDeviceItem(deviceItemObj);
      divMainContent.appendChild(newDeviceItem);
      //deviceSelect[0].selected = true;
      //locationSelect[0].selected = true;
   }
}


function getFildsByTypeFromObj(obj, type){
   let propArr = [];
   for (let prop in obj) {
      if (obj[prop] instanceof type) {
         propArr.push(obj[prop]);
      }
   }
   return propArr;
}


function buildDeviceItem(deviceObj){
   let newItem = document.createElement("div");
   newItem.setAttribute("class", "deviceItem");
   
   //creating itemHead
   let delButton = document.createElement("button");
   delButton.className = "del-btn";
   delButton.type = "button";
   delButton.innerHTML = "<b>x</b>";
   delButton.onclick = function(){
      let removeItem = this.parentElement.parentElement;
      divMainContent.removeChild(removeItem);
      devices = removeArrElem(devices, deviceObj)
   };
   
   let pHead = document.createElement("p");
   pHead.innerText = `${deviceObj.constructor.name} in ${deviceObj.location}`;

   let itemHead = document.createElement("div");
   itemHead.className = "itemHead";
   itemHead.appendChild(delButton);
   itemHead.appendChild(pHead);
   
   //adding switch
   let btnOn = document.createElement("button");
   btnOn.className = "switch-btn on";
   btnOn.type = "button";
   btnOn.value = "On";
   btnOn.innerText = "On";
   if(deviceObj.switchState){
      btnOn.style.boxShadow = "0 0 7px 2px springgreen";
   }
   btnOn.onclick = function() {
      deviceObj.on();
      refresh();
   };
   
   let btnOff = document.createElement("button");
   btnOff.className = "switch-btn off";
   btnOff.type = "button";
   btnOff.value = "Off";
   btnOff.innerText = "Off";
   if(!deviceObj.switchState){
      btnOff.style.boxShadow = "0 0 7px 2px salmon";
   }
   btnOff.onclick = function() {
      deviceObj.off();
      refresh();
   };
   
   let switchElem = document.createElement("div");
   switchElem.className = "switch";
   switchElem.appendChild(btnOn);
   switchElem.appendChild(btnOff);
   
   let itemBody = document.createElement("div");
   itemBody.className = "itemBody";
   itemBody.appendChild(switchElem);
   
   //adding ranges
   let ranges = getFildsByTypeFromObj(deviceObj, Range);
   let rangeNames = [];
   for (let range of ranges) {
      let pRange = document.createElement("p");
      pRange.innerText = range.name + ":";
      
      let rangeBtnGroup = document.createElement("div");
      rangeBtnGroup.className = "range-group " + range.name;
      rangeNames.push(range.name);
      
      let rangePrevBtn = document.createElement("button");
      rangePrevBtn.className = "range-btn previous";
      rangePrevBtn.type = "button";
      rangePrevBtn.value = "previous";
      rangePrevBtn.innerHTML = "&#9668;";
      rangePrevBtn.onclick = function() {
         if(deviceObj.switchState){
            let rangeName = this.parentElement.className.split(" ").pop();
            let rangeIndex = rangeNames.indexOf(rangeName);
            ranges[rangeIndex].previousValue();
            refresh();
         }
      };
      
      let rangeInp = document.createElement("input");
      rangeInp.type = "text";
      if(deviceObj.switchState){
         rangeInp.value = range.currentValue;
      }
      rangeInp.onchange = function () {
         if(deviceObj.switchState) {
            let rangeName = this.parentElement.className.split(" ").pop();
            let rangeIndex = rangeNames.indexOf(rangeName);
            ranges[rangeIndex].currentValue = this.value;
            refresh();
         }
      };
            
      let rangeNextBtn = document.createElement("button");
      rangeNextBtn.className = "range-btn next";
      rangeNextBtn.type = "button";
      rangeNextBtn.value = "next";
      rangeNextBtn.innerHTML = "&#9658;";
      rangeNextBtn.onclick = function() {
         if(deviceObj.switchState){
            let rangeName = this.parentElement.className.split(" ").pop();
            let rangeIndex = rangeNames.indexOf(rangeName);
            ranges[rangeIndex].nextValue();
            refresh();
         }
      };
      
      rangeBtnGroup.appendChild(rangePrevBtn);
      rangeBtnGroup.appendChild(rangeInp);
      rangeBtnGroup.appendChild(rangeNextBtn);
      
      let range = document.createElement("div");
      range.className = "range";
      range.appendChild(pRange);
      range.appendChild(rangeBtnGroup);
      
      itemBody.appendChild(range);
   }

   //adding modes
   let modes = getFildsByTypeFromObj(deviceObj, Modes);
   for (let mode of modes) {
      let pMode = document.createElement("p");
      pMode.innerText = mode.name + ":";
      
      let selectMode = document.createElement("select");
      selectMode.name = "modes";
      selectMode.onchange = function() {
         if(deviceObj.switchState){
            mode.currentMode = selectMode.value;
            refresh();
         }
      }
      
      let options = mode.modes;
      let optMode;
      
      if(deviceObj.switchState){
         for (let opt = 0; opt < options.length; opt++) {
            optMode = document.createElement("option");
            optMode.value = options[opt];
            optMode.innerText = options[opt];
            selectMode.appendChild(optMode);
            if(optMode.value === mode.currentMode && deviceObj.switchState) {
               optMode.selected = true;
            } else {
               optMode.selected = false;
            }
         }
      }
      
      let modeDiv = document.createElement("div");
      modeDiv.className = "mode";
      modeDiv.appendChild(pMode);
      modeDiv.appendChild(selectMode);
      
      itemBody.appendChild(modeDiv);
   }
     
   //creating itemFoot
   let pFoot = document.createElement("p");
   pFoot.innerText = deviceObj.info();
   
   let itemFoot = document.createElement("div");
   itemFoot.className = "itemFoot";
   itemFoot.appendChild(pFoot);
   
   newItem.appendChild(itemHead);
   newItem.appendChild(itemBody);
   newItem.appendChild(itemFoot);
   
   return newItem;
}