import {tabQuizJs} from "./quizJavascript.js"
import {quizPython} from "./QuizPython.js"
const Letters = ["A","B","C","D","E","F","G","H","I","J"]


const verifyResult = (e)=>{
    const propositions = Array.from(document.querySelectorAll("#Proposition"))
    propositions.forEach(proposition=>{
        const input = proposition.querySelector("input")
        console.log(input.getAttribute("responseType"))
        if(input.getAttribute("responseType")==="true") proposition.style.color = "green"
        else proposition.style.color = "red"
    })
}


const changeQuiz = (target,ul,li,propoTmp,imgContainer)=>{
    if(target.value === ul.getAttribute("activeLanguage")) 
        return

        ul.setAttribute("activeLanguage",target.value)
        let dataTable = []
        const logo = document.querySelector(".logo")
        const slogant = document.querySelector(".slogant")
        const Ennoncer = document.querySelector(".Ennoncer")
        if(!slogant.classList.contains("actif")) {
            slogant.classList.add("actif")
            Ennoncer.style.display = "block"
        }

        if(target.value === "JS"){
            dataTable = tabQuizJs
            logo.style.backgroundImage = `url(./images/js.jpeg)`
        }
        else if(target.value === "Py"){
            dataTable = quizPython
            logo.style.backgroundImage = `url(./images/Py.webp)`
        }
        const ulChildren = Array.from(ul.children)
        
        
        const btn = document.querySelector(".correction")
        btn ?btn.remove():""
        imgContainer.style.display = "none"
      
        ulChildren.forEach(chd=>{
            chd.remove()
        })
        if(target.value==="#") {
            ul.remove()
            imgContainer.style.display = "flex"
            logo.style.backgroundImage = `url(./images/quiz.jpeg)`
            slogant.classList.remove("actif")
            Ennoncer.style.display = "none"
            return
        }
        dataTable.forEach((quiz, index)=> {
            let question = li.cloneNode(true)
            
            question.querySelector("div > h2").innerText = `Question ${quiz.numero}`
            question.querySelector("#Question-lib").innerText = quiz.question
            let image = quiz.image? quiz.image:undefined
            if(image){
               let div = question.querySelector("#Code-img")
               div.style.backgroundImage= `url(${image})`
               div.style.display= "block"
            }
            quiz.proposition.forEach((p,index2)=>{
                let propo = propoTmp.cloneNode(true)
                let label = propo.querySelector("label")
                let input = propo.querySelector("input")
                input.name=`resp-${index +""+ index2}`
                input.setAttribute("responseType",p.nature)
                label.setAttribute("for",`resp-${index+index2}`)
                label.innerText = p.libele

                question.querySelector("div").appendChild(propo)
            })
 
            ul.appendChild(question)
        })
        const button = document.createElement("button")
        button.type = "Submit"
        button.innerText = "Corriger"
        button.classList.add("correction")
        button.addEventListener("click",(e)=>{
            verifyResult(e)
        })
        document.body.appendChild(ul)
        document.body.appendChild(button)
}

window.addEventListener("DOMContentLoaded",(e)=>{
    const li = document.querySelector("#template").content
    const ul = document.createElement("ul")
    const select = document.querySelector("#Language")
    const selectChild = Array.from(select.children)
    ul.id = "question-container"
    ul.className = "question-container"
    ul.setAttribute("activeLanguage","#")
    const propoTmp = document.querySelector("#propo-tmp").content
    const imgContainer = document.querySelector("#img-container")
    
    
    Array.from(imgContainer.children).forEach(div=>{
        div.addEventListener("click",(e)=>{
            console.log(e.target.getAttribute("value"))
            selectChild.forEach(s=>{
            if(s.value === e.target.getAttribute("value")){
                s.setAttribute("selected",true)
                changeQuiz(s,ul,li,propoTmp,imgContainer)
                // imgContainer.style.display = "none"
            }
            else s.removeAttribute("selected")
        })
    })
})

    select.addEventListener("change",(e)=>{
        changeQuiz(e.target,ul,li,propoTmp,imgContainer)
 
    })
})