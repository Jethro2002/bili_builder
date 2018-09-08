var div = "<div style=\"width: 905px;height: 230px;background: rgb(226, 226, 226);position: relative;overflow: hidden;\">";


$(function(){

    refresh();

    $("#exhibition").bind('DOMNodeInserted', function(){
        $("#output").val("<div>"+$("#exhibition").html()+"</div>");
    })

    bangdingshijian();

    $("img")[0].onmousedown = function(e){
        e.preventDefault()
    };

    $("#exhibition p")[0].onmousedown = function(e){
        e.preventDefault()
    };


    $.fn.extend({
        insertAtCaret: function (myValue) {
            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
            } else {
                this.value = myValue;
                this.focus();
            }
        }
    })


    //背景实时更改
    $("#background-image").bind('input propertychange', function(){
        div = "<div style=\"background-image:url("+$("#background-image").val()+");background-color:"+$("#background-color input").val()+";width: 905px;height: 230px;position: relative;overflow: hidden;\">";
        $("#exhibition").css({"background-image":"url("+$("#background-image").val()+")","background-color":$("#background-color input").val()});
        refresh();
    })
    $("#background-color").on("changeColor", function () {
        div = "<div style=\"background-image:url("+$("#background-image").val()+");background-color:"+$("#background-color input").val()+";width: 905px;height: 230px;position: relative;overflow: hidden;\">";
        $("#exhibition").css({"background-image":"url("+$("#background-image").val()+")","background-color":$("#background-color input").val()});
        refresh();
    });



})

//更改编辑区域
function change_edit(num,button){
    button.css("background","rgb(212, 212, 212)");
    button.siblings().css("background","rgb(235, 235, 235)");
    $("#edit_"+num).show().animate({"margin-left":"0px","opacity":"1"},200);
    $("#edit_"+num).siblings().hide().css({"margin-left":"30px","opacity":"0.6"});
}

//打开对应编辑
function open_edit(num){
    if($(".font-css[data-id="+num+"]").height()>0){
        $(".font-css[data-id="+num+"]").animate({"height":"0px"},100);
    }else{
        $(".font-css[data-id="+num+"]").animate({"height":$(".font-css[data-id="+num+"] .font-css-this").innerHeight()},100);
    }
    if($(".image-css[data-id="+num+"]").height()>0){
        $(".image-css[data-id="+num+"]").animate({"height":"0px"},100);
    }else{
        $(".image-css[data-id="+num+"]").animate({"height":$(".image-css[data-id="+num+"] .image-css-this").innerHeight()},100);
    }
}



