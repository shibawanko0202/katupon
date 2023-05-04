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

const choice_SE = new Audio("bgm/選択音.wav");
choice_SE.volume = 0.1;
const attack_SE = new Audio("bgm/攻撃音.mp3");
attack_SE.volume = 0.4;


// コマンド設定

const katsuya = document.getElementById("katsuya");

const com_lists = document.getElementsByClassName(" command-list");
let current_command = 0;

const check_box = document.getElementById("check");
const check_lists = document.getElementsByClassName(" check-list");
let current_check = 0;
let check = false;

const text = document.getElementById("text");



document.addEventListener('keydown',(e)=>{

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
});

