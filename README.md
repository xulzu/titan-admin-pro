# Titan admin Pro

[泰坦后台](https://github.com/xulzu/titan-admin) 是纯净版，除了axios外并无其他初始依赖

本项目是基于[泰坦后台](https://github.com/xulzu/titan-admin)添加一些常用依赖项后的pro版。

## 使用图标

本项目中使用图标的便捷方案有两种
1、使用 `components/Icon.vue` 组件, 这种方式能在代码动态拼接字符串显示图标。图标方案是Iconify Icon ，Iconify图标库中的图标都支持，注意图标不会被打包到静态资源中，是从公开的图标网站上动态加载的，如果图标网站不稳定可能会显示不出图标

> a、可以前往 `https://icones.netlify.app/collection/all` 复制一个图标名称。也可以在 `https://icon-sets.iconify.design/solar/` 这类能查图标的免费网站

> b、直接使用。例如 `<Icon icon="material-symbols:123"></Icon>`

2、使用[unplugin-icons](https://www.npmjs.com/package/unplugin-icons)图标方案。该方案会在打包时把图标打包进静态资源中，不用担心方案1中因为图标服务出问题导致图标显示不了的问题

> a、可以前往 `https://icones.netlify.app/collection/all` 复制一个图标名称。也可以在 `https://icon-sets.iconify.design/solar/` 这类能查图标的免费网站

> b、例如复制了 `system-uicons:chevron-up-circle` 这个图标、 直接使用 `<i-system-uicons:chevron-up-circle />` 的形式展示即可。项目中会自动解析该组件并完成图标下载的。
