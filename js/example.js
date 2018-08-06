const msgType = {
    INFO: 'info',
    ERROR: 'error'
}

const $ = document.querySelectorAll.bind(document);


class Console {

    constructor() {
        this.consoleEle = $('.console > .console-show')[0];
        this.consoleBtnEle = $('.consolebtn')[0];
        this.consoleShowStatus = false;

        this.initEvent();
        this.bindConsole();
    }

    initEvent() {
        this.consoleBtnEle.addEventListener('click', () => {
            this.consoleShowStatus = !this.consoleShowStatus;
            if (this.consoleShowStatus) {
                this.consoleEle.style.display = 'block';
            } else {
                this.consoleEle.style.display = 'none';
            }
        }, false);
    }

    bindConsole() {
        var _this = this;

        var originInfo = console.info;

        console.info = function (message) {
            _this.appendMessage(new Message(message, msgType.INFO));
            originInfo(message);
        }

        var originError = console.error;

        console.error = function (message) {
            _this.appendMessage(new Message(message, msgType.ERROR));
            originError(message);
        }
    }

    appendMessage(message) {
        this.consoleEle.appendChild(message.toHtml());
    }


}

class Message {
    constructor(content, type) {
        this.content = content;
        this.type = type;
    }

    toHtml() {
        const p = document.createElement('p');
        p.className = this.type;
        p.innerText = this.content;
        return p;

    }
}

window.onload=function() {
    new Console();
}