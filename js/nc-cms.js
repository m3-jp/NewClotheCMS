/*
 * New Clothe CMS
 * Ver 0.1
 * Copyright 2016 http://nc-cms.m3-jp.asia/
 */
var ncApp = Backbone.View.extend({
    el: "body",
    $modal: {},
    $modal_prog_html: "",
    nc_path: "",
    s_flg: false,
    tmpl: {},
    modal_close_function: function(callback){
        this.$modal.animate({top:0,opacity:0},function(){
            $(this).empty();
        });
        $(".__nc-modal_overlay").fadeOut(null,function(){
            $(".__nc-modal_overlay").remove();
        });
        $("body").removeClass("__nc-noscroll");
        if(callback){
            callback();
        }
    },
    events: {
        "click .__nc-login":"loginModal",
        "click button[name=__nc-login]":"login",
        "click [class^=__nc-form-]":"form",
        "click button[name=__nc-action-valid]":"valid",
        "click button[name=__nc-action-back]":"back",
        "click button[name=__nc-action-regist]":"regist",
        "click .__nc-save":"save",
        "click .__nc-logout":"logout"
    },
    initialize: function(){
    },
    form: function(e){
        if(!this.s_flg){
            return false;
        }
        var self = this,
        name = "",
        $t = {};
        _.some($(e.target).attr("class").split(" "),function(v,k){
            if(/^__nc\-form\-/.test(v)){
                name = v.replace(/^__nc\-form\-/,"");
                if(!self.tmpl[name]){
                    self.tmpl[name] = _.template(self.getTemplate(self.getUrl("js/nc-templates/"+name+".html")));
                }
                self.modal(self.tmpl[name]());
                $t = $("<div>").html($(e.target).html().replace(/<br>/g,"\n"));
                self.$modal.find("input[name=__nc-form-"+name+"],textarea[name=__nc-form-"+name+"]").val($t.text());
                self.$modal.find("input[name=__nc-key],textarea[name=__nc-key]").val($(e.target).children("span").attr("class").match(/__nc\-key\-([^ ]+)/)[1]);
                self.$modal.find(".__nc-valid-t").hide();
                return true;
            }
        });
    },
    valid: function(){
        if(!this.s_flg){
            return false;
        }
        var self = this;
        _.some(this.$modal.find("input[name^=__nc-form-],textarea[name^=__nc-form-]"),function(v,k){
            self.$modal.find(".__nc-valid-f").hide();
            self.$modal.find(".__nc-valid-data").empty();
            self.$modal.find(".__nc-valid-data").html(_.escape($(v).val()).replace(/[\r\n]/g,"<br>"));
            self.$modal.find(".__nc-valid-t").show();
            return true;
        });
    },
    back: function(){
        this.$modal.find(".__nc-valid-t").hide();
        this.$modal.find(".__nc-valid-f").show();
    },
    regist: function(){
        if(!this.s_flg){
            return false;
        }
        var self = this,
        obj = {},
        clone = {},
        key = "";
        _.some(this.$modal.find("input[name^=__nc-form-],textarea[name^=__nc-form-]"),function(v,k){
            key = $(v).next().val();
            clone = $(".__nc-key-"+key);
            obj = $(".__nc-key-"+key).parent();
            obj.empty();
            obj.html(_.escape($(v).val()).replace(/[\r\n]/g,"<br>"));
            obj.append(clone);
            return true;
        });
        this.$modal.find(".__nc-modal-close").click();
    },
    save: function(){
        if(!this.s_flg){
            return false;
        }
        if(confirm("編集した内容を反映します、よろしいですか？")===true){
            this.modal("load");
            var self = this,
            input = {},
            $t = {},
            url = this.getUrl("app/execute.php");
            _.each($("[class^=__nc-key]"),function(v,k){
                $t = $("<div>").html($(v).parent().html().replace(/<br>/g,"\n"));
                input[$(v).attr("class").match(/__nc\-key\-([^ ]+)/)[1]] = $t.text();
            });
            $.ajax({
                url:url,
                data:{type:"save",input:input},
                type:"post",
                success: function(data){
                    if(data.result){
                        location.reload();
                    }else{
                        alert("エラーが発生しました");
                    }
                },
                error: function(){
                    alert("エラーが発生しました");
                }
            });
            this.modal_close_function();
        }
    },
    loginModal: function(){
        this.modal(this.getTemplate(this.getUrl("js/nc-templates/login.html")));
    },
    login_data: {},
    login: function(){
        var self = this,
        target = this.getUrl("app/login.php"),
        input = {"__nc-login-id": $("input[name=__nc-login-id]").val(),"__nc-login-password": $("input[name=__nc-login-password]").val()};
        if(_.isEqual(input,this.login_data)){
            return false;
        }else{
            this.login_data = input;
        }
        $(".__nc-modal_overlay,.__nc-modal-close").off("click");
        this.$modal.children(".__nc-modal-body").hide();
        this.$modal.append(this.$modal_prog_html);
        $.ajax({
            url: target,
            type: "post",
            data: input,
            async: false,
            success: function(data){
                if(data.result){
                    location.reload();
                }else{
                    self.$modal.find(".__nc-error").removeClass("hide");
                }
            },
            error: function(){
                alert("エラーが発生しました");
            }
        });
        $(".__nc-modal_overlay,.__nc-modal-close").on("click",function(){self.modal_close_function();});
        this.$modal.children(".__nc-modal-progress").remove();
        this.$modal.children(".__nc-modal-body").show();
    },
    logout: function(){
        if(confirm("ログアウトします、よろしいですか？")===true){
            $.ajax({
                url: this.getUrl("app/logout.php"),
                type: "post",
                success: function(data){
                    location.reload();
                },
                error: function(){
                    alert("エラーが発生しました");
                }
            });
        }
    },
    getTemplate: function(target){
        var html = "";
        $.ajax({
            url: target,
            async: false,
            success: function(data){
                html = data;
            },
            error: function(data){
                alert("エラーが発生しました");
            }
        });
        return html;
    },
    getUrl: function(str){
        return this.nc_path+str;
    },
    modal: function(target,callback){
        var self = this,
        html = "",
        $o = $('<div class="__nc-modal_overlay"></div>');
        $("body").addClass("__nc-noscroll");
        $("body").append($o);
        this.$modal.append(this.$modal_prog_html);
        $o.fadeIn();
        self.$modal.animate({top:"80px",opacity:1});
        this.$modal.css({
            top: 0,
            left: Math.floor(($(window).width()-this.$modal.outerWidth(true))/2)+"px"
        });
        if(_.isObject(target)){

        }else if(target=="load"){
            return true;
        }else{
            html = target;
        }
        this.$modal.children(".__nc-modal-progress").remove();
        this.$modal.append(html);
        $o.on("click",function(){self.modal_close_function(callback);});
        this.$modal.find(".__nc-modal-close").on("click",function(){self.modal_close_function(callback);});
    },
    render: function(){
        var self = this;
        $.ajax({
            url: this.getUrl("app/session.php"),
            type: "get",
            async: false,
            success: function(data){
                self.s_flg = data.result;
            },
            error: function(){
                alert("エラーが発生しました");
            }
        });
        this.$modal_prog_html = '<div class="__nc-modal-body __nc-modal-progress center"><img src="'+this.getUrl("js/nc-templates/loader01.gif")+'"></div>';
        if(self.s_flg){
            $("body").prepend(this.getTemplate(this.getUrl("js/nc-templates/navigation.html")));
            $("[class^=__nc-form-]").addClass("__nc-form");
            $(".__nc-login").hide();
        }
        $("body").append('<div id="__nc-modal" class="__nc-modal"></div>');
        this.$modal = $("#__nc-modal");
    }
});
