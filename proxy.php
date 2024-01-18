<?php
// CORS対策のため、Originの設定
header("Access-Control-Allow-Origin: *");

// URLパラメータからURLを取得
$url = $_GET["url"];

// URLを取得できた場合、指定したURLのコンテンツを取得
if ($url) {
    $content = file_get_contents($url);
    echo $content;
} else {
    echo "URLが正しく指定されていません。";
}
?>
