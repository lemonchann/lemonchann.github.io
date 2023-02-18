## nginx反向代理详细教程（Centos-yum版）

### 1、安装nginx

```bash
yum install nginx -y
nginx
```

现在打开浏览器，输入服务器ip，可以看到nginx的默认页面

### 2、编辑配置文件

使用vim编辑器，没有安装vim可以用`yum install vim -y`安装

```bash
vim /etc/nginx/nginx.conf
```

把`nginx.conf`中 server 改为以下模样（按`i`进入编辑模式，左下角会出现`-- INSERT --`，用方向键移动光标）

```bash
    server {
        listen 80;
        server_name _;
        index  index.php index.html index.htm;

        location / {
            proxy_pass http://127.0.0.1:3000/; # 将3000更改为你要反代的端口
            proxy_set_header Host $proxy_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
```

按`Esc`退出编辑模式，按`:wq`回车保存，输入：

```bash
nginx -s reload
```

刷新浏览器，已经反代成功了



