---
layout: post
title: 算法小汇
tags: 三色旗 汉诺塔 斐波那契数列 骑士周游 算法 algorithm
categories: algorithm
---

* TOC 
{:toc}

# 三色旗

问题描述:一条绳子上悬挂了一组旗帜,旗帜分为三种颜色,现在需要把旗帜按顺序将相同的颜色的放在一起,没有旗帜的临时存放点,只能在绳子上操作,每次只能交换两个旗帜

例如:原本旗帜的顺序为`rwbrbwwrbwbrbwrbrw`需要变成`bbbbbbwwwwwwrrrrrr`

解决思路:遍历元素,如果元素该放到左边就与左边交换,该放到右边就与右边交换,左右边界动态调整,剩余的正好属于中间

~~~java
public class Tricolour {

    private final static String leftColor = "b";
    private final static String rightColor = "r";

    public void tricolour(Object[] src){
        //中间区域的左端点
        int mli = 0;
        //中间区域的右端点
        int mri = src.length-1;
        //遍历元素,从mli开始到mri结束,mli与mri会动态调整,但是i比mli变化快
        for (int i = mli; i <= mri; i++) {
            //如果当前元素属于左边
            if(isPartOfLeft(src[i])){
                //将当前元素换与中间区域左端点元素互换
                swap(src,mli,i);
                //mli位的元素是经过处理的,一定不是红色,所以不需要再分析i位新元素
                //左端点右移
                mli++;
            }
            //如果当前元素属于右边
            else if(isPartOfRight(src[i])){
                //从中间区域的右端点开始向左扫描元素
                while (mri > i) {
                    //如果扫描到的元素属于右边,右端点左移,继续向左扫描,否则停止扫描
                    if(isPartOfRight(src[mri])){
                        mri--;
                    } else {
                        break;
                    }
                }
                //将当前元素交换到中间区域右端点
                swap(src,mri,i);
                //右端点左移
                mri--;
                //mri位的元素可能是蓝色的,需要再分析i位新元素
                i--;
            }
        }
    }

    private boolean isPartOfLeft(Object item){
        return leftColor.equals(item);
    }

    private boolean isPartOfRight(Object item){
        return rightColor.equals(item);
    }

    private void swap(Object[] src, int fst, int snd){
        Object tmp = src[fst];
        src[fst] = src[snd];
        src[snd] = tmp;
    }

    public static void main(String[] args) {
        String[] flags =
            new String[]{"r","b","w","w","b","r","r","w","b","b","r","w","b"};
        new Tricolour().tricolour(flags);
        for (String flag : flags) {
            System.out.printf("%s,",flag);
        }
    }
}
~~~

# 汉诺塔

~~~java
public class Hanoi {

    private void move(int n, char a, char b, char c){
        if(n == 1){
            System.out.printf("盘%d由%s移动到%s\n",n,a,c);
        } else{
            move(n-1,a,c,b);
            System.out.printf("盘%d由%s移动到%s\n",n,a,c);
            move(n-1,b,a,c);
        }
    }

    public static void main(String[] args) {
        new Hanoi().move(5, 'A','B','C');
    }
}
~~~

# 斐波那契数列

~~~java
public class Fibonacci {

    private int[] src ;

    public int fibonacci(int n){
        if(src == null){
            src = new int[n+1];
        }
        if(n == 0 || n==1){
            src[n] = n;
            return n;
        }
        src[n] = fibonacci(n-1) + fibonacci(n-2);
        return src[n];
    }

    public int fibonacci2(int n){
        if(src == null){
            src = new int[n+1];
        }
        src[0] = 0;
        src[1] = 1;
        for (int i = 2; i < src.length; i++) {
            src[i] = src[i-1] + src[i-2];
        }
        return src[n];
    }

    public static void main(String[] args) {
        Fibonacci fib = new Fibonacci();
        int n = fib.fibonacci(20);
        System.out.println(n);
        for (int i : fib.src) {
            System.out.println(i);
        }
    }
}
~~~

# 骑士周游

骑士只能按照如图所示的方法前进,且每个格子只能路过一次,现在指定一个起点,判断骑士能否走完整个棋盘.

