document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('configForm');
    const wsUrlInput = document.getElementById('wsUrl');
    const gameUrlPatternInput = document.getElementById('gameUrlPattern');
    const status = document.getElementById('status');

    // 加载配置项
    chrome.storage.local.get(['wsUrl', 'gameUrlPattern'], function(items) {
        wsUrlInput.value = items.wsUrl || 'ws://localhost:8765/ezugi';
        gameUrlPatternInput.value = items.gameUrlPattern || '888,identifier';
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const wsUrl = wsUrlInput.value;
        const gameUrlPattern = gameUrlPatternInput.value;

        if (!wsUrl) {
            status.textContent = 'WebSocket服务器地址不能为空';
            status.style.color = 'red';
            return;
        }

        if (!gameUrlPattern) {
            status.textContent = '游戏URL特征不能为空';
            status.style.color = 'red';
            return;
        }

        chrome.storage.local.set({ wsUrl, gameUrlPattern }, function() {
            status.textContent = '配置保存成功';
            status.style.color = 'green';
        });
    });
});
