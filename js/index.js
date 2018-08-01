window.onload=function(){
    consoleText();
}
function consoleText() {
    //获取元素
    var inputText = document.querySelectorAll(".box > .input_text");
    var btn1 = document.querySelectorAll(".box > .btn");
    var btn2 = document.querySelectorAll(".box > .showbtn");
    var showBox = document.querySelectorAll(".box > .show");

    //注册事件
    btn1.forEach( (ele) => {
        ele.addEventListener("click",() => {
            inputText.forEach( (text) => {
                showBox.forEach( (show) => {
                    var newp = document.createElement("p");
                    newp.innerHTML = text.value;
                    text.value = "";
                    //添加内容和对应的样式
                    addEleStyle(newp.innerHTML,newp);
                    var a = reg(newp.innerHTML);
                    newp.innerHTML = a;
                    show.appendChild(newp);

                })
            })
        },false)
    });

    btn2.forEach( (ele) => {
        ele.addEventListener("click",() => {
            showBox.forEach((block) => {
                block.style.display = "block";
                ele.style.display = "none";
            })
        },false)
    });

    //工具函数
    function addEleStyle(str,parentNode) {
        if(str.indexOf("console.warn") !== -1) {
            parentNode.classList.add("warn");
        }else if(str.indexOf("console.error") !== -1) {
            parentNode.classList.add("error");
        }else if(str.indexOf("console.log") !== -1) {
            parentNode.classList.add("log");
        }else if(str.indexOf("console.info") !== -1) {
            parentNode.classList.add("info");
        }else{
            parentNode.classList.add("ordinary");
        }
    }

    function reg(str) {
        var newstr = str.replace(/(console\.(log|warn|info|error)\(|\))/g,"");
        return newstr;
    }
}