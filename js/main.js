"use strict"

// BGM設定

const BGM = document.getElementById('bgm');
BGM.volume = 0.3;

// document.addEventListener('click', audioPlay);
// function audioPlay(){
//   if(BGM.paused){
//     BGM.play();
//   } else {
//     BGM.pause();
//   };
// };


// SE設定

const roulette_SE = new Audio("bgm/データ表示1.mp3");
roulette_SE.volume = 0.7;
const start_SE = new Audio("bgm/戦火を交えて(戦闘開始).mp3");
start_SE.volume = 0.3;
const choice_SE = new Audio("bgm/選択音.wav");
choice_SE.volume = 0.1;
const attack_SE = new Audio("bgm/攻撃音.mp3");
attack_SE.volume = 0.4;


// グラフ画面

const graph = document.getElementById("graph");
const lines = document.getElementsByClassName("line");
const values = document.getElementsByClassName("value");

let graph_switch = true;
let rotate_switch = false;

let select_01 = 18;
let select_02 = 36;
let select_03 = 12;
let select_04 = 34;
let v01 = 0;
let v02 = 0;
let v03 = 0;
let v04 = 0;

// コマンド設定

const katsuya = document.getElementById("katsuya");

const com_lists = document.getElementsByClassName(" command-list");
let current_command = 0;

const check_box = document.getElementById("check");
const check_lists = document.getElementsByClassName(" check-list");
let current_check = 0;
let check = false;

const text = document.getElementById("text");

const blackout = document.getElementById("blackout");
const main = document.getElementById("main");


document.addEventListener('keydown',(e)=>{

  if(graph_switch){

    if(e.code == 'Enter'){
      if(!rotate_switch){
        for(let i = 0;i < lines.length;i++){
          lines[i].classList.add("rotate");
        };
        rotate_switch = true;

        roulette_SE.currentTime = 0;
        roulette_SE.play();
        
        // for(let i = 0;i < values.length;i++){
        // };
        const countup01 = setInterval(()=>{
          v01++;
          values[0].textContent = v01;
          if(v01 == select_01){
            clearInterval(countup01);
          };
        },24);
        const countup02 = setInterval(()=>{
          v02++;
          values[1].textContent = v02;
          if(v02 == select_02){
            clearInterval(countup02);
          };
        },24);
        const countup03 = setInterval(()=>{
          v03++;
          values[2].textContent = v03;
          if(v03 == select_03){
            clearInterval(countup03);
          };
        },24);
        const countup04 = setInterval(()=>{
          v04++;
          values[3].textContent = v04;
          if(v04 == select_04){
            clearInterval(countup04);
          };
        },24);
        
      }else{
        graph.classList.add("off");
        main.classList.remove("blur");
        graph_switch = false;

        start_SE.currentTime = 0;
        start_SE.play();
        setTimeout(()=>{
          BGM.play();
        },5600);
        setTimeout(()=>{
          com_lists[current_command].classList.add("blink");
        },5950);
      };
    };

  } else {
    
    if(e.code == 'Space'){
      if(BGM.paused){
        BGM.play();
      } else {
        BGM.pause();
      };
    };
  
    if(!check){
      // 確認画面
      for(let i = 0;i < com_lists.length;i++){
        com_lists[i].classList.remove("blink");
      };
  
      if(e.code == 'ArrowUp'){
  
        current_command--;
        if(current_command < 0){
          current_command = 3;
        };
        com_lists[current_command].classList.add("blink");
  
      } else if(e.code == 'ArrowDown'){
  
        current_command++;
        if(current_command > 3){
          current_command = 0;
        };
        com_lists[current_command].classList.add("blink");
  
      } else if(e.code == 'Enter'){
  
        check = true;
        check_box.classList.add("apear");
        check_lists[current_check].classList.add("blink");
        
        choice_SE.currentTime = 0;
        choice_SE.play();
      } else {
        com_lists[current_command].classList.add("blink");
      };
      
    } else if(check){
      // 4択画面
      for(let i = 0;i < check_lists.length;i++){
        check_lists[i].classList.remove("blink");
      };
  
      if(e.code == 'ArrowUp'){
  
        current_check--;
        if(current_check < 0){
          current_check = 1;
        };
        check_lists[current_check].classList.add("blink");
  
      } else if(e.code == 'ArrowDown'){
  
        current_check++;
        if(current_check > 1){
          current_check = 0;
        };
        check_lists[current_check].classList.add("blink");
  
      } else if(e.code == 'Enter'){
  
        if(current_check === 0){
          attack_SE.currentTime = 0;
          attack_SE.play();
          katsuya.classList.add("flash");
          setTimeout(() => {
            katsuya.classList.remove("flash");
          }, "1000");
  
          if(current_command == 0){
            text.textContent = "・・・";
            blackout.classList.add("in");
          }else if(current_command == 1){
            text.textContent = "け、『けいえいはたん』";
          }else if(current_command == 2){
            text.textContent = "・・・";
          }else if(current_command == 3){
            text.textContent = "あ、そっすね・・・";
          };
        };
  
        check = false;
        current_check = 0;
        check_box.classList.remove("apear");
        com_lists[current_command].classList.add("blink");
      } else {
        check_lists[current_check].classList.add("blink");
      }
    };
  };

});

