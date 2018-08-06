window.onload=function() {
    consoleText();
}
function consoleText() {
    //获取元素
    var inputText = document.querySelectorAll(".console > .console-input")[0];
    var confirmBtnEle = document.querySelectorAll(".console > .confirmbtn")[0];
    var consoleBtnEle = document.querySelectorAll(".console > .consolebtn")[0];
    var showBox = document.querySelectorAll(".console > .console-show")[0];

    //注册事件
        //添加事件，使输入到到输出台中
    confirmBtnEle.addEventListener('click',showfunc,false);
    inputText.addEventListener('keypress',enterAdd,false);
        //显示console框
    consoleBtnEle.addEventListener('click',() => {
                showBox.style.display = 'block';
                consoleBtnEle.style.display = 'none';
        },false)

    //工具函数
        //添加相应样式
    function addEleStyle(str,parentNode) {
        if(str.indexOf('console.warn') == 0) {
            parentNode.classList.add('warn');
        }else if(str.indexOf('console.error') == 0) {
            parentNode.classList.add('error');
        }else if(str.indexOf('console.log') == 0) {
            parentNode.classList.add('log');
        }else if(str.indexOf('console.info') == 0) {
            parentNode.classList.add('info');
        }else{
            parentNode.classList.add('ordinary');
        }
    }

       //让输入的内容显示在输出台
    function showfunc() {
                var newp = document.createElement('p');
                newp.innerHTML = inputText.value;
                inputText.value = '';
                //添加内容和对应的样式
                addEleStyle(newp.innerHTML,newp);
                var content = reg(newp.innerHTML);
                newp.innerHTML = content;
                showBox.appendChild(newp);
    }

        //添加回车事件
    function enterAdd(e) {
        e = e || window.event;
        if(e.keyCode == 13){
            showfunc();
        }
    }

        //在输出中过滤掉console.log/warn/error/info的正则表达式
    function reg(str) {
        var newstr = str.replace(/(console\.(log|warn|info|error)\(|\)|;)/g,'');
        return newstr;
    }
}