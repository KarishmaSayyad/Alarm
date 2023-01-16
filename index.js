const setAlarm=document.querySelector("#set");
const content=document.querySelector(".content");
const alarmTime=document.querySelectorAll("select");
const resetAlarm=document.querySelector("#reset");
var addactive=document.getElementById("clockImg");

var secds=0;
// let isAlarmSet=false;
let alarm_time="";
let alarmList=[];
let tone=new Audio("./tone.mp3");
let currTime_display="";
document.getElementById("off").style.display="none";
document.getElementById("reset").style.display="none";

setInterval(currTime,1000);

//set current time function
function currTime(){
   
   const d = new Date();
   document.getElementById("currTime").innerHTML = d.toLocaleTimeString();
   let hr=d.getHours();
   let min=d.getMinutes();
   let sec=d.getSeconds();
   secds=sec;
   let currampm="AM";  

   //set am or pm 12hr 
      if(hr>=12){
         hr=hr-12;
         currampm="PM";
      }

      hr=hr==0 ? (hr=12):hr;
      hr=hr<10?"0"+hr:hr;
      min=min<10?"0"+min:min;
      sec=sec<10?"0"+sec:sec;

      //display current time
      currTime_display.innerHTML=`${hr}:${min}:${currampm}`;
      currTime_display=`${hr}:${min}:${currampm}`;

   //rang alaram tone check current & set alarm
   
   if(alarmList.length>=0){
      for(var i=0;i<alarmList.length;i++)
      {    
         if(alarmList[i]==`${hr}:${min}:${sec}:${currampm}`)
         {  
            tone.play();      
            document.getElementById("off").style.display="";              
            
            addactive.classList.add("activate");
            addactive.addEventListener("click",pause_alarm);
         }
      }
   }
}

for(let i=12;i>0;i--){
   i=i<10 ? "0"+ i : i;
   let opt=`<option value="${i}">${i}</option>`;
   alarmTime[0].firstElementChild.insertAdjacentHTML("afterend",opt);
   document.getElementById("reset").style.display="";
}

for(let i=59;i>=0;i--){
   document.getElementById("reset").style.display="";
    i=i<10 ? "0"+ i : i;
    let opt=`<option value="${i}">${i}</option>`;
    alarmTime[1].firstElementChild.insertAdjacentHTML("afterend",opt);
 }

 for(let i=59;i>=0;i--){
   document.getElementById("reset").style.display="";
   i=i<10 ? "0"+ i : i;
   let opt=`<option value=secds>secds</option>`;
   alarmTime[2].firstElementChild.insertAdjacentHTML("afterend",secds);
}
 for(let i=2;i>0;i--){
   document.getElementById("reset").style.display="";
    let mid=i==1 ? "AM" : "PM";
    let opt=`<option value="${mid}">${mid}</option>`;
    alarmTime[3].firstElementChild.insertAdjacentHTML("afterend",opt);
 }
   
 //reset the alarm values

 resetAlarm.addEventListener("click",resetfunction);

 function resetfunction(){
   document.getElementById("off").style.display="none";
   
    const hr=document.getElementById("hour");
    const min=document.getElementById("min");
    const ampm=document.getElementById("ampm");
   
    hr.selectedIndex="00";
    min.selectedIndex="00";
    ampm.selectedIndex="00";  
}

//set time for alarm 

   function setAlarmfun() {  

         document.getElementById("off").style.display="none";
         let time = `${alarmTime[0].value}:${alarmTime[1].value}:${alarmTime[2].value}:${alarmTime[3].value}`;
         alarm_time=`${alarmTime[0].value}:${alarmTime[1].value}   ${alarmTime[3].value}`;

         if (time.includes("hour") || time.includes("min") || time.includes("ampm")) {
            return alert("Please, select  a valid time to set Alarm!");
         }

      alarmList.push(time); //add alarm in array
      
      createlist(alarm_time); // call create function for create alarm list
      alarm_time = time;
      // isAlarmSet = true;
      resetfunction(); //reset value using reset function
      return alert("Alarm Set");
      
   }
   setAlarm.addEventListener("click", setAlarmfun);

let list=document.querySelector(".alarmList-container");
var alarmcnt=0;

//create alarm list
      function createlist(time){
         document.getElementById("reset").style.display="";
         alarmcnt++;  
         let show_alarm_list=`   
                                 <div class="alarmList" id="alarm${alarmcnt}" ><span id="span${alarmcnt}">${time}</span>                            
                                    <i class="fa-solid fa-trash-can" id="${alarmcnt}" onclick="delete_alarm(this.id)"></i>                                                           
                                 </div>
                              `;  
         list.insertAdjacentHTML("afterend",show_alarm_list);
         
      }

   const stopalarm= document.querySelector("#off");
   stopalarm.addEventListener("click",pause_alarm);

//function for pause alarm and music

   function pause_alarm(){
         tone.pause();
         alarm_time="";
         document.getElementById("off").style.display="none";

         var addactive=document.getElementById("clockImg");         
         addactive.classList.remove("activate");
         // return(isAlarmSet=false);
   }

// remove alarm from list

function delete_alarm(alarmcnt){

   var remove_id=document.getElementById("alarm"+alarmcnt);      
   var del=alarmcnt-1;
   alarmList.splice(del,1," ");
   remove_id.remove();   
}