//增加文本
nn=0;
function add(type){
    nn=nn+1;
    if(type=="text"){
    $("#edit-out").append("<div class='edit-text' data-id='"+nn+"'><span>输入框"+nn+"：</span><textarea data-id='"+nn+"' class='form-control shurukuang' rows='3' placeholder='在这里输入内容'>在这里输入内容</textarea><div class='font-css' data-id='"+nn+"'><div class='font-css-this'><div class='input-group'><div class='input-group-addon'>字体大小</div><input id='font-css-size' type='text' class='form-control' id='exampleInputAmount' value='12'><div class='input-group-addon'>px</div><div class='input-group-addon'>元素宽度</div><input id='font-css-width' type='text' class='form-control' id='exampleInputAmount'><div class='input-group-addon'>px</div></div><div class='input-group'><div class='input-group-addon'>向外延伸</div><input id='font-css-padding' type='text' class='form-control' id='exampleInputAmount'><div class='input-group-addon'>px</div><div class='input-group-addon'>圆角大小</div><input id='font-css-border-radius' type='text' class='form-control' id='exampleInputAmount'><div class='input-group-addon'>px</div></div><div class='input-group'><div class='input-group-addon'>字体颜色</div><div id='font-color' class='input-group colorpicker-component'><input type='text' class='form-control input-lg' value='#646c7a'/><span class='input-group-addon'><i></i></span></div><div class='input-group-addon'>背景颜色</div><div id='font-color-background' class='input-group colorpicker-component'><input type='text' class='form-control input-lg' value='rgba(0, 0, 0, 0)'/><span class='input-group-addon'><i></i></span></div></div></div></div><div class='btn btn-primary btn-lg btn-block add' onclick=\"open_edit('"+nn+"')\">属性调整</div><div class='btn btn-danger btn-lg btn-block del' data-id='"+nn+"' onclick=\"open_del($(this).data('id'))\">删除元素</div><div class='btn btn-default btn-lg btn-block to-top' onclick='to_top($(this))'>向上移</div><div class='btn btn-default btn-lg btn-block to-bottom' onclick='to_bottom($(this))'>向下移</div></div>");
    $(".font-css[data-id="+nn+"] #font-color,.font-css[data-id="+nn+"] #font-color-background").colorpicker();
    $("#exhibition").append("<p data-id='"+nn+"' style='position:absolute;margin:0;width:auto;word-break: break-all;left:0;top:0;'>在这里输入内容</p>");
    }else if(type=="image"){
    $("#edit-out").append("<div class='edit-text' data-id='"+nn+"'><span>[图片]输入框"+nn+"：</span><div class='input-group image-url'><div class='input-group-addon'>图片URL</div><input data-id='"+nn+"' type='text' class='form-control' id='exampleInputAmount' placeholder='http://xxx.xxx.xxx/xxx/xxx.xxx'></div><div class='image-css' data-id='"+nn+"'><div class='image-css-this'><div class='input-group'><div class='input-group-addon'>宽度</div><input id='image-css-width' type='text' class='form-control' id='exampleInputAmount'><div class='input-group-addon'>px</div><div class='input-group-addon'>高度</div><input id='image-css-height' type='text' class='form-control' id='exampleInputAmount'><div class='input-group-addon'>px</div></div><input type='checkbox' class='liansuo'> 链锁设置（宽度、高度可以互相自适应跟随改变）<span class='liansuo_nn'></span></div></div><div class='btn btn-primary btn-lg btn-block add' onclick=\"open_edit('"+nn+"')\">属性调整</div><div class='btn btn-danger btn-lg btn-block del' data-id='"+nn+"' onclick=\"open_del($(this).data('id'))\">删除元素</div><div class='btn btn-default btn-lg btn-block to-top' onclick='to_top($(this))'>向上移</div><div class='btn btn-default btn-lg btn-block to-bottom' onclick='to_bottom($(this))'>向下移</div></div>");
    $("#exhibition").append("<img data-id='"+nn+"' style='position:absolute;left:0;top:0;' src='' />");
    }
    bangdingshijian();
    refresh();
    $("#exhibition *[data-id='"+nn+"']")[0].onmousedown = function(e){
        e.preventDefault();
    };
}


//增加图片
nn_image=0;
function image_add(){
    nn_image=nn_image+1;
    $("#image-this").append("<input type='text' data-image-id='"+nn_image+"' placeholder='在这里输入图片链接' /><button onclick=\"edit_image('"+nn_image+"')\">属性</button>");
    $("#exhibition").append("<img data-image-id='"+nn_image+"' style='position:absolute;' />");
    bangdingshijian();
    /*$("#exhibition img[data-image-id='"+nn_image+"']")[0].onmousedown = function(e){
        e.preventDefault();
    };*/
}


//提示边框刷新
function notice(id){
    $("#hint-line").show();
    var zhiding = $("#exhibition *[data-id='"+id+"']");
    var Y = zhiding.position().top;
    var X = zhiding.position().left;
    $("#hint-line").width($("#exhibition p[data-text-id='"+id+"']").width());
    $("#hint-line").height($("#exhibition p[data-text-id='"+id+"']").height());
    $("#hint-line").css({"left":parseInt(zhiding.css("left"))-6+"px","top":parseInt(zhiding.css("top"))-6+"px","width":zhiding.innerWidth()+10,"height":zhiding.innerHeight()+10});
    $("#hint-line-WH").text(zhiding.width()+"px , "+zhiding.height()+"px");
    $("#hint-line-XY").text(X+"px , "+Y+"px");
}


