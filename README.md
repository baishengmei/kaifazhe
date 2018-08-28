## ZHIXUAN 2017 — Youdao DSP Publish System 2017

有道智选开发者系统是网易有道推出的为媒体提供基于用户场景的内容广告样式。目前该系统使用 java web 技术开发的，系统比较老旧，易用性和用户体验低，且开发维护成本较高。为了解决以上的问题，决定使用前后端分离将现有系统进行重构，重新设计 UI 和用户交互，改善系统易用性，提高用户体验。该项目使用 [React Starter Kit](https://github.com/kriasoft/react-starter-kit/tree/feature/redux) 生成，里面包含了诸多当前较新的技术。

### 当前版本功能

v1.0.0 - 2018-06-26

* 首页基本功能

### 部署说明

服务部署在 三台 服务器上，分别是

* ws\***\*
  上线域名为 https://******.youdao.com。

#### 部署前的准备

部署前确保系统中已安装以下环境：

* node: >=6.31.1
* npm: 跟随 node 的版本变化
* yarn
* git

将`node`和`npm`路径添加到全局环境变量中，linux 环境建议用 [nvm](https://github.com/creationix/nvm) 管理多版本 node，windows 环境建议用 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 管理多版本 node。

另外，建议将 npm 源设置为 taobao npm 镜像，加快访问速度。命令如下：

```shell
npm config set registry=https://registry.npm.taobao.org
```

安装 yarn

```shell
npm install -g yarn
```

#### 准备项目

如果是第一次部署工程，执行下面命令：

```shell
$ git clone https://gitlab.corp.youdao.com/webfront-ad/developerSystem2018.git
$ cd developerSystem2018
$ yarn config set cache-folder /disk5/eadop/yarn 修改yarn缓存目录(线上部署时才需要)
$ yarn install
```

#### 准备文件夹及权限

在项目更目录创建 uploads 文件夹，同时保证系统有写入此文件夹的权限

#### 如何构建

构建前需要先修改上线配置文件，配置文件为 `src/config.js`，需要修改其中 `[pro]` 下的配置项：

```js
var environment = {
  [dev]: {
    nodeHost: 'zx.youdao.com:3000',
    nodePort: 5000,
    javaHost: 'qt106x.corp.youdao.com:19500', // 'nb269x.corp.youdao.com:10017'
  },
  [pro]: {
    nodeHost: '******.youdao.com',
    nodePort: 5000,
    javaHost: '********',
  },
}[env];
```

* nodeAsHost： 上线后网站对外服务的域名。
* nodePort： node 服务的启动端口。
* javaHost： node 对应的 java noah 服务的 Host。

配置改好后，在工程根目录下执行下面命令构建/打包项目。

```shell
$ yarn build:stats
```

#### 上线命令

在根目录`developerSystem2018`目录下执行下面的命令（项目根目录是指 package.json 所在目录）：

```shell
mkdir logs
```

在`build`目录下执行下面的命令：

```shell
pm2 start start.config.js --env production -e /disk5/eadop/kaifazhe/logs -o /disk5/eadop/kaifazhe/logs
// or
npm start
```

```注1：
日志需要保存到项目的根目录 logs 文件夹下。若根目录下无该路径，则需手动创建logs文件夹 mkdir logs （项目根目录是指package.json所在目录）
```

```注2：参数说明
  |        --env               |   设置NODE_ENV为生产环境
  |  -----------------------   |    -----------------
  |          -o                |   标准输出日志文件的路径
  |          -e                |   错误输出日志文件的路径
```

然后配置下域名`******.youdao.com`。

如果上线多台服务，nginx 需要按照 ip 分流，即某 ip 要固定分流到某台 server 上。

浏览器中访问 [**\*\*\***](********)。

### CHANGELOG

[Change log](./CHANGELOG.md)
注： 建议在开发者系统中加入 CHANGELOG.md，并按照 a.b.c 的版本规则进行维护。

### 开发文档

更详细的开发相关说明参见 [Dev Read](./devRead.md)
