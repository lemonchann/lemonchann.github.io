/*
 * @copyright http://blog.rainynight.top/
 * Licensed under MIT
 */
(function($){
    $.fn.tagCloud = function(){

        var $this = $(this);

        for(var i=0; i<$this.length;i++){
            execute($this.get(i));
        }

        return $this;

        function execute(shell){
            //半径
            var radius = 120;
            //是否活动
            var active = true;
            //是否分散
            var scatter = true;
            //旋转速度
            var speed = 2;
            //右旋偏移
            var rightOffset = 50;
            //下旋偏移
            var downOffset = 0;
            //与眼睛的距离
            var distance=300;

            var items = shell.getElementsByTagName('a');
            var itemWraps = [];
            for(var i=0; i<items.length; i++)
            {
                var tag = {};
                var item = items[i];
                tag.item = item;
                tag.offsetWidth = item.offsetWidth;
                tag.offsetHeight = item.offsetHeight;
                itemWraps.push(tag);
            }

            initPosition();

            shell.onmouseover=function ()
            {
                active = false;
            };

            shell.onmouseout=function ()
            {
                active = true;
            };

            setInterval(update, 30);

            function update()
            {
                var a;
                var b;

                if(active)
                {
                    a = (-Math.min( Math.max( -downOffset, -radius ), radius ) / radius ) * speed;
                    b = (Math.min( Math.max( -rightOffset, -radius ), radius ) / radius ) * speed;
                }
                else
                {
                    return;
                }

                with(trigonometric(a,b,0)) {
                    for (var j = 0; j < itemWraps.length; j++) {
                        var rx1 = itemWraps[j].x;
                        var ry1 = itemWraps[j].y * ca + itemWraps[j].z * (-sa);
                        var rz1 = itemWraps[j].y * sa + itemWraps[j].z * ca;

                        var rx2 = rx1 * cb + rz1 * sb;
                        var ry2 = ry1;
                        var rz2 = rx1 * (-sb) + rz1 * cb;

                        var rx3 = rx2 * cc + ry2 * (-sc);
                        var ry3 = rx2 * sc + ry2 * cc;
                        var rz3 = rz2;

                        itemWraps[j].x = rx3;
                        itemWraps[j].y = ry3;
                        itemWraps[j].z = rz3;

                        var per = distance / (distance + rz3);

                        itemWraps[j].scale = per;
                        itemWraps[j].alpha = per;

                        itemWraps[j].alpha = (itemWraps[j].alpha - 0.6) * (10 / 6);
                    }
                }
                doPosition();
            }

            function doPosition()
            {
                var l=shell.offsetWidth/2;
                var t=shell.offsetHeight/2;
                for(var i=0;i<itemWraps.length;i++)
                {
                    items[i].style.left=itemWraps[i].x+l-itemWraps[i].offsetWidth/2+'px';
                    items[i].style.top=itemWraps[i].y+t-itemWraps[i].offsetHeight/2+'px';

                    items[i].style.fontSize=Math.ceil(12*itemWraps[i].scale/2)+8+'px';

                    items[i].style.filter="alpha(opacity="+100*itemWraps[i].alpha+")";
                    items[i].style.opacity=itemWraps[i].alpha;
                }
                ensureDepth();
            }

            function ensureDepth()
            {
                var tmp=[];

                for(var i=0;i<items.length;i++)
                {
                    tmp.push(items[i]);
                }

                tmp.sort
                (
                    function (vItem1, vItem2)
                    {
                        if(vItem1.z>vItem2.z)
                        {
                            return -1;
                        }
                        else if(vItem1.z<vItem2.z)
                        {
                            return 1;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                );

                for(var i=0;i<tmp.length;i++)
                {
                    tmp[i].style.zIndex=i;
                }
            }

            function trigonometric( a, b, c)
            {
                var dtr = Math.PI/radius;
                var rst = {};
                with(rst) {
                    sa = Math.sin(a * dtr);
                    ca = Math.cos(a * dtr);
                    sb = Math.sin(b * dtr);
                    cb = Math.cos(b * dtr);
                    sc = Math.sin(c * dtr);
                    cc = Math.cos(c * dtr);
                }
                return rst;
            }


            function initPosition()
            {
                var phi=0;
                var theta=0;
                var max=itemWraps.length;
                var tmp=[];
                var oFragment=document.createDocumentFragment();

                for(var i=0; i<items.length; i++)
                {
                    tmp.push(items[i]);
                }

                //随机排序
                tmp.sort
                (
                    function ()
                    {
                        return Math.random()<0.5?1:-1;
                    }
                );

                for(var i=0;i<tmp.length;i++)
                {
                    oFragment.appendChild(tmp[i]);
                }

                shell.appendChild(oFragment);

                for( var i=1; i<max+1; i++){
                    if( scatter )
                    {
                        phi = Math.acos(-1+(2*i-1)/max);
                        theta = Math.sqrt(max*Math.PI)*phi;
                    }
                    else
                    {
                        phi = Math.random()*(Math.PI);
                        theta = Math.random()*(2*Math.PI);
                    }
                    //坐标变换
                    itemWraps[i-1].x = radius * Math.cos(theta)*Math.sin(phi);
                    itemWraps[i-1].y = radius * Math.sin(theta)*Math.sin(phi);
                    itemWraps[i-1].z = radius * Math.cos(phi);

                    items[i-1].style.left=itemWraps[i-1].x+shell.offsetWidth/2-itemWraps[i-1].offsetWidth/2+'px';
                    items[i-1].style.top=itemWraps[i-1].y+shell.offsetHeight/2-itemWraps[i-1].offsetHeight/2+'px';
                }
            }

        }
    }
})($);