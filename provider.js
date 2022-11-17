/*****************************************************************************
 * MIT License
 * 
 * Copyright (c) 2022 ZKLlab
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *****************************************************************************
 * The MIT License applies to this file only.
 *****************************************************************************/


// noinspection JSUnusedGlobalSymbols
/**
 * scheduleHtmlProvider入口函数
 * @return {string}
 */
function scheduleHtmlProvider() {
    if (location.host !== 'xk.autoisp.shu.edu.cn') {
        throw new Error('当前不在xk.autoisp.shu.edu.cn域内');
    }
    return _desensitization(_getContainerElement()).innerHTML;
}
function _getContainerElement() {
    var containerEl = document.querySelector('body > div.wrapper > div.content-wrapper > div.content > div > table > tbody > tr:nth-child(2) > td');
    if (location.pathname === '/StudentQuery/QueryCourseTable' && containerEl != null) {
        return containerEl.cloneNode(true);
    }
    return _fallbackHtmlProvider();
}
function _fallbackHtmlProvider() {
    var doc = _xhrFetchDocument('GET', '/StudentQuery/QueryCourseTable');
    var containerEl = doc.querySelector('body > div.wrapper > div.content-wrapper > div.content > div > table > tbody > tr:nth-child(2) > td');
    if (containerEl == null) {
        throw new Error('无法解析回退请求的响应');
    }
    return containerEl;
}
function _xhrFetchDocument(method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    if (method === 'POST') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    else {
        xhr.send();
    }
    return new DOMParser().parseFromString(xhr.responseText, 'text/html');
}
function _desensitization(el) {
    var _a, _b;
    (_b = (_a = el.querySelector('td:only-child')) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
    el.querySelectorAll('tr,th,td').forEach(function (tEl) {
        tEl.removeAttribute('style');
    });
    return el;
}
