document.addEventListener("DOMContentLoaded", function() {
    var goButton = document.getElementById("goButton");
    var urlInput = document.getElementById("urlInput");
    var browserFrame = document.getElementById("browserFrame");
    var iframeUrl = "https://www.bing.com/search?q="; // 初期値

    // 移動ボタンがクリックされた時の処理
    goButton.addEventListener("click", function() {
        var inputUrl = urlInput.value.trim();
        // 入力されたURLが空でない場合のみ処理を実行
        if (inputUrl !== "") {
            // リンクを入力した場合、入力したリンクに移動
            if (inputUrl.startsWith("https://") || inputUrl.startsWith("http://")) {
                iframeUrl = inputUrl;
            } else { // 相対URLの場合、Googleのドメインを使って移動
                iframeUrl = "https://www.bing.com/search?q=" + inputUrl;
            }
            browserFrame.src = "proxy.php?url=" + encodeURIComponent(iframeUrl);
        }
    });

    // iframeのリクエストを変更して制約回避
    browserFrame.addEventListener("load", function() {
        browserFrame.contentWindow.postMessage(iframeUrl, "https://www.bing.com/search?q=");
    });

    // サーバーからのメッセージを受け取り、iframeの領域に反映
    window.addEventListener("message", function(e) {
        if (e.origin === "https://www.bing.com/search?q=") {
            urlInput.value = e.data;
        }
    });
});