//绑定事件开始
function bangdingshijian(){

    //变更文本

    function transition_text(id){
        //数据源
        str_0 = $(".edit-text textarea[data-id='"+id+"']");
        //逐步处理
        var str_1 = str_0.val().replace(/\n/g,"<br/>").replace(/\r\n/g, '<br/>').replace(/\s/g,"&nbsp;").replace(/\[a=(((?!\]).)*)\](((?!\[\/a\]).)*)\[\/a\]/g,"<a href='$1' target='_blank'>$3</a>").replace(/\[b\](((?!\[\/b\]).)*)\[\/b\]/g,"<b>$1</b>").replace(/ data-id=\"[0-9]+\"/g,"");
        //最终处理
        $("#exhibition p[data-id='"+id+"']").html(str_1);
        refresh();

    }


    //输入框内容更改事件
    $(".edit-text textarea").each(function(){
        $(this).bind('input propertychange', function(){
            $(this).html($(this).val());
            var id = $(this).data("id");
            transition_text(id);
            notice(id);
            $("#edit_link").hide();
        })
    })

    $(".image-url input").each(function(){
        $(this).bind('input propertychange', function(){
            $(this).attr("value",$(this).val());
            var id = $(this).data("id");
            $("#exhibition img[data-id='"+id+"']").attr("src",$(this).val());
            $("#exhibition img[data-id='"+id+"']").load(function(){
                $(".image-css[data-id='"+id+"'] #image-css-height").val($("#exhibition img[data-id='"+id+"']").height());
                $(".image-css[data-id='"+id+"'] #image-css-width").val($("#exhibition img[data-id='"+id+"']").width());
                $(".image-css[data-id='"+id+"'] .liansuo_nn").text($("#exhibition img[data-id='"+id+"']").width()/$("#exhibition img[data-id='"+id+"']").height());
            })
            notice(id);
            refresh();
            $("#edit_link").hide();
        })
    })

    $("#image input").each(function(){
        $(this).bind('input propertychange', function(){
            var id = $(this).data("image-id");
            $("#exhibition img[data-image-id='"+id+"']").attr("src",$("#image input[data-image-id='"+id+"']").val());
            $("#hint-line").width($("#exhibition img[data-image-id='"+id+"']").width());
        })
    })


    /*编辑实时更新*/
    $(".font-css-this input").each(function(){
        $(this).bind('input propertychange', function(){
            $(this).attr("value",$(this).val());
            var id=$(this).parents(".font-css").data("id");
            var zhiding=$("#exhibition *[data-id='"+id+"']");
            var zhiding_css=$(".font-css[data-id='"+id+"']");
            zhiding.css({
                "font-size":zhiding_css.find("#font-css-size").val()+"px",
                "width":zhiding_css.find("#font-css-width").val()+"px",
                "padding":zhiding_css.find("#font-css-padding").val()+"px",
                "border-radius":zhiding_css.find("#font-css-border-radius").val()+"px",
                "color":zhiding_css.find("#font-color input").val(),
                "background-color":zhiding_css.find("#font-color-background input").val(),
            });
            if(zhiding_css.find("#font-css-width").val()==""){
                zhiding.css("width","");
            }
            refresh();
        })
    })
    
    $(".font-css-this #font-color").each(function(){
        $(this).on("changeColor", function () {
            var id=$(this).parents(".font-css").data("id");
            var zhiding=$("#exhibition *[data-id='"+id+"']");
            var zhiding_css=$(".font-css[data-id='"+id+"']");
            zhiding.css({
                "color":zhiding_css.find("#font-color input").val(),
                "background-color":zhiding_css.find("#font-color-background input").val(),
            });
            $(this).children("input").attr("value",$(this).children("input").val());
            refresh();
        })
    })


    $(".font-css-this #font-color-background").each(function(){
        $(this).on("changeColor", function () {
            var id=$(this).parents(".font-css").data("id");
            var zhiding=$("#exhibition *[data-id='"+id+"']");
            var zhiding_css=$(".font-css[data-id='"+id+"']");
            zhiding.css({
                "color":zhiding_css.find("#font-color input").val(),
                "background-color":zhiding_css.find("#font-color-background input").val(),
            });
            $(this).children("input").attr("value",$(this).children("input").val());
            refresh();
        })
    })

    $(".image-css-this input").bind('input propertychange', function(){
        var id=$(this).parents(".image-css").data("id");
        var zhiding=$("#exhibition *[data-id='"+id+"']");
        var zhiding_css=$(".image-css[data-id='"+id+"']");
        $(this).attr("value",$(this).val());
        if(zhiding_css.find(".liansuo").attr("value")=="on"){
            var liansuo_nn = zhiding_css.find(".liansuo_nn").text();
            if($(this).attr("id")=="image-css-width"){
                zhiding.css({
                    "height":zhiding_css.find("#image-css-width").val()/liansuo_nn+"px",
                    "width":zhiding_css.find("#image-css-width").val()+"px",
                });
                $(".image-css[data-id='"+id+"'] #image-css-height").val(zhiding.height());
            }else if($(this).attr("id")=="image-css-height"){
                zhiding.css({
                    "height":zhiding_css.find("#image-css-height").val()+"px",
                    "width":zhiding_css.find("#image-css-height").val()*liansuo_nn+"px",
                });
                $(".image-css[data-id='"+id+"'] #image-css-width").val(zhiding.width());
            }
        }else{
            zhiding.css({
                "height":zhiding_css.find("#image-css-height").val()+"px",
                "width":zhiding_css.find("#image-css-width").val()+"px",
            });
            zhiding_css.find(".liansuo_nn").text(zhiding.width()/zhiding.height());
        }
        refresh();
    })

    $(".liansuo").each(function(){
        $(this).click(function(){
            if($(this).attr("value")=="on"){
                $(this).attr("value","");
            }
        })
    })


    //拖动展示台中内容
    $("#exhibition *:not(div)").mousedown(function(e){
        $("#float").hide();
        var pageX=e.pageX;          
        var pageY=e.pageY;         
        //console.log(pageX+'    '+pageY);
        first_pageX=e.pageX;
        first_pageY=e.pageY;
        last_move=e.pageX;
        last_move_Y=e.pageY;
        pitch=$(this);
        $("#exhibition").mousemove(function(now){
            $("#exhibition *").unbind("mouseover");
            notice(pitch.data("id"));
            //console.log(now.pageX + ", " + now.pageY);
            alter_width = last_move-now.pageX;
            alter_height = last_move_Y-now.pageY;
            last_move = now.pageX;
            last_move_Y = now.pageY;
            pitch.css({"left": parseInt(pitch.css("left")) - alter_width,"top": parseInt(pitch.css("top")) - alter_height});
            notice(pitch.data("id"));
        });
        $("html").mouseup(function(){
            notice(pitch.data("id"));
            $("#exhibition").unbind("mousemove");
            refresh();
            $(this).unbind("mouseup");
            $("#exhibition *").mouseover(remove);
        })
    });


    
    //鼠标移入事件
    $("#exhibition *").mouseover(remove=(function(e){
        notice($(this).data("id"));
        $("#float").show();
        $("#float").data("del-id",$(this).data("id"));
        $("#float").css({"left":e.pageX-5,"top":e.pageY+10});
        $(this).mouseout(function(e){
            last_s_move_Y=e.pageY;
            last_s_move_X=e.pageX;
            $("#hint-line").hide();
            $("html").mousemove(function(e){
                if(last_s_move_X+50<e.pageX || last_s_move_Y+50<e.pageY || e.pageX<last_s_move_X-10 || e.pageY<last_s_move_Y-10){
                    $("#float").hide();
                    $("html").unbind("mousemove");
                }
            })
        })
    }))

    $("#exhibition *").mouseup(remove);

    
    $(".edit-text textarea").focus(function(){
        var id = $(this).data("id");
        notice(id);
    }).mouseover(function(){
        var id = $(this).data("id");
        notice(id);
    }).mouseout(function(){
        $("#hint-line").hide();
    })

    $("#input-this button").focus(function(){
        var id = $(this).prev().data("text-id");
        notice(id);
    }).mouseover(function(){
        var id = $(this).prev().data("text-id");
        notice(id);
    }).mouseout(function(){
        $("#hint-line").hide();
    })

    $("#image input").focus(function(){
        var id = $(this).data("image-id");
        notice(id,"image");
    }).mouseover(function(){
        var id = $(this).data("image-id");
        notice(id,"image");
    }).mouseout(function(){
        $("#hint-line").hide();
    })



    //超链接
    
    $(".edit-text textarea").mouseup(function(e){
        var X = e.pageX;
        var Y = e.pageY;
        $("#edit_link").css({"top":Y+10,"left":X-300});
    })
    $(".edit-text textarea").select(function(e){
        $("#edit_link input").val("");
        $("#edit_link").show();
        $("#edit_link .btn-info").attr("onclick","edit_link("+$(this).data("id")+",'"+window.getSelection().toString()+"')");
        $("#edit_link .btn-warning").attr("onclick","edit_strong("+$(this).data("id")+",'"+window.getSelection().toString()+"')");
        $('html').click(function(e) {
            var target = $(e.target);
            if(!target.is('#edit_link *')) {
               if ( $('#edit_link *').is(':visible') ) {  
                    $('#edit_link').hide();                        
               }
            }
        });
    })
}
//绑定事件结束


