function addClass(element: Element, cls: string): void {
    if (!hasClass(element, cls)) {
        element.className += ' ' + cls;
    }
}

function addChatMessageToChatHistory(chatHistory: Element, from: string, message: string): void {
    const timestamp: Date = new Date();

    const chatMessage: Element = document.createElement('div');

    addClass(chatMessage, 'chat-message');
    addClass(chatMessage, 'clearfix');

    const html: string = `
    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEwMjguNCkiPjxwYXRoIGQ9Im0xMiAwYy0wLjQwNSAwLTAuODA1IDAuMDYwMzI2LTEuMTg4IDAuMTU2MjUtMC4yMjQgMC4wNTY3OC0wLjQ0IDAuMTMxMzUtMC42NTYgMC4yMTg3NS0wLjA4MyAwLjAzNDAxLTAuMTY3OSAwLjA1NTM0LTAuMjQ5OCAwLjA5Mzc1LTAuMDM0IDAuMDE1ODMtMC4wNiAwLjA0NTk0LTAuMDkzNyAwLjA2MjUtMC4yMDMyIDAuMTAwNTgtMC40MDIxIDAuMjE3MDQtMC41OTM3IDAuMzQzNzUtMC4wMjcgMC4wMTc0LTAuMDY3MSAwLjAxMzM5LTAuMDkzOCAwLjAzMTI1LTAuMDU2MyAwLjAzODY0LTAuMTAxIDAuMDg0MTktMC4xNTYyIDAuMTI0OTUtMC4xNTY5IDAuMTEyNi0wLjMyMTYgMC4yMTYtMC40Njg4IDAuMzQzOC0wLjEzNDIgMC4xMjA3LTAuMjQ5NCAwLjI3MjQtMC4zNzUgMC40MDYyLTAuNDI1MSAwLjQzNTktMC43OTM2IDAuODk3MS0xLjA5MzggMS40Mzc2LTAuNTE1NCAwLjkwMzQtMC45MDAyIDEuOTIwNS0xLjA2MjQgMi45Njg3LTAuMDc4My0wLjAxNjUtMC4xNTAxLTAuMDIyNC0wLjIxODggMC0wLjUyNTEgMC4xNzEtMC42NTQ1IDEuMTY4NS0wLjMxMjUgMi4yMTg3IDAuMjAwNyAwLjYxNjMgMC41MzQ2IDEuMTAxNSAwLjg3NSAxLjM3NSAwLjQ1NzMgMS43Nzc4IDEuNDI1NyAzLjI1OTggMi42ODc1IDQuMTg3OHYxLjAzMWwtMSAxLTIgMWMtMS42MTczIDAuODAxLTMuMjI4NCAxLjYwNS00Ljg0MzggMi40MDYtMC44OTUxMyAwLjU0LTEuMjQxNSAxLjYtMS4xNTYyIDIuNTk0IDAuMDQxNjY0IDAuNjI2LTAuMTg0NDggMS40MjcgMC40Mzc1IDEuODQ0IDAuNTkwOSAwLjMwNCAxLjI5NTkgMC4xMDYgMS45Mzc1IDAuMTU2IDEuODc2Ni0wLjAwMSAzLjc0ODQgMCA1LjYyNSAwIDIuNjY5IDAuMDAxIDUuMzMxIDAgOCAwIDIuMzY3IDAgNC43MjcgMC4wMDQgNy4wOTQgMCAwLjc2OC0wLjA1NCAwLjk4MS0wLjg2NSAwLjkwNi0xLjUgMC4wMTQtMC45MzIgMC4wNjktMS45NzYtMC42NTYtMi42ODgtMC41OTItMC42MDItMS40MzQtMC44NC0yLjE1Ni0xLjI1LTEuMDYxLTAuNTI1LTIuMTI4LTEuMDM3LTMuMTg4LTEuNTYybC0yLTEtMS0xdi0xLjAzMWMxLjI2Mi0wLjkyOCAyLjIzLTIuNDEgMi42ODgtNC4xODc4IDAuMzQtMC4yNzM2IDAuNjc0LTAuNzU4OCAwLjg3NC0xLjM3NSAwLjM0Mi0xLjA1MDIgMC4yMTMtMi4wNDc3LTAuMzEyLTIuMjE4Ny0wLjA2OS0wLjAyMjQtMC4xNC0wLjAxNjUtMC4yMTkgMC0wLjE2Mi0xLjA0ODItMC41NDctMi4wNjUzLTEuMDYyLTIuOTY4Ny0wLjMtMC41NDA1LTAuNjY5LTEuMDAxNy0xLjA5NC0xLjQzNzYtMC4xMjYtMC4xMzM4LTAuMjQxLTAuMjg1NS0wLjM3NS0wLjQwNjItMC4wMDYtMC4wMDU1LTAuMDI1IDAuMDA1NS0wLjAzMSAwLTAuMzkyLTAuMzQ5OS0wLjgyNy0wLjYxODk0LTEuMjgxLTAuODQzNzUtMC4xMTUtMC4wNTYyMi0wLjIyNy0wLjEwODU0LTAuMzQ0LTAuMTU2MjUtMC4wODQtMC4wMzQwMS0wLjE2NS0wLjA2NDI2LTAuMjUtMC4wOTM3NS0wLjI1NS0wLjA4ODQ4LTAuNTE2LTAuMTczNTYtMC43ODItMC4yMTg3NS0wLjAyLTAuMDAzNDA1LTAuMDQyIDAuMDAzMTQ4LTAuMDYyIDAtMC4yNDktMC4wMzkxNDQtMC40OTUtMC4wNjUyNS0wLjc1LTAuMDYyNXoiIGZpbGw9IiMzNDQ5NWUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMTAyOC40KSIvPjxwYXRoIGQ9Im0wIDEwNTEuNGMwLjAyNjQxOSAwLjMgMC4xMjY1MSAwLjYgMC40Mzc1IDAuOCAwLjU5MDkgMC4zIDEuMjk1OSAwLjEgMS45Mzc1IDAuMmg1LjYyNSA4IDcuMDk0YzAuNTc2LTAuMSAwLjg0Mi0wLjUgMC45MDYtMWgtMjR6IiBmaWxsPSIjMmMzZTUwIi8+PC9nPjwvc3ZnPg==" alt="" width="32" height="32">
    <div class="chat-message-content clearfix">
        <span class="chat-time">${timestamp.getHours()}:${timestamp.getMinutes()}</span>
        <h5>${from}</h5>
        <p>${message}</p>
    </div>`;

    chatMessage.innerHTML = html;

    chatHistory.appendChild(chatMessage);
    chatHistory.appendChild(document.createElement('hr'));
}

