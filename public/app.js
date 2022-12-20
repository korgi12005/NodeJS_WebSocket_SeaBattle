//import { io } from "socket.io-client";
const alp=[' ','A','B','C','D','E','F','G','H','K','L',' '];
let player;
let nowId;
const socket=io();
socket.on("gamers",(g)=>{
    player=g;
console.log(g);


    socket.on("shootSer",(id)=>{
        console.log(id);
        const bd=document.querySelector('#your');
        const IDs=bd.querySelector(`#${id}`);
        console.log(IDs);
        if(IDs.classList.contains('shipCell')){
            IDs.setAttribute('class','redCell')
            socket.emit("responseShoot",true);
            
        }else{
            IDs.setAttribute('class','misCell');

            socket.emit("responseShoot",false);
        }
    })
    socket.on("respSer",(bool)=>{
        console.log(nowId);
        const enemyBoard=document.querySelector("#enemy");
        const cel=enemyBoard.querySelector(`#${nowId}`);
        if(bool){
            cel.setAttribute('class','redCell');
        }
        else{
            cel.setAttribute('class','misCell');
        }
    })
});


let adresShip=[];
const butLead=document.querySelector('#butLead');
butLead.addEventListener('click',queryLead);
const saveName=document.querySelector('#saveName');
saveName.addEventListener('click',clicksaveName);

function queryLead(request,rowHandler){
    function reqListener(event){
        let data = JSON.parse(this.responseText);
        if(data.length>0){

        }
    }
}

function clicksaveName(){
    const inp=document.querySelector("#inp");
    let name=inp.value;
    exports.nam=name;
    console.log(name);
}

// v
function ClickCell(){
    nowId=this.id;
    console.log(this.id)
    socket.emit('shootCl',this.id);
}
/*
function checkCell(id){
    const cel=document.getElementById(id);
    let arr=id.split(' ');
    for(let i=-1;i<=1;i++){
        for(let j=-1;j<=1;j++){
            if(i==0 && j==0 && +arr[1]!=0 && +arr[1]!=11 && +arr[0]!=0 && +arr[0]!=11){

            }else{
                let newId=((+arr[0]+i))+' '+((+arr[1]+j))
                console.log(newId);
                const cell=document.getElementById(newId);
                console.log(cell.classList)
            }
        }
    }
}
*/
function generateShip(){
    for(let i=0;i<15;i++){
        let i=Math.floor(Math.random()*10)+1;
        let al=Math.floor(Math.random()*10)+1;
        let cord='s'+al+"_"+i;
        adresShip.push(cord);
        console.log(cord);
        //checkCell(cord);
        const cel=document.getElementById(cord);
        cel.setAttribute('class','shipCell');
    }
}

function createShip(){
    const but=document.querySelector("#but");
    but.addEventListener("click", generateShip)
}

function createBoard(id){ // создание игровой доски где у каждой ячейки есть name='1 1'...'10 10'
    const tab=document.createElement('table');
    tab.setAttribute('id',id);
    for(let i=0;i<12;i++){

        const row=document.createElement('tr');
        for(let j=0;j<12;j++){
        const cell=document.createElement('td');
            if(i==0 || i==11){
                cell.setAttribute('class','ourcell');
                cell.innerText=alp[j];
                row.append(cell);
            }else
            if(j==0 || j==11){
                cell.setAttribute('class','ourcell');
                cell.innerText=11-i;
                row.append(cell);
            }else{
                cell.setAttribute('class','whitecell');
                cell.setAttribute('id','s'+(11-i)+'_'+j);
                if(id=="enemy")
                cell.addEventListener('click',ClickCell)

                row.append(cell);
            }

        }
        
        tab.append(row);
       // console.log(tab);

    }
    tab.setAttribute('class', 'board');
    document.body.append(tab);

}
createBoard("your");
createBoard("enemy");
const bo=document.querySelector('table');
createShip();




console.log(bo);