思路:对任意一个骑士所在的位置,找出其所有可用的出口,若无可用出口则周游失败,再对每个出口找出其可用的子出口,然后骑士移动至子出口最少的出口处,重复以上过程.

![](http://img.blog.csdn.net/20130710174118812?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhamlheW91YmE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

~~~java
import java.awt.Point;
import static java.lang.System.out;

public class KnightTour {

    // 对应骑士可走的八個方向
    private final static Point[] relatives = new Point[]{
            new Point(-2,1),
            new Point(-1,2),
            new Point(1,2),
            new Point(2,1),
            new Point(2,-1),
            new Point(1,-2),
            new Point(-1,-2),
            new Point(-2,-1)
    };

    private final static int direct = 8;

    public KnightTour(int sideLen){
        this.sideLen = sideLen;
        board = new int[sideLen][sideLen];
    }

    private int sideLen;

    private int[][] board;

    public boolean travel(int startX, int startY) {

        // 当前出口的位置集
        Point[] nexts;

        // 记录每个出口的可用出口个数
        int[] exits;

        //当前位置
        Point current = new Point(startX, startY);

        board[current.x][current.y] = 1;

        //当前步的编号
        for(int m = 2; m <= Math.pow(board.length, 2); m++) {

            //清空每个出口的可用出口数
            nexts = new Point[direct];
            exits = new int[direct];

            int count = 0;
            // 试探八个方向
            for(int k = 0; k < direct; k++) {
                int tmpX = current.x + relatives[k].x;
                int tmpY = current.y + relatives[k].y;

                // 如果这个方向可走，记录下来
                if(accessable(tmpX, tmpY)) {
                    nexts[count] = new Point(tmpX,tmpY);
                    // 可走的方向加一個
                    count++;
                }
            }

            //可用出口数最少的出口在exits中的索引
            int minI = 0;
            if(count == 0) {
                return false;
            } else {
                // 记录每个出口的可用出口数
                for(int l = 0; l < count; l++) {
                    for(int k = 0; k < direct; k++) {
                        int tmpX = nexts[l].x + relatives[k].x;
                        int tmpY = nexts[l].y + relatives[k].y;
                        if(accessable(tmpX, tmpY)){
                            exits[l]++;
                        }
                    }
                }

                // 从可走的方向中寻找最少出路的方向
                int tmp = exits[0];
                for(int l = 1; l < count; l++) {
                    if(exits[l] < tmp) {
                        tmp = exits[l];
                        minI = l;
                    }
                }
            }

            // 走最少出路的方向
            current = new Point(nexts[minI]);
            board[current.x][current.y] = m;
        }

        return true;
    }

    private boolean accessable(int x, int y){
        return x >= 0 && y >= 0 && x < sideLen && y < sideLen && board[x][y] == 0;
    }

    public static void main(String[] args) {
        int sideLen = 9;
        KnightTour knight = new KnightTour(sideLen);

        if(knight.travel(4,2)) {
            out.println("游历完成！");
        } else {
            out.println("游历失败！");
        }

        for(int y = 0; y < sideLen; y++) {
            for(int x = 0; x < sideLen; x++) {
                out.printf("%3d ", knight.board[x][y]);
            }
            out.println();
        }
    }
}
~~~

# 帕斯卡三角

~~~java
public class Pascal extends JFrame{

    private final int maxRow;

    Pascal(int maxRow){
        setBackground(Color.white);
        setTitle("帕斯卡三角");
        setSize(520, 350);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
        this.maxRow = maxRow;
    }

    /**
     * 获取值
     * @param row 行号 从0开始
     * @param col 列号 从0开始
     * @return
     */
    private int value(int row,int col){
        int v = 1;
        for (int i = 1; i < col; i++) {
            v = v * (row - i + 1) / i;
        }
        return v;
    }

    @Override
    public void paint(Graphics g) {
        int r, c;
        for(r = 0; r <= maxRow; r++) {
            for(c = 0; c <= r; c++){
                g.drawString(String.valueOf(value(r, c)), (maxRow - r) * 20 + c * 40, r * 20 + 50);
            }
        }
    }

    public static void main(String[] args) {
        new Pascal(12);
    }
}
~~~
