const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const wrong = document.createElement('audio')
const correct = document.createElement('audio')
var iserase
var isnote
var currentNum

wrong.setAttribute('src','./sai.mp3')
correct.setAttribute('src','dung.mp3')

function drawMap(){
    for(let i = 1; i <=9; i++) {
        let squareBig = document.createElement("div")
        squareBig.className = "squareBig"
        for(let j = 1; j <=9; j++) {
            let squareSM = document.createElement("span")
            squareSM.className="squareSM"
            squareSM.setAttribute("entered",false)
            let input = document.createElement("input")
            let text = document.createElement("span")
    
            input.setAttribute("type", "text")
            input.setAttribute("size", "1")
            input.setAttribute("maxlength","1")
    
            text.className = "textNumber"
    
            squareSM.appendChild(text)
            squareSM.appendChild(input)
            for(let k = 1; k <=9; k++) {
                let squareDraft = document.createElement("span")
                squareDraft.className="squareDraft"
                squareDraft.setAttribute("squareIndex", k)
                squareSM.appendChild(squareDraft)
            }
            squareBig.appendChild(squareSM)
            
        }
        boxgame.appendChild(squareBig)
    }
    $$(".squareBig").forEach((squareBig,i) => {
        let arrInput = squareBig.querySelectorAll("input")
        arrInput.forEach((input,j) => {
           if(j<3){
              input.setAttribute('tx',(j+1)+i%3*3)
              input.setAttribute('ty',1+i-(i%3))
           }else if(j<6){
              input.setAttribute('tx',(j+1)+(i%3-1)*3)
              input.setAttribute('ty',2+i-(i%3))
           }else {
              input.setAttribute('tx',(j+1)+(i%3-2)*3)
              input.setAttribute('ty',3+i-(i%3))
           }
           input.setAttribute('block',i+1)
           
        }) 
    })
}

function action(data){

    console.log(data)

    let arrInput = $$("input")
    document.addEventListener("keyup", function(ev){
        let el = $('.bold').querySelector('input')
        if(ev.key>='1' && ev.key <= '9' && !el.getAttribute('constant')){
           $(`.numpad-item[numpad="${ev.key-''}"]`).click() 
           erase.classList.remove('focus')     
        }else if(ev.keyCode==8){
            $('.bold').querySelectorAll('*:not(.textNumber[istrue="true"])').forEach(el=>{
                if($('.bold').querySelector('.textNumber').getAttribute('constant')!='true'){
                    el.textContent = ''
                }
            })
        }
    })

    arrInput.forEach(el=>{
        el.addEventListener("click", function(el){  
            let textNumber = $(".bold").querySelector('.textNumber')
            att = textNumber.getAttribute.bind(textNumber)
            if(erase.getAttribute('iserase')=='true'){
                el.target.parentElement.querySelectorAll('*:not(.textNumber[istrue="true"])').forEach(e=>{
                    if(!e.getAttribute('constant')){
                        e.textContent=''
                    }      
                })
            }    
            let button = $('.focus[numpad]')
            if(button){
                let squareSM = $('.bold')  
                let num = $('.focus[numpad]').textContent-''  
                if(note.getAttribute('isnote')=='true'){
                    if(!squareSM.querySelector('.textNumber').getAttribute('constant') && $('.bold .textNumber').getAttribute('istrue')=='false'){
                        squareSM.querySelector('.textNumber').textContent = ''  
                        let block = $('.bold').querySelector('input').getAttribute('block')
                        let isTrue = checkNum(block,$('.focus[numpad]').getAttribute('numpad'))
                        let numCurrent = squareSM.querySelector(`.squareDraft[squareindex="${num}"]`)
                        if(numCurrent.textContent) {
                            numCurrent.textContent = ''
                        }else if(isTrue) { 
                            let elNum = numCurrent.parentElement.querySelector('.textNumber')
                            let att = elNum.getAttribute.bind(elNum)
                            if(!att('constant') || $('.bold ').querySelector('.textNumber').getAttribute('istrue')!='true'){
                                numCurrent.textContent = num 
                            }
                            
                        }   
                    }
                    
                }else {
                    squareSM.querySelectorAll('.squareDraft').forEach(item =>{
                        item.textContent = ''
                    })
                    if($('.bold .textNumber').getAttribute("constant")){
                        return
                    }
    
                    if($('.bold .textNumber').getAttribute('istrue')=='false'){
                        squareSM.querySelector('.textNumber').textContent = num 
                        let att = squareSM.querySelector('input').getAttribute.bind(squareSM.querySelector('input'))
                        let x = att('tx')
                        let y = att('ty') 
                        let istrue = squareSM.querySelector('.textNumber').getAttribute('istrue')=='true'
                        if(data[y-1][x-1]==num) {
                            if(istrue){
                                return
                            }
                            squareSM.querySelector('.textNumber').setAttribute('isTrue','true')
                            correct.pause()
                            correct.play()
                        }else{
                            squareSM.querySelector('.textNumber').setAttribute('isTrue','false')
                            wrong.pause()
                            wrong.play()
                        }
                    }
                    
                }
                glow($('.focus[numpad]').getAttribute("numpad"))
            }
             
        })

        el.addEventListener('blur', ()=>{
            $$('.glow:not(.squareDraft)').forEach(el=>{
                el.className = "textNumber"
            })
        })

        el.addEventListener("focus", el=>{
            let constant = el.target.parentElement.querySelector('.textNumber')
            if(constant.getAttribute('constant') || constant.getAttribute('istrue')=='true'){
                glow(constant.textContent)
            }
            arrInput.forEach(el=>{
                el.parentElement.classList.remove("bowl")
                el.parentElement.classList.remove("bold")
            })
            el.target.parentElement.classList.add("bold")
            let tx = el.target.getAttribute("tx")
            let ty = el.target.getAttribute("ty")
            let block = el.target.getAttribute("block")
            
            arrInput.forEach(el =>{       
                if(el.getAttribute("tx") == tx || el.getAttribute("ty")== ty || el.getAttribute("block") == block){
                    el.parentElement.classList.add("bowl")
                }
            
            })
            
        })

        
    
    })

    

    $$(".numpad-item").forEach(el=>{
        el.addEventListener("click",function(ev){
            $$(".numpad-item").forEach(el=>{
                el.classList.remove("focus")
            })
            erase.classList.remove('focus')
            erase.setAttribute("iserase",'false')
            iserase = false
            el.classList.toggle("focus")
            let num = ev.target.getAttribute("numpad")-''
            let squareSM = $('.bold')  

            if(!squareSM){
                return
            }
            if($('.bold').querySelector('.textNumber').getAttribute('constant') || $('.bold').querySelector('.textNumber').getAttribute('istrue')=='true'){
                let num = $('.bold').textContent-''
                
                $(`button[numpad="${num}"]`).click()
            }        
        })
    })

}



