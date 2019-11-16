# 博客地址

<https://bit-ranger.github.io/blog/>

# 必改内容

## 1.swiftype

此服务提供站内搜索功能

服务地址: <https://swiftype.com/>

文档: <https://swiftype.com/documentation/site-search/crawler-quick-start/>

设置完毕后，您需要修改 `_config.yml` 中 `swiftype.searchId`。

在自己的引擎中，进入 `Install Search`, 你将找到 `swiftype.searchId`。

```html
<script type="text/javascript">
...
...
  _st('install','swiftype.searchId','2.0.0');
</script>
```

## 2.gitment

此服务提供评论功能

服务地址：<https://github.com/imsun/gitment>

设置完毕后, 需要修改 `_config.yml` 中的 `gitment`。
