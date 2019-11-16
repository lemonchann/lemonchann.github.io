it is a blog Repositories
---
##[点我查看中文说明/Click here for Chinese instructions](https://github.com/bit-ranger/blog/blob/gh-pages/README_zh_CN.md)

# Blog Address

<https://bit-ranger.github.io/blog/>


# Must Modify

## 1.swiftype

This service provides the on-site search function.

Service address: <https://swiftype.com/>.

Documentation: <https://swiftype.com/documentation/site-search/crawler-quick-start/>

After the setup is complete， you need to modify the `swiftype.searchId` in `_config.yml`.

In your swiftype engine, go to `Install Search`, you will find the `swiftype.searchId`.

```html
<script type="text/javascript">
...
...
  _st('install','swiftype.searchId','2.0.0');
</script>
```

## 2.gitment

This service provides the comment function.

Service address： <https://github.com/imsun/gitment>.

After the setup is complete， you need to modify the `gitment`  in `_config.yml`.
