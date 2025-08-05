(function() {
    if (typeof self === 'undefined' || !self.document) {
        return;
    }

    var roulette = false;
    if(!window.fail_count){
        window.fail_count = 0;
    } 
    function periodicClick() {
         console.log("当前：", window.location.href);
         if(window.location.href.includes("desktop")){
            let targetElement;
            if (roulette) {
                // 找到“轮盘”相关的元素并模拟点击
                targetElement = Array.from(document.querySelectorAll('span.i1_jg')).find(el => el.textContent && el.textContent.includes('轮盘'));
            } else {
                // 找到“骰宝”相关的元素并模拟点击
                targetElement = Array.from(document.querySelectorAll('span.i1_jg')).find(el => el.textContent && el.textContent.includes('骰宝'));
            }
            if (targetElement) {
                // 触发点击事件
                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                targetElement.dispatchEvent(clickEvent);
                window.fail_count = 0
            }else{
                window.fail_count = window.fail_count + 1
                console.info("未找到元素");
                if(window.fail_count > 5){
                    //TODO 刷新整个页面
                    window.location.reload(true) 
                }
            }

            roulette = !roulette;
        }
    }

    // 设置定时器，每 X 秒执行一次点击操作
    if (self.interval_id) {
        clearInterval(self.interval_id);
        console.log('Periodic click task has been cancelled.');
    }
    self.interval_id = setInterval(periodicClick, 15000); // 每 15 秒点击一次

    console.info('injecting scripts successfully.');
    return true;
})();