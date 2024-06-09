let container=document.querySelector('#container')

const n=20;
const array=[]
init();

//for audio
let audioCtx=null;

function playNote(freq){
    if(audioCtx==null)
    {
        audioCtx=new(
            AudioContext|| webkitAudioContext || window.webkitAudioContextw
        )();
    }
    const dur=0.1;
const osc=audioCtx.createOscillator();
osc.frequency.value=freq;
osc.start();
osc.stop(audioCtx.currentTime+dur);
const node=audioCtx.createGain();
node.gain.value=0.1;
node.gain.linearRampToValueAtTime(0,audioCtx.currentTime+dur);
osc.connect(node);
node.connect(audioCtx.destination);
}



function init(){
    
    for(let i=0;i<n;i++)
    {
        array[i]=Math.random();
    }
    showBars();
    
}

function play(){
    const copy=[...array];
    const swaps=bubbleSort(copy);
    animate(swaps);
}
function animate(swaps){
    if(swaps.length==0){
        showBars();
        return;
    }
    const [i,j]=swaps.shift();
    [array[i],array[j]]=[array[j],array[i]];

    playNote(200+array[i]*500);
    playNote(200+array[j]*500);
    showBars([i,j]);
    setTimeout(()=>{
        animate(swaps);
    },50);
}
function bubbleSort(array)
{
    const swaps=[];
do{
    var swapped=false;
    for(let i=1;i<array.length;i++)
    {
        if(array[i-1]>array[i]){
            swapped=true;
            swaps.push([i-1,i]);
            [array[i-1],array[i]]=[array[i],array[i-1]];
        }
    }
}while(swapped)
return swaps;
}


function showBars(indices){
//creating bars
container.innerHTML="";
for(let i=0;i<array.length;i++)
{
     const bar=document.createElement("div");
     bar.style.height=array[i]*100+"%";
     bar.classList.add("bar");

     if(indices && indices.includes(i)){
        bar.style.backgroundColor="red";
     }
     container.appendChild(bar);
}
}
