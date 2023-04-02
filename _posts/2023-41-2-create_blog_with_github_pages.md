---
layout: post
title: "河南理工寄WiFi食用指北"
date:   2023-4-2
tags: [geek]
comments: true
author: canisranna0
---

河里新引进的寄WiFi并没有达到承诺的效果，作为河里学子决定奉上一份正确的寄WiFi食用指北（这是一份傻瓜式指南，提问前请仔细阅读）
有问题？[进入河里]( https://www.bing.com/)

<!-- more -->

## 起因（可忽略）

河里煤砖引入Giwifi已经有一段时间，最早使用时700兆带宽并能够上下行等宽。但自开始收费起，即使付费购买套餐网络质量也极差。
首先，来了解一下giwifi,在我们宿舍内的是一个AP，硬件上采用较低成本的WiFi6和千兆网解决方案。经检查AP没有出现物理损坏，且也有其他同学反映同样问题。难么基本上确立是配置上的问题，
简单查看一下信道
[1](https://github.com/canisranna0/canisranna0.github.io/blob/master/images/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(5)/6a7bcd129f8eb275470b98139888efc.png)
[2](https://github.com/canisranna0/canisranna0.github.io/blob/master/images/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(5)/d3108d7cacb49e4221e941d470c557d.jpg)
[3](https://github.com/canisranna0/canisranna0.github.io/blob/master/images/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(5)/%E6%B5%8B%E9%80%9F%E7%BD%91%20-%20%E4%B8%93%E4%B8%9A%E6%B5%8B%E7%BD%91%E9%80%9F%2C%20%E7%BD%91%E9%80%9F%E6%B5%8B%E8%AF%95%2C%20%E5%AE%BD%E5%B8%A6%E6%8F%90%E9%80%9F%2C%20%E6%B8%B8%E6%88%8F%E6%B5%8B%E9%80%9F%2C%20%E7%9B%B4%E6%92%AD%E6%B5%8B%E9%80%9F%2C%205G%E6%B5%8B%E9%80%9F%2C%20%E7%89%A9%E8%81%94%E7%BD%91%E7%9B%91%E6%B5%8B%20-%20SpeedTest.cn%20%E5%92%8C%E5%8F%A6%E5%A4%96%203%20%E4%B8%AA%E9%A1%B5%E9%9D%A2%20-%20%E5%B7%A5%E4%BD%9C%20-%20Microsoft%E2%80%8B%20Edge%202023_3_11%2013_00_33.png)
[4](https://github.com/canisranna0/canisranna0.github.io/blob/master/images/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(5)/%E6%B5%8B%E9%80%9F%E7%BD%91%20-%20%E4%B8%93%E4%B8%9A%E6%B5%8B%E7%BD%91%E9%80%9F%2C%20%E7%BD%91%E9%80%9F%E6%B5%8B%E8%AF%95%2C%20%E5%AE%BD%E5%B8%A6%E6%8F%90%E9%80%9F%2C%20%E6%B8%B8%E6%88%8F%E6%B5%8B%E9%80%9F%2C%20%E7%9B%B4%E6%92%AD%E6%B5%8B%E9%80%9F%2C%205G%E6%B5%8B%E9%80%9F%2C%20%E7%89%A9%E8%81%94%E7%BD%91%E7%9B%91%E6%B5%8B%20-%20SpeedTest.cn%20%E5%92%8C%E5%8F%A6%E5%A4%96%203%20%E4%B8%AA%E9%A1%B5%E9%9D%A2%20-%20%E5%B7%A5%E4%BD%9C%20-%20Microsoft%E2%80%8B%20Edge%202023_3_11%2013_01_35.png)
emmmmmmm,这河里吗？真很河里。因为宿舍布局问题，每4个ap的距离都相当的近，加上信道拥挤，干涉现象严重，网络质量无法得到保证。更多的热点开启（毕竟WiFi没法用）造成更加严重的干涉现象，负反馈了属于是。（PS：以上都为虚构bushi）

## 资料查阅（点击查看原文 逃）

[SUNBK201的博客](https://blog.sunbk201.site/posts/crack-campus-network)
[校园网路由器多设备伪装指北](https://learningman.top/archives/304)
[openwrt编译与反检测部署](https://sunbk201public.notion.site/sunbk201public/OpenWrt-f59ae1a76741486092c27bc24dbadc59)

## 功能实现

移除以下角色
[请选择你的身份]()
变更角色为
[请不要将其用于非法用途]()
解决了只能连接两个不同设备的痛点

## 可实现功能（我懒得搞，但是并不难）

openwrt上有的插件功能（可直接安装的及只能编译的）[插件推荐（知乎上随便找的）](https://zhuanlan.zhihu.com/p/363374033)
自动登录脚本（在路由断电后或者Giwifi重置后需要）

## 准备工作

PC,网口（其实只要能使用设备通过网口连接路由就行，串口当然也可以，前提是你掌握相关技巧）
路由

linux环境（跑编译，云编译能用但不完全能用）

## 路由破解（以小米AC2100为例）

[SSH（参考教程，此处不详细说明）](https://blog.csdn.net/quqi99/article/details/119987526)
[telnet（同样有参考）](https://blog.csdn.net/liao1049164366/article/details/109233113)
[一键刷入](https://blog.csdn.net/qq_29183811/article/details/114577257)
[其他可以在恩山找到相关教程](https://www.right.com.cn/forum/forum.php)

## 原理讲解

多设备检测的实现可能：
## 基于 IPv4 数据包包头内的 TTL 字段的检测（确定存在）

存活时间（Time To Live，TTL），指一个数据包在经过一个路由器时，可传递的最长距离（跃点数）。 每当数据包经过一个路由器时，其存活次数就会被减一。当其存活次数为0时，路由器便会取消该数据包转发，IP网络的话，会向原数据包的发出者发送一个ICMP TTL数据包以告知跃点数超限。其设计目的是防止数据包因不正确的路由表等原因造成的无限循环而无法送达及耗尽网络资源。

这是一个比较有效且合理的检测技术，IPv4数据包下存在 TTL（Time To Live）这一字段，数据包每经过一个路由器（即经过一个网段），该TTL值就会减一。

不同的操作系统的默认 TTL 值是不同的，Windows 是 128， macOS/iOS、Linux 是 64。

因此如果我们自己接入路由器到校园网，我们的通过路由器的数据包会变为 127 或 63，一旦校园网抓包检测到这种数据包TTL不是128或64，就会判定为用户接入了路由器。

## 基于 HTTP 数据包请求头内的 User-Agent 字段的检测（校园网的频繁误判使我无法确定）

HTTP 数据包请求头存在一个叫做 User-Agent 的字段，该字段通常能够标识出操作系统类型，例如：
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36 Edg/89.0.774.45
Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405
校园网会通过多次抓包检测此字段，若发现同时出现例如Windows NT 10.0 iPad 的字段，则判定存在多设备上网。

## DPI (Deep Packet Inspection) 深度包检测技术（没有）

这个检测方案比较先进，检测系统会抓包分析应用层的流量，根据不同应用程序的数据包的特征值来判断出是否存在多设备上网。
具体可参考：[基于 DPI 技术的网络共享设备检测方法及系统](https://patents.google.com/patent/CN106411644A/zh)
此种方式已确认在锐捷相关设备上应用，GIwifi举报该功能但没有启用。

## 基于 IPv4 数据包包头内的 Identification 字段的检测（没有apple设备，有待商榷）

IP 报文首部存在一个叫做 Identification 的字段，此字段用来唯一标识一个 IP 报文，在实际的应用中通常把它当做一个计数器，一台主机依次发送的IP数据包内的 Identification 字段会对应的依次递增，同一时间段内，而不同设备的 Identification 字段的递增区间一般是不同的，因此校园网可以根据一段时间内递增区间的不同判断出是否存在多设备共享上网。 具体可以参考此专利：[基于 IPID 和概率统计模型的 NAT 主机个数检测方法](https://patents.google.com/patent/CN104836700A/zh)
Windows 的 TCP/IP 协议栈对 Identification 字段的实现是递增，而 iOS 的实现是保持全 0

## 基于网络协议栈时钟偏移的检测技术（maybe）

不同主机物理时钟偏移不同，网络协议栈时钟与物理时钟存在对应关系，不同主机发送报文频率与时钟存在统计对应关系，通过特定的频谱分析算法，发现不同的网络时钟偏移来确定不同主机。

## Flash Cookie 检测技术（时代的眼泪）

该技术已经用不到了，Flash 都凉了… 不过还是提一下。 Flash Cookie 会记录用户在访问 Flash 网页的时候保留的信息，只要当用户打开浏览器去上网，那么就能被 AC 记录到 Flash Cookie 的特征值，由于 Flash Cookie 不容易被清除，而且具有针对每个用户具有唯一，并且支持跨浏览器，所以被用于做防共享检测。
具体参考：[深信服防共享测试指导书](https://bbs.sangfor.com.cn/plugin.php?id=sangfor_databases:index&mod=viewdatabase&tid=6273)

## 解决方案

修改 TTL 为固定值（64 or 128）
修改UA：
## 1.使用 UA2F 修改 UA

最理想的方案，UA2F 可以修改所有端口的数据包，而且性能不错，不过依旧需要编译。 具体参见：[Zxilly/UA2F](https://github.com/Zxilly/UA2F)
[UA检测](http://ua.233996.xyz/)

## 2.使用代理客户端中的重写功能对 http-header 进行覆写

## 3.使用 XMURP-UA 修改 UA（优点：这是个内核模块，因此性能不错；缺点：因为是内核模块，因此稳定性欠佳，此外这个模块只能修改 80 端口的数据包，因此有些非 80 端口的数据包是修改不了的。）

git clone https://github.com/CHN-beta/xmurp-ua.git package/xmurp-ua
make menuconfig
# 在 Kernel module -> Other modules 里勾选 kmod-xmurp-ua（按 y）。保存退出。
# 正常编译镜像，镜像中就会包含插件了。
如果要单独编译此模块，需运行：

make package/xmurp-ua/compile V=sc
cd /tmp
pkg install 改成对应的xmurp-ua文件名.ipk

# 安装压缩内存插件
opkg update
opkg install zram-swap

# 检测这两个插件是否均已安装成功
opkg list-installed | grep zram-swap
opkg list-installed | grep xmurp-ua

# 重启路由器
reboot

## 4.通过 Privoxy 修改 User-Agent（不建议使用，但最简单）

# 安装 Privoxy 软件包
opkg update
opkg install privoxy luci-app-privoxy luci-i18n-privoxy-zh-cn
进入 Privoxy 管理页面设置，进入文件与目录，Action Files 中只保留 match-all.action，Filter Files 与 Trust Files 留空；进入访问控制，Listen Address 填写 0.0.0.0:8118，Permit Address 填写 192.168.0.0/16，勾选 Enable Action File Editor；进入杂项，勾选 Accept Intercepted Requests；进入日志，取消全部选项；点击保存并应用；进入 OpenWRT 防火墙设置，在自定义设置中填入以下内容：

# 将局域网内的 HTTP 请求转发到 Privoxy 代理服务器上
iptables -t nat -N http_ua_drop
iptables -t nat -I PREROUTING -p tcp --dport 80 -j http_ua_drop
iptables -t nat -A http_ua_drop -m mark --mark 1/1 -j RETURN
iptables -t nat -A http_ua_drop -d 0.0.0.0/8 -j RETURN
iptables -t nat -A http_ua_drop -d 127.0.0.0/8 -j RETURN
iptables -t nat -A http_ua_drop -d 192.168.0.0/16 -j RETURN
iptables -t nat -A http_ua_drop -p tcp -j REDIRECT --to-port 8118
打开 http://config.privoxy.org/edit-actions-list?f=0；点击 Edit，在 Action 那一列中，hide-user-agent 改选为 Enable - 在右侧 User Agent string to send 框中填写 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36，其它全部选择为 No Change；点击 Submit。

## openwrt编译
PS：（如果你有别人编译好的那么可以直接flash，没有就老实跑编译吧）
# 需要Linux环境，推荐wsl2
[云编译1](https://github.com/CoolLoong/AutoBuild-Actions)[云编译2](https://github.com/MoorCorPa/Actions-immortalWrt-UA2F)[云编译3](https://github.com/hibuddies/openwrt)[云编译4](https://github.com/P3TERX/Actions-OpenWrt)[个人编译项目](https://github.com/SunBK201/OpenWrt-R4S-glibc)
# 如果是使用 Clash 加密 + TTL 伪装方案，无需手动编译，
[下载所需固件](https://firmware-selector.openwrt.org)在刷入固件后，可以手动安装 Clash，并配置防火墙。
# 如果你使用的是虚拟机进行编译，建议使用 Clash For Windows 并开启 TUN Mode 即可接管虚拟机流量进行代理。
# 是魔法，我加了魔法！（保证魔力充足或者手动换源）

## 编译过程

# 系统软件更新
sudo apt-get update
# 下载依赖项
# 安装依赖关系与编译工具链
sudo apt install -y ack antlr3 aria2 asciidoc autoconf automake autopoint binutils bison build-essential \
bzip2 ccache cmake cpio curl device-tree-compiler fastjar flex gawk gettext gcc-multilib g++-multilib \
git gperf haveged help2man intltool libc6-dev-i386 libelf-dev libglib2.0-dev libgmp3-dev libltdl-dev \
libmpc-dev libmpfr-dev libncurses5-dev libncursesw5-dev libreadline-dev libssl-dev libtool lrzsz \
mkisofs msmtp nano ninja-build p7zip p7zip-full patch pkgconf python2.7 python3 python3-pip libpython3-dev qemu-utils \
rsync scons squashfs-tools subversion swig texinfo uglifyjs upx-ucl unzip vim wget xmlto xxd zlib1g-dev
# 创建文件目录
mkdir openwrt #新建一个目录
sudo chmod 777 openwrt #修改权限（重要）
cd openwrt #进入目录
# git源码
git clone https://github.com/openwrt/openwrt.git && cd openwrt
git clone https://github.com/coolsnowwolf/lede && cd lede
（推荐openwrt）
# openwrt-22.03 已将 iptables 移除，为避免兼容性问题，暂时切换到 openwrt-21.02
git checkout openwrt-21.02
# 更新 feeds 软件源
./scripts/feeds update -a
# 安装 feeds 软件包
./scripts/feeds install -a
(feed更新过程尽量多跑几次，直到不出现报错，这里网络问题导致更新不完全是值得注意的点)
# 测试编译环境
[make  defconfig](https://github.com/canisranna0/canisranna0.github.io/blob/master/images/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(5)/094541bn6m3bi9v3w6sqij.png)
# 开始编译
make menuconfig
# 配置（×表示编译进固件里面 M表示只编译但不写到固件里面去 （空） 留空表示不做任何操作）
# 选择编译的平台（取决于路由器芯片组）
# 选择编译机型（lede机型不全，故推荐openwrt）
# 添加一个luci WEB界面（如果你ssh很不错可以忽略）
LuCI
		--> 1. Collections
				--> luci
		--> 2. Modules
				--> Translations
						--> Chinese Simplified (zh_Hans)
		--> luci-compat
## 加入RKP-IPID

git clone https://github.com/CHN-beta/rkp-ipid.git package/rkp-ipid
make menuconfig
# 选上三个模块: kmod-ipt-u32, iptables-mod-u32, iptables-mod-filter, 搜索就能找到
# 然后勾选上 ipid
# 位于 kernel-modules->Other modules 下
# 然后保存退出

## 加入防 TTL 检测依赖

make menuconfig
# 选上两个模块: iptables-mod-ipopt, kmod-ipt-ipopt，搜索就能找到
# 然后保存退出

## 加入其它依赖

Network -> ipset
Firewall -> iptables-mod-conntrack-extra

## 加入UA2F

2021.11.02 作者对恶性 bug 进行了修复，已经经过测试，修复成功，以后无需手动进行防火墙配置，全部会自动进行配置
git clone https://github.com/Zxilly/UA2F.git package/UA2F
make menuconfig
# 选上三个模块: libmnl, libnetfilter-queue, iptables-mod-nfqueue, 搜索就能找到
# network->firewall->iptables-mod-filter
# network->firewall->iptables-mod-ipopt
# network->firewall->iptables-mod-u32
# 勾选上ua2f，在配置面板中搜索就可找到
# network->Routing and Redirection
# 然后保存退出

# 这一步可能时间比较长，要耐心（最长三个小时，这一步可以跳过，但需要在对应内核 config 文件中手动加入 CONFIG_NETFILTER_NETLINK_GLUE_CT=y，除非你知道这是什么，否则不建议你手动添加）
make kernel_menuconfig
# 然后将
# Networking support -> 
# Networking options -> 
# Network packet filtering framework (Netfilter) -> 
# Core Netfilter Configuration -> 
# Netfilter NFNETLINK interface
# Netfilter LOG over NFNETLINK interface
# Netfilter connection tracking support
# Connection tracking netlink interface
# NFQUEUE and NFLOG integration with Connection Tracking 打开

## 编译

# 预下载编译所需的软件包
make download -j$(nproc) V=s
# 编译（非wsl,速度一定程度上取决于网络）
make -j$(nproc) || make -j1 || make -j1 V=s
# 编译（wsl2）
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin make -j$(($(nproc) + 1)) || PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin make -j1 V=s

## 编译后的固件文件在：`openwrt/bin/targets` 

## 配置

# 防检测配置
- 进入 `OpenWRT` 系统设置, 勾选 `Enable NTP client`（启用 NTP 客户端）和 `Provide NTP server`（作为 NTP 服务器提供服务）
- NTP server candidates（候选 NTP 服务器）四个框框分别填写 `ntp1.aliyun.com`、`time1.cloud.tencent.com`、`stdtime.gov.hk` 、`pool.ntp.org`
## 防火墙配置

⚠️ 请按照以下规则顺序，若顺序与以下不符，可能配置不起效。
# 通过 rkp-ipid 设置 IPID
# 若没有加入 rkp-ipid 模块，此部分不需要加入
iptables -t mangle -N IPID_MOD
iptables -t mangle -A FORWARD -j IPID_MOD
iptables -t mangle -A OUTPUT -j IPID_MOD
iptables -t mangle -A IPID_MOD -d 0.0.0.0/8 -j RETURN
iptables -t mangle -A IPID_MOD -d 127.0.0.0/8 -j RETURN
# 由于本校局域网是 A 类网，所以我将这一条注释掉了，具体要不要注释结合你所在的校园网内网类型
# iptables -t mangle -A IPID_MOD -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A IPID_MOD -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A IPID_MOD -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A IPID_MOD -d 255.0.0.0/8 -j RETURN
iptables -t mangle -A IPID_MOD -j MARK --set-xmark 0x10/0x10

# ua2f 改 UA~~
# ua2f 最新版本已实现自动配置，无需手动配置防火墙（以下配置可不添加，即此处到防时钟偏移检测）
iptables -t mangle -N ua2f
#由于本校局域网是 A 类网，所以我将这一条注释掉了，具体要不要注释结合你所在的校园网内网类型
# iptables -t mangle -A ua2f -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A ua2f -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A ua2f -d 192.168.0.0/16 -j RETURN # 不处理流向保留地址的包
iptables -t mangle -A ua2f -p tcp --dport 443 -j RETURN # 不处理 https
iptables -t mangle -A ua2f -p tcp --dport 22 -j RETURN # 不处理 SSH 
iptables -t mangle -A ua2f -p tcp --dport 80 -j CONNMARK --set-mark 44
iptables -t mangle -A ua2f -m connmark --mark 43 -j RETURN # 不处理标记为非 http 的流 (实验性)
iptables -t mangle -A ua2f -m set --set nohttp dst,dst -j RETURN
iptables -t mangle -A ua2f -j NFQUEUE --queue-num 10010

iptables -t mangle -A FORWARD -p tcp -m conntrack --ctdir ORIGINAL -j ua2f
iptables -t mangle -A FORWARD -p tcp -m conntrack --ctdir REPLY~~

# 防时钟偏移检测
iptables -t nat -N ntp_force_local
iptables -t nat -I PREROUTING -p udp --dport 123 -j ntp_force_local
iptables -t nat -A ntp_force_local -d 0.0.0.0/8 -j RETURN
iptables -t nat -A ntp_force_local -d 127.0.0.0/8 -j RETURN
iptables -t nat -A ntp_force_local -d 192.168.0.0/16 -j RETURN
iptables -t nat -A ntp_force_local -s 192.168.0.0/16 -j DNAT --to-destination 192.168.1.1

# 通过 iptables 修改 TTL 值
iptables -t mangle -A POSTROUTING -j TTL --ttl-set 64

# iptables 拒绝 AC 进行 Flash 检测~~（Flash 时代已成为历史）
iptables -I FORWARD -p tcp --sport 80 --tcp-flags ACK ACK -m string --algo bm --string " src=\"http://1.1.1." -j DROP

## UA2F配置（通过终端或者ssh）

~~UA2F 最新版默认自启~~，不再需要手动添加防火墙规则，有特殊需要可自行选择相应的配置策略：

# 开机自启
uci set ua2f.enabled.enabled=1
uci commit ua2f
# 自动配置防火墙（默认开启）（建议开启）
uci set ua2f.firewall.handle_fw=1
uci commit ua2f
# 处理内网流量（默认开启），防止在访问内网服务时被检测到。（建议开启）
uci set ua2f.firewall.handle_intranet=1
uci commit ua2f
# 处理 443 端口流量（默认关闭），443 端口出现 http 流量的概率较低
uci set ua2f.firewall.handle_tls=1
uci commit ua2f
⚠️ 第三、四条规则必须在第二条规则开启的条件下才会生效
## 效果展示
[更改前](https://github.com/canisranna0/canisranna0.github.io/blob/master/images/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(5)/%E6%B5%8B%E9%80%9F%E7%BD%91%20-%20%E4%B8%93%E4%B8%9A%E6%B5%8B%E7%BD%91%E9%80%9F%2C%20%E7%BD%91%E9%80%9F%E6%B5%8B%E8%AF%95%2C%20%E5%AE%BD%E5%B8%A6%E6%8F%90%E9%80%9F%2C%20%E6%B8%B8%E6%88%8F%E6%B5%8B%E9%80%9F%2C%20%E7%9B%B4%E6%92%AD%E6%B5%8B%E9%80%9F%2C%205G%E6%B5%8B%E9%80%9F%2C%20%E7%89%A9%E8%81%94%E7%BD%91%E7%9B%91%E6%B5%8B%20-%20SpeedTest.cn%20%E5%92%8C%E5%8F%A6%E5%A4%96%203%20%E4%B8%AA%E9%A1%B5%E9%9D%A2%20-%20%E5%B7%A5%E4%BD%9C%20-%20Microsoft%E2%80%8B%20Edge%202023_3_11%2012_56_33.png)
[更改后](https://github.com/canisranna0/canisranna0.github.io/blob/master/images/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(5)/%E6%B5%8B%E9%80%9F%E7%BD%91%20-%20%E4%B8%93%E4%B8%9A%E6%B5%8B%E7%BD%91%E9%80%9F%2C%20%E7%BD%91%E9%80%9F%E6%B5%8B%E8%AF%95%2C%20%E5%AE%BD%E5%B8%A6%E6%8F%90%E9%80%9F%2C%20%E6%B8%B8%E6%88%8F%E6%B5%8B%E9%80%9F%2C%20%E7%9B%B4%E6%92%AD%E6%B5%8B%E9%80%9F%2C%205G%E6%B5%8B%E9%80%9F%2C%20%E7%89%A9%E8%81%94%E7%BD%91%E7%9B%91%E6%B5%8B%20-%20SpeedTest.cn%20%E5%92%8C%E5%8F%A6%E5%A4%96%203%20%E4%B8%AA%E9%A1%B5%E9%9D%A2%20-%20%E5%B7%A5%E4%BD%9C%20-%20Microsoft%E2%80%8B%20Edge%202023_3_11%2012_58_53.png)

## 如果可以，给个star，后续会吧编译好的包放在该仓库
戳下面进项目主页
[F***k_GiWIFI](https://github.com/canisranna0/F--K_HPU_GiWiFi)
# End！