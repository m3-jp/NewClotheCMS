# New Clothe CMS
**ホームページの更新をより手軽に**

WordpressやDrupalなどを使うまでもない場合や、静的ページを動的に更新できるようになります。
PHPが動作する環境であればデータベース不要で動作させることが可能です。

## 使い方
1.ソースをダウンロードします  
2.PHPを設定します  
> ・app/config.phpを編集  
> `define('LOGIN_ID', 'admin');`  
> `define('LOGIN_PW', 'admin');`  
> ↑adminを変更

> ・ディレクトリのパーミッションを「777」に変更  
> `app/logs`

> ・更新対象のファイルの先頭に

    <?php
    require './nc-cms/app/config.php';
    ?>
> を追記し、PHPを読み込みます


3.CSS、JavaScriptを読み込みます

    <link href="nc-cms/css/reset.css" rel="stylesheet">
    <link href="nc-cms/css/m3-style.css" rel="stylesheet">
    <link href="nc-cms/css/design.css" rel="stylesheet">
    <script src="nc-cms/js/jquery.min.js"></script>
    <script src="nc-cms/js/underscore-min.js"></script>
    <script src="nc-cms/js/backbone-min.js"></script>
    <script src="nc-cms/js/nc-cms.js"></script>  

htmlの最後の方に書きを追記します

    <script>
      (function($){
        var app = new ncApp();
        app.nc_path = "nc-cms/";
        app.render();
      })(jQuery);
    </script>

ディレクトリを変更している場合、`app.nc_path = "ディレクトリ";`の部分を変更してください


4.ログインボタンをどこかに設置してください  
`<a href="javascript:void(0);" class="__nc-login">ログイン</a>`  
`class="__nc-login"`を含んでいればどのタグでも大丈夫です

5.ログインして、更新対象を編集します  
6.編集完了後、「編集内容を反映させる」をクリックして保存します

## 機能
・１行更新させる場合  
`<p class="__nc-form-text"><?php echo __nc_getData('section1'); ?></p>`  
上記のように`class="__nc-form-text"`と`<?php echo __nc_getData('section1'); ?>`を追記してください

・複数行更新させる場合  
`<p class="__nc-form-textarea"><?php echo __nc_getData('section2'); ?></p>`  
上記のように`class="__nc-form-textarea"`と`<?php echo __nc_getData('section2'); ?>`を追記してください

* 現在は`__nc-form-text`と`__nc-form-textarea`のみ有効です  
* `<?php echo __nc_getData('重複しない名前'); ?>`には、「重複しない名前」の部分に半角英数字のみで重複しない名前を入力してください

## 必須環境
PHP5以上

## ライセンス
MIT License