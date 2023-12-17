
let items = document.querySelectorAll(".items");
let dimBox = document.querySelector("#dim");
let textBox = document.querySelector("#textBox");

let posW = [[73,-2, 399] , [46, -1.5, 295] , [16, 46, 410], [71, 50, 525] ]; // x, y, w&h-px
let posM = [[-4,32, 160,] , [62, 60, 135] , [-3, 70, 200], [49, 20, 220]]; // x, y, scale-px

let posOutW = [[150,-50, 399] , [20, -58, 308] , [-40, 150, 410], [130, 150, 525],]; // x, y, scale-px
let posOutM = [[-70,15, 200] , [150, 90, 165] , [-60, 90, 230], [140, -50, 250],]; // x, y, scale-px

let posFocusW = [[18, 23, 500] , [18, 23, 500] , [18, 23, 500], [18, 23, 500]]; // x, y, scale-px
let posFocusM = [[15, 11, 280] , [15, 11, 280] , [15, 11, 280], [15, 11, 280]]; // x, y, scale-px

let textPosW = [[60, 38, 430] , [60, 40, 430] , [60, 40, 430], [60, 40, 430]]; // x, y, w&h-px
let textPosM = [[3, 54, 300] , [2.5, 54, 300] , [3, 54, 300], [3, 54, 300]]; // x, y, w&h-px

// 여기에는 텍스트를 넣습니다. 제목이 필요한 경우에는 따로 만들어주세요. 이게 귀찮으면.. html에 textBox를 4개 해놓고..껏다 켰다.
let textFill =[
    "음료 소비 전문가인 노스캐롤라이나 체플힐 대학의 베리 팝킨 영양학 교수는 코카콜라는 미국과 전 세계에서 비만을 일으킨 주요한 요인으로 남아있다며 미국에 있어서 비만을 일으키는 가장 큰 요인 제공자가 바로 설탕이 포함된 음료수이다며 즉각 비판하고 나섰다고 14일 USA투데이는 전했다.",
    "원래 산타클로스는 유럽의 엘프를 연상시키는 분위기에 초록색 옷을 입은 모습이었다. 그런데 사람들이 추운 겨울에는 음료를 잘 마시지 않는다는 점을 안 코카콜라 자신들의 이미지에 성직자인 산타클로스의 이미지를 조합시킨 것이다.",
    "사진작가 Kerstin Langenberger는 충격적인 한 장의 사진을 자신의 페이스북에 올렸다. 믿을 수 없을 정도로 말라버린 암컷 북극곰의 모습이다.",
    "코카콜라는 석유로 생산하는 일회용 플라스틱 용기의 사용량이 많아 소비자와 투자자, 환경운동가들로부터 해양 오염의 주범으로 꼽히고 있다."
];

let animationObj;

let aniMode = true; // true = in false = out;

let nowPos = new Array(5); // 현재 위치.
let targetPosIn = new Array(5); // 들어오기 목표위치
let targetPosOut = new Array(5); // 나가기 목표위치
let targetPosFocus = new Array(5); // 포커스 인덱스 아이템
let nowTextPos = new Array(5); // 텍스트박스. 

let nowIndex;
let wm; // window = true; mobile = false;

window.onload = function()
{
    init();
    console.log("start!");

}

