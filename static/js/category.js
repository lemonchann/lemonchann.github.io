/**
 * 页面ready方法
 */
$(document).ready(function() {
    categoryDisplay();
});

/**
 * 分类展示
 * 点击右侧的分类展示时
 * 左侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function categoryDisplay() {
    selectCategory();
    $('.categories-item').click(function() {
        window.location.hash = "#" + $(this).attr("cate");
        selectCategory();
    });
}

function selectCategory(){
    var exclude = ["",undefined];
    var thisId = window.location.hash.substring(1);
    var allow = true;
    for(var i in exclude){
        if(thisId == exclude[i]){
            allow = false;
            break;
        }
    }
    if(allow){
        var cate = thisId;
        $("section[post-cate!='" + cate + "']").hide(200);
        $("section[post-cate='" + cate + "']").show(200);
    } else {
        $("section[post-cate='All']").show();
    }
}