function checkNum(block,num,inputCurent,isAutoWirte){
    const animate = [
        {},
        {backgroundColor: 'rgb(255 139 148 / 0.6)'}
    ]
    const timing = {
        duration: 400,
        iterations: 1,
    }
    let numZoom = $$(".squareDraft")
    if(!inputCurent){
        inputCurent = $('.bold').querySelector('input') 
    }
    inputCurent = inputCurent.getAttribute.bind(inputCurent)
    let tx = inputCurent('tx')
    let ty = inputCurent('ty')
    let isTrue = true
    for (let i = 0; i <numZoom.length; i++) {
        let el = numZoom[i].parentElement.querySelector('input')
        let att = el.getAttribute.bind(el)
        let x = att('tx')
        let y = att('ty')
        let b = att('block')
        if(tx ==x || ty == y || b==block){
            let textNumber = numZoom[i].parentElement.querySelector('.textNumber')   
            if(num==textNumber.textContent && (textNumber.getAttribute('constant') || textNumber.getAttribute('istrue')=='true')){
                if(!isAutoWirte){
                    textNumber.animate(animate,timing)
                } 
                isTrue = false
            }
        }
    }
    if(!isTrue){
        return false
    }
    return true
}

function glow(num){
    $$('.squareDraft').forEach(e=>{
        e.classList.remove('glow')
    })
    $$('.textNumber').forEach(e=>{
        e.classList.remove('glow')
    })
    $$('.squareDraft').forEach(e=>{
        if(e.textContent==num){
            e.classList.add('glow')
        }
    })
    $$('.textNumber').forEach(e=>{
        if(e.textContent==num){
            e.classList.add('glow')
        }
    })
}


function fillNumber(data){
    data.board.forEach((item,index)=>{
        $$('input').forEach(e=>{
            text = e.parentElement.querySelector('.textNumber')
            if(e.getAttribute('ty')==index+1){
                if(item[e.getAttribute('tx')-'1'] >0){
                    text.textContent=item[e.getAttribute('tx')-'1'] 
                    e.parentElement.querySelector('.textNumber').setAttribute('constant',true)
                }else{
                    e.parentElement.querySelector('.textNumber').setAttribute('isTrue',false)
                }         
            }
        })
    }) 
}

async function getQuestion(){
    data = await fetch('https://sugoku.herokuapp.com/board?difficulty=hard')
    data = await data.json();
    fillNumber(data)
    return data
}

async function getAnswer(){
    const encodeParams = (params) => 
        Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&')
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    answer = await fetch('https://sugoku.herokuapp.com/solve', {
    method: 'POST',
    body: encodeParams(data),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(response => {      
        return response.solution
    })
    return answer
    

}

function autoWrite(){
   document.querySelectorAll('input').forEach(el=>{
       let inputCurent = el
       let block = el.getAttribute('block')
       el.parentElement.querySelectorAll('.squareDraft').forEach(sq=>{
           let num = sq.getAttribute('squareindex')
           if(checkNum(block,num,inputCurent,true) ){
               
                let elNum = sq.parentElement.querySelector('.textNumber')
                let att = elNum.getAttribute.bind(elNum)
                if(att('constant')!='true' && att('istrue')=='false'){
                    sq.textContent = num 
                    sq.parentElement.querySelector('.textNumber').textContent = ''
                }
           }
       })
   })
}



async function startGame(){
     currentNum = null
     isNote = false
     isErase = false
    actionTiming = []

    drawMap()
    const data = await getQuestion().then(data =>{
       return data
    })
    const answer = await getAnswer(data);
    action(answer)
    erase.addEventListener('click', function(){
        erase.classList.toggle('focus')
        note.classList.remove('focus')
        let isTrue = erase.getAttribute('iserase') == 'true' ? false : true
        erase.setAttribute('iserase', isTrue)
        isErase = isErase == false ? true : false
        $$('.numpad-item').forEach(el =>{
            el.classList.remove('focus')
        })
        console.log(isErase)
    })
    note.addEventListener('click', function(){
        note.classList.toggle('focus')
        erase.classList.remove('focus')
        let isTrue = note.getAttribute('isnote') == 'true' ? false : true
        note.setAttribute('isnote', isTrue)
        isNote = isNote == false ? true : false
        console.log(isNote) 
    })


    
}


startGame()