function hasClass(element: Element, cls: string): boolean {
    return !!element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function onClickHeader(chat: Element, chatHistory: Element, header: Element): void {
    if (hasClass(chat, 'maximized')) {
        removeClass(chat, 'maximized');
        addClass(chat, 'minimized');
    } else if (hasClass(chat, 'minimized')) {
        addClass(chat, 'maximized');
        removeClass(chat, 'minimized');
    }

    scrollToBottomOfChatHistory(chatHistory);
}

function removeClass(element: Element, cls: string): void {
    if (hasClass(element, cls)) {
        const pattern = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        element.className = element.className.replace(pattern, ' ');
    }
}

function onKeyUpInput(chatHistory: Element, input: HTMLInputElement, keyCode: number): void {
    if (keyCode === 13) {
        const message: string = input.value;

        sendMessage(message);
        addChatMessageToChatHistory(chatHistory, 'You', message);
        scrollToBottomOfChatHistory(chatHistory);
    } else {
        sendTypingEvent();
    }
}

function sendMessage(message: string): void {
    console.log(message);
}

function sendTypingEvent(): void {

}

function scrollToBottomOfChatHistory(chatHistory: Element): void {
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

(() => {

    const chat: Element = document.querySelector('#live-chat .chat');

    const chatHistory: Element = document.querySelector('#live-chat .chat .chat-history');

    const header: Element = document.querySelector('#live-chat header');

    const input: HTMLInputElement = document.querySelector('#live-chat input[type=text]');

    header.addEventListener('click', () => {
        onClickHeader(chat, chatHistory, header);
    });

    input.addEventListener('keyup', (event: KeyboardEvent) => {
        onKeyUpInput(chatHistory, input, event.keyCode);
    });

})();