//触发删除

function open_del(id){
    $("#del-button").attr("onclick","del('"+id+"')");
    $("#myModal").modal('show');
}

//删除元素
function del(id){
    $("#exhibition *[data-id='"+id+"']").remove();
    $(".edit-text[data-id='"+id+"']").remove();
    $("#myModal").modal('hide');
    refresh();
}



//刷新输出
function refresh(){
    $("#output").val(div+$("#exhibition").html().replace(/data-link/g,"href").replace(/ data-id=\"[0-9]+\"/g,"")+"</div>");
    $("#phone_output").html("");
    for(var pnn=0;pnn<$("#exhibition p").length;pnn++){
        $("#phone_output").append("<p>"+$("#exhibition p").eq(pnn).text()+"</p>");
    }
}


//打开编辑（文本）
function edit_text(id){
    setTimeout(function(){
        $("#hint-line").show();
    },100)
    var dangqian = $("#exhibition p[data-text-id="+id+"]");
    var color = colorRGBtoHex(dangqian.css("color"));
    var color_background = colorRGBtoHex(dangqian.css("background-color"));
    $("#edit_background,#edit_text").show();
    $("#edit_text_submit").attr("onclick","edit_text_submit('"+id+"')");
    $("#edit_text-color").val(color);
    $("#edit_text-color_background").val(color_background);
    $("#edit_text-font_size").val(parseInt(dangqian.css("font-size")));
    if(dangqian.css("font-weight")=="400"){
        $("#edit_text-strong").prop('checked',false);
    }else{
        $("#edit_text-strong").prop('checked',true);
    }
    if(dangqian.attr("style").indexOf("width:auto;")!=-1 || dangqian.attr("style").indexOf("width: auto;")!=-1){
        $("#edit_text-width").val("");
    }else{
        $("#edit_text-width").val(parseInt(dangqian.css("width")));
    }
    if(dangqian.css("background-color")=="rgba(0, 0, 0, 0)"||dangqian.css("background-color")==""){
        $("#edit_text-no_color").prop('checked',true);
    }else{
        $("#edit_text-no_color").attr("checked",false);
    }

    if(dangqian.css("padding")=="0px"){
        $("#edit_text-padding").val("");
    }else{
        $("#edit_text-padding").val(ParseInt(dangqian.css("padding")));
    }
    if(dangqian.css("border-radius")=="0px"){
        $("#edit_text-radius").val("");
    }else{
        $("#edit_text-radius").val(ParseInt(dangqian.css("border-radius")));
    }
}

//打开编辑（图片）
function edit_image(id){
    $("#edit_image_submit").attr("onclick","edit_image_submit('"+id+"')");
    var image=$("#exhibition img[data-image-id="+id+"]");
    $("#edit_background,#edit_image").show();
    $("#edit_image-height").val(image.height());
    $("#edit_image-width").val(image.width());
    if(image.css("border-radius")=="0px"){
        $("#edit_image-radius").val("");
    }else{
        $("#edit_image-radius").val(ParseInt(image.css("border-radius")));
    }
}


//关闭编辑
function edit_close(){
    var all_fucen = $("#edit_background,#edit_text,#import_html,#edit_image");
    all_fucen.hide();
    $("#hint-line").hide();
}


//编辑提交（文本）

function edit_text_submit(id) {
    var dangqian = $("#exhibition p[data-text-id='"+id+"']");
    dangqian.css({
        "color":$("#edit_text-color").val(),
        "font-size":$("#edit_text-font_size").val()+"px",
    });
    if($("#edit_text-strong").prop('checked')==true){
        dangqian.css("font-weight","bold");
    }else{
        dangqian.css("font-weight","400");
    }
    if($("#edit_text-no_color[type='checkbox']").prop('checked')==true){
        dangqian.css("background-color","rgba(0, 0, 0, 0)");
    }else{
        dangqian.css("background-color",$("#edit_text-color_background").val());
    }
    if($("#edit_text-width").val()==""){
        dangqian.css("width","auto");
    }else{
        dangqian.css("width",$("#edit_text-width").val()+"px");
    }
    if($("#edit_text-padding").val()==""){
        dangqian.css("padding",'');
    }else{
        dangqian.css("padding",$("#edit_text-padding").val()+"px");
    }
    if($("#edit_text-radius").val()==""){
        dangqian.css("border-radius",'');
    }else{
        dangqian.css("border-radius",$("#edit_text-radius").val()+"px");
    }
    $("#edit_background,#edit_text").hide();
    refresh();
    notice(id,"text");
    $("#hint-line").show();
    setTimeout(function(){
        $("#hint-line").hide();
    },500)
}

//编辑提交（图片）

function edit_image_submit(id){
    var image=$("#exhibition img[data-image-id='"+id+"']");
    image.width($("#edit_image-width").val());
    image.height($("#edit_image-height").val());
    if($("#edit_image-radius").val()==""){
        image.css("border-radius",'');
    }else{
        image.css("border-radius",$("#edit_image-radius").val()+"px");
    }
    $("#edit_background,#edit_image").hide();
    refresh();
    notice(id,"image");
    $("#hint-line").show();
    setTimeout(function(){
        $("#hint-line").hide();
    },500)
}


//导入自定义模板
function import_html(){
    $("#edit_background,#import_html").show();
}

function import_html_fun() {
    $("#exhibition-out").html($("#import_html-this").val());
    $("#exhibition-out div").attr("id","exhibition");
    edit_close();
    refresh();
    bangdingshijian();
}


//颜色代码转换

function colorRGBtoHex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

//链接编辑
function edit_link(id,text){
    $("#edit_link").hide();
    $(".edit-text textarea[data-id='"+id+"']").insertAtCaret("[a="+$("#edit_link input").val()+"]"+text+"[/a]");
    $("#exhibition p[data-id='"+id+"']").html($(".edit-text textarea[data-id='"+id+"']").val().replace(/\[a=(((?!\]).)*)\](((?!\[\/a\]).)*)\[\/a\]/g,"<a href='$1' target='_blank'>$3</a>").replace(/\[b\](((?!\[\/b\]).)*)\[\/b\]/g,"<b>$1</b>"));
    bangdingshijian();
    refresh();
    setTimeout(function(){
        $("#hint-line").hide();
    },500)
}

//字体加粗
function edit_strong(id,text){
    $("#edit_link").hide();
    $(".edit-text textarea[data-id='"+id+"']").insertAtCaret("[b]"+text+"[/b]");
    $("#exhibition p[data-id='"+id+"']").html($(".edit-text textarea[data-id='"+id+"']").val().replace(/\[b\](((?!\[\/b\]).)*)\[\/b\]/g,"<b>$1</b>"));
    bangdingshijian();
    refresh();
    setTimeout(function(){
        $("#hint-line").hide();
    },500)
}


//调整位置
function to_top(button){
    var dangqian = button.parents(".edit-text");
    var dangqian_id = dangqian.data("id");
    if(dangqian.prev().length > 0){
        var dangqian_html=$("#exhibition *[data-id="+dangqian_id+"]");
        var shang = dangqian.prev();
        var shang_id = shang.data("id");
        var shang_html = $("#exhibition *[data-id="+shang_id+"]");
        shang.before(dangqian.prop("outerHTML"));
        shang_html.before(dangqian_html.prop("outerHTML"));
        dangqian.remove();
        dangqian_html.remove();
        bangdingshijian();
        refresh();
        $("#font-color,#font-color-background").each(function(){
            $(this).colorpicker();
        })
    }else{
        alert("上面已经没有元素了！");
    }
}

function to_bottom(button){
    var dangqian = button.parents(".edit-text");
    var dangqian_id = dangqian.data("id");
    if(dangqian.next().length > 0){
        var dangqian_html=$("#exhibition *[data-id="+dangqian_id+"]");
        var shang = dangqian.next();
        var shang_id = shang.data("id");
        var shang_html = $("#exhibition *[data-id="+shang_id+"]");
        shang.after(dangqian.prop("outerHTML"));
        shang_html.after(dangqian_html.prop("outerHTML"));
        dangqian.remove();
        dangqian_html.remove();
        bangdingshijian();
        refresh();
        $("#font-color,#font-color-background").each(function(){
            $(this).colorpicker();
        })
    }else{
        alert("上面已经没有元素了！");
    }
}