function init()
{
    let resp = window.matchMedia("screen and (max-width: 768px)");

    if (resp.matches) {
        console.log("화면의 너비가 768px 보다 작습니다.");
        wm = false;
    } else {
        console.log("화면의 너비가 768px 보다 큽니다.");
        wm = true;
    }

    if(wm) // web desktop
    {
        
        
        for(let j = 0; j< items.length; j++)
        {
            nowPos[j] = posW[j].slice();
            targetPosIn[j] = posW[j].slice();
            targetPosOut[j] = posOutW[j].slice();
            targetPosFocus[j] = posFocusW[j].slice();
            nowTextPos[j] = textPosW[j].slice();

            console.log("targetPosIn[j]" + targetPosIn[j]);
            console.log("targetPosOut[j]" + targetPosOut[j]);
        }
    }
    else // mobile
    {
        
        
        for(let j = 0; j< items.length; j++)
        {
            nowPos[j] = posM[j].slice();
            targetPosIn[j] = posM[j].slice();
            targetPosOut[j] = posOutM[j].slice();
            targetPosFocus[j] = posFocusM[j].slice();
            nowTextPos[j] = textPosM[j].slice();
        }
    }

    textBox.style.visibility = "hidden";
    for(let  i = 0; i < items.length; i++ )
    {
        items[i].style.left = nowPos[i][0] + "%";
        items[i].style.top = nowPos[i][1] + "%";
        items[i].style.width = nowPos[i][2] + "px";
        items[i].style.height = nowPos[i][2] + "px";
        items[i].addEventListener('click', clickFn);
    }

    //startAnimation();
}



function clickFn(e)
{
    nowIndex = e.srcElement.getAttribute("clickVal");
    console.log(nowIndex);
    
    setBgToggle();
    

    if(aniMode){aniMode=false}
    else{aniMode=true}

    console.log("aniMode ====" + aniMode);
    startAnimation();
}


function setBgToggle()
{
    dimBox.classList.toggle("on");
}

let g = 0.1;
function circleMove()
{
    if(!aniMode)
    {
        console.log("out!!!");
        let tempIndex;
        for(let i=0; i<items.length; i++)
        {
            
            if(i != nowIndex)
            {

                nowPos[i][0] += (targetPosOut[i][0] - nowPos[i][0]) * g;
                nowPos[i][1] += (targetPosOut[i][1] - nowPos[i][1]) * g;
                nowPos[i][2] += (targetPosOut[i][2] - nowPos[i][2]) * g;
                tempIndex = i;
            }
            else
            {
                nowPos[i][0] += (targetPosFocus[i][0] - nowPos[i][0]) * g;
                nowPos[i][1] += (targetPosFocus[i][1] - nowPos[i][1]) * g;
                nowPos[i][2] += (targetPosFocus[i][2] - nowPos[i][2]) * g;
            }
        }

        if (
          Math.abs(targetPosOut[tempIndex][0] - nowPos[tempIndex][0]) < 0.01 &&
          Math.abs(targetPosOut[tempIndex][1] - nowPos[tempIndex][1]) < 0.01
        ) {
          textBox.style.visibility = "visible";
          textBox.style.left = nowTextPos[nowIndex][0] + "%";
          textBox.style.top = nowTextPos[nowIndex][1] + "%";
          textBox.innerHTML = textFill[nowIndex];
          cancelAnimationFrame(animationObj);
        } else {
          requestAnimationFrame(circleMove);
        }
    }
    else
    {
        console.log("in!!!");
        textBox.style.visibility = "hidden";
        for(let k=0; k<items.length; k++)
        {
            nowPos[k][0] += (targetPosIn[k][0] - nowPos[k][0]) * g;
            nowPos[k][1] += (targetPosIn[k][1] - nowPos[k][1]) * g;
            nowPos[k][2] += (targetPosIn[k][2] - nowPos[k][2]) * g;
        }

        if (
          Math.abs(targetPosIn[0][0] - nowPos[0][0]) < 0.01 &&
          Math.abs(targetPosIn[0][1] - nowPos[0][1]) < 0.01
        ) {
          cancelAnimationFrame(animationObj);
        } else {
          requestAnimationFrame(circleMove);
        }
    }
    
    for(let i=0; i<items.length; i++)
    {
        
        items[i].style.left = nowPos[i][0] + "%";
        items[i].style.top = nowPos[i][1] + "%";
        items[i].style.width = nowPos[i][2] + "px";
        items[i].style.height = nowPos[i][2] + "px";
    }
    
}


function startAnimation()
{
     animationObj = requestAnimationFrame(circleMove);
}