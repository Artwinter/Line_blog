## 01-element-可编辑表格

#### 描述:  web管理平台,展示表格的修改(element-table)如图:![image-20210310151508757](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210310151508757.png)

#### 解决: 

- 思路:  在单元格中放置`span`和`input`,绑定这data中这一行的数据,捕捉点击单元格事件和输入框失焦事件(`ele`有提供`@cell-click`事件),点击单元格控制显示/隐藏对应的`span`和`input`,并同步数据

- 代码:

  ```javascript
  //   点击表格编辑出现(ele提供事件获得 row:此行数据 column: 此列对象 cell:此单元格DOM event:此次点击事件对象)
      editMain(row, column, cell, event) {
        // console.log('此行内容', row, column, cell, event)
        if (!cell.childNodes[0].childNodes[1]) {
          return
        }
        // 通过增添类名来控制元素的显示隐藏,如果是input元素则让它聚焦
        this.cell = cell
        this.row = row
        cell.childNodes[0].childNodes[1].setAttribute('class', 'box-input')
        cell.childNodes[0].childNodes[0].setAttribute('class', 'box-input-show')
        cell.childNodes[0].childNodes[0].childNodes.forEach((item, index) => {
          if (item.tagName == 'INPUT') {
            item.focus()
          }
        })
      },
      //   可编辑表格失焦事件
      handleInputBlur(e) {
        // console.log('当前输入内容', e)
        // 当输入框失焦时,显示span隐藏input,并将输入内容同步数据至单元格显示
        this.cell.childNodes[0].childNodes[0].setAttribute('class', 'box-input')
        this.cell.childNodes[0].childNodes[1].setAttribute(
          'class',
          'box-input-show'
        )
        e.target.value = this.row.programName
      },
  ```

  

## 02-替换字符串中所有的空字符

#### 描述: 

- `String.replace(/\s/g,'')`,中的`/xxx/`表示正则表达式，`\s`表示正则匹配字符串中的空字符，`g`表示全部匹配
- 即，`/\s/g`表示字符串中所有的空字符，`String.replace(/\s/g,”)`表示替换字符串中所有的空字符串

#### 解决:

- 代码:

  ```js
  var str = '你 好 我 是 你 的 火龙果, 哈喽 我想 学习 唱 歌'
  var str1 = str.replace(/\s/g,'')
  console.log(str1) //  "你好我是你的火龙果,哈喽我想学习唱歌"
  ```

  



## 03-删除所有非数字字符,并从前往后每四位隔开一个空格

#### 描述:

- `replace(/\D/g, '')`  --  将所有的非数字字符删除
- `replace(/....(?!$)/g, '$& ')` -- 四个除回车符和换行符外的所有字符，替换为这四个字符加一个空格
- 可以链式应用

#### 解决:

- 代码:

  ```js
  var str = '你1好2我3是4李5焕6英'
  var str1 = str.replace(/\D/g,'')
  console.log(str1)  // '123456'
  var str2 = str1.replace(/....(?!$)/g,'$& ')
  console.log(str2)  // '1234 56'
  
  //  链式应用
  str = '1你2好3我4是5李6焕7英8,9你  好 我 是 张 小  斐'
  var str3 = str.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
  console.log(str3)  // '1234 5678 9'
  ```

  



## 04-`FormData`+`Axios`多图上传

#### 描述:

- 有时需求是这样的:  需要一次请求,上传多张图片
- 配合`FormData`和`Axios`可以这样实现

#### 解决:

- 代码

  ```js
  // 拿到文件信息 数组  files
  const {files} = this.state;
  // 实例化 FormData 对象
  let param = new FormData()
  // 循环遍历这个文件信息数组,通过 append 方法将文件全部添加到实例化FormData对象中(此处我觉得forEach写起来相比for循环更为简洁)
  for (var i = 0; i < files.length; i++) {
        param.append('file', files[i].file)
      }
  console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
  ```



## 05-`Vue`中输入银行卡号匹配开户行

#### 描述: 

- 大概思路就是: 引入文件,文件内部写好了对应银行的正则匹配,我们调用文件中抛出的方法

#### 解决:

- 详情请看 此贴 [银行卡匹配开户行](https://blog.csdn.net/T_Y_Y_T/article/details/102718964)



## 06-`Vue`计算属性的传值

#### 描述:

- 在一些场景下,我们需要把计算属性当成过滤器使用,也就是通过形参传参的方式来加工这个数据
- 如果我们直接通过计算属性传值的话就会报错,需要使用 闭包来解决这个 传值报错?(是闭包嘛)
- 比如,有一些状态 0123 他们分别代表不同的状态文案,我们需要对这个数据进行加工

#### 解决:

- 代码:

  ```js
  //   播放状态
  
  // 这是表格中的一行,我们获取到此行的数据,然后传给计算属性,在内部进行数据的加工
  <template>
      <el-table-column prop="programStatus" label="状态">
              <template slot-scope="scope">
                  // 传入数据
                {{ showState(scope.row) }}
              </template>
  	</el-table-column>
  </templte>
      // 计算属性 showState 通过闭包传入数据?
      showState() {
        return function (row) {
          if (Date.parse(row.playDate) < Date.parse(new Date()) - 3 * 86400000) {
            return '已过期'
          } else if (row.state == 0) {
            return '待开始'
          } else if (row.state == 1) {
            return '播放中'
          } else if (row.state == 2) {
            return '可回放'
          }
        }
      },
  ```

  

## 07-el-table-去除表头多选框或换为文字

#### 描述:

- ![image-20210310161217820](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210310161217820.png)

#### 解决:

- 代码：详情请看  [el-table-去除表头多选框](https://www.cnblogs.com/jxfd/p/13749128.html)![image-20210310161255925](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210310161255925.png)



## 08-前端读取文件

#### 描述:

- 有时候需要我们前端自己读取某些文件的内容
- 例如: 读取txt文档中的内容,并转为我们可用的数据
- 详情 点击 [这里](https://blog.csdn.net/xianweizuo/article/details/88911364)



## 09-快速删除`node_modules`

#### 描述: 

- 在我们项目出现问题,需要重新下载依赖的时候需要删除 这个文件夹
- 但是我们手动删除的又很慢
- 所以我们可以安装一个npm插件来帮助我们删除
- 这个有一个问题,就是如果 提示没有权限什么的,我们还是会无法删除
- 目前已知的解决权限问题的就是: 重启电脑进入-> 安全模式 -> 删除文件

#### 解决:

- 代码:

  ```node
  npm install rimraf -g  // 首先安装 npm包
  rimraf node_modules  // 进入要删除的文件夹执行命令
  ```



## 10-`H5直播`用到的播放器

#### 描述:

- 有一些直播项目,例如 实时路况 , 电视节目直播都会用到播放器来进行播放
- 播放器: [DPlayer](http://dplayer.js.org/zh/guide.html)  [Chimee](http://chimee.org/)  [MuiPlayer](https://muiplayer.js.org/zh/)
- 在实时路况项目中用到的是 `DPlayer` :可以播放直播,可以播放视频,支持多种格式



## 11-`VueBaiduMap`

#### 描述: 

- `Vue`百度地图使用文档
- 具体使用 点击  [此处](https://dafrok.github.io/vue-baidu-map/#/zh/control/navigation) 查看



## 12-`Git`切换镜像的方法

#### 描述: 

- 我们在安装 项目依赖包时 难免会遇到网速不好/下载错误的情况
- 此时我们可以试试更换`Git`镜像地址来解决此问题
- 详情点击 [此处](https://www.jianshu.com/p/80972f760d6c) 查看

#### 解决:

- 代码:

  ```bash
  第一种（链接切换）： 
  1.全局切换镜像： npm config set registry http://registry.npm.taobao.org/
  
  2. 查看镜像使用状态：npm get registry
  
  3.直接使用npm 下载包：npm install ****
  
  ps:全局切换回官方源  npm config set registry http://www.npmjs.org
  
  
  
  第二种（nrm切换）：
  1.利用npm 下载nrm：sudo npm install -g nrm
  
  2.查看可切换的镜像源： nrm ls
  
  3.切换镜像源（如淘宝）：nrm use taobao
  
  4.直接使用npm 下载包： npm install ****
  
  ```





## 13-`Vue`文件结构/`Vue.config.js`配置

#### 描述:

- `Vue`文件结构的说明
- `Vue.config.js`配置的详细说明

#### 解决:

- 详情点击 [此处](https://www.cnblogs.com/echoyu/p/13417734.html) 查看





## 14-`Typora`图片云存储

#### 描述:

- 我们在使用`Typora`时图片只能存本地就很懊恼
- 解决给别人传`Typora`编辑的`.md`文档无法携带图片问题
- `Typora`配合`PicGo`实现在`Typora`编辑文档时，图片自动上传至云图床

#### 解决:

- 详情点击 [此处](https://blog.csdn.net/qq_37768368/article/details/109216411) 查看
- **注: 本Markdown文档就使用了此教程对图片进行云存储**





## 15-定时更新列表状态

#### 描述:

- 需求: 后台管理平台 节目单列表的状态
- 当其中节目播放时间到了的时候需要将其状态更改为播放中
- 状态则是根据后端返回的 字段 根据   0 1 2 3 来判断的
- 所以我们需要在节目开始播放的时间去刷新列表

#### 解决:

- 思路: 就是判断当前时间是否和节目播放时间一致,如果一致就去发送请求更新列表

- 但是有一个弊端就是 如果当时接口出错误了获取延迟了,那再次判断时就不符合上述条件了

- 所以我们要对这个判断进行 容错率的处理,并且这个判断需要一直执行,所有用到了无限循环定时器

- 一样的定时器也有一个弊端那就是占用内存,可能造成内存泄漏,所以我们在 页面销毁钩子函数中一样的销毁这个定时器

- 代码:

  ```js
  this.timer = setInterval(() => {
      	// 获取当前时间的  年月日并且对月日就行补0
          var myDate = new Date()
          var yyyy = myDate.getFullYear()
          var mm = myDate.getMonth() + 1
          var d = myDate.getDate()
          // 补0
          if (mm < 10) {
            mm = '0' + mm
          }
      	// 补0
          if (d < 10) {
            d = '0' + d
          }
      	// 拼接到一起
          var todayTime = yyyy + '-' + mm + '-' + d 
          // console.log('定时器在运作')
          // 遍历这个节目单数组
          this.tableData.forEach((item, index) => {
            // console.log('当前时间', Date.parse(new Date()))
            // console.log('节目时间', Date.parse(todayTime.concat(' ' + item.playingTime)))
            // console.log(Date.parse(todayTime.concat(' ' + item.playingTime)) + 10 * 1000)
            if (
              // 这个是只有 当前时间完全等于 节目播放时间时才会进入
              // Date.parse(new Date()) == Date.parse(todayTime.concat(' ' + item.playingTime))
              // 这个是可以有一些延迟 当前时间大于等于节目播放时间但是小于播放时间+一秒才会进入
              // Date.parse 可以将 时间转换为 时间戳 毫秒
              Date.parse(new Date()) >= Date.parse(todayTime.concat(' ' + item.playingTime)) && Date.parse(new Date()) <= Date.parse(todayTime.concat(' ' + item.playingTime)) + 1000
            ) {
              console.log('进入了开始时间刷新')
              this.zGetTvList()
            }
          })
        }, 1000)
  ```




## 16-`css`样式`user-select`控制是否可复制文本

#### 描述:

- 如果我们的网站上有着一些不想让用户复制的文本,我们可以使用此属性
- `user-select`属性指定是否可以选择元素的文本
- 这对除文本框之外的内容没有任何影响

#### 解决:

- 代码:

  ```css
  .row-of-icons {
      -webkit-user-select: none; /* Chrome & Safari all */
      -moz-user-select: none; /* Firefox all */
      -ms-user-select: none; /* IE 10+ */
      user-select: none; /* 此属性 设置为 none则无法被选中 */
  }
  ```

  ```css
  .force-select {
      user-select: all;  /* 此属性设置为 all则点击就全部选中 */
      -webkit-user-select: all; /* Chrome 49+ */
      -moz-user-select: all; /* Firefox 43+ */
  }
  ```

  

## 17-`Chrome`扩展插件生成网页骨架屏

#### 描述:

- 我们在写项目的时候,尤其是移动端项目,在首屏渲染的时候总是会出现短暂白屏
- 我们使用了 骨架屏来解决首屏渲染时出现的短暂白屏现象
- 如图![image-20210311095522209](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210311095522209.png)

#### 解决:

- 插件下载地址 请点击 [此处](https://raw.githubusercontent.com/mobl/page-skeleton-plugin/blob/master/app.zip)



## 18-遍历器`Iterator`和`for...of`循环

#### 描述:

- 一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。
- `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

#### 解决:

- 代码演示

  ```js
    	// for...of 遍历数组
  	var arr = ['a','b','c','d']
    	for (let item of arr) {
        	console.log(item)  //  'a' 'b' 'c' 'd'
    }
  	// 数组的扩展方法 entries()  keys()  values()
  	// keys 遍历键名
  	for (let index of arr.keys()) {
          console.log(index)  //  0,1,2,3
     }
  	// values 遍历键值
  	for (let item of arr.values()) {
          console.log(item)  //  'a' 'b' 'c' 'd'
      }
  	// entries 遍历键值对
  	for (let [item,index] of arr.entries()) {
          console.log(item,index)  // 0 'a' 1 'b' 2 'c' 3 'd'
      }
  ```

  

  

  

## 19-几种`for`循环谁最快?

#### 描述:

- `for`循环有很多变形
- 例如: `for`、`for(倒序)`、`for...of`、`forEach`、`for...in`、`for...await`

#### 结果：

- 偷偷告诉你 `for`最快噢

- 详情请点击 [此处](https://juejin.cn/post/6930973929452339213) 查看



## 20-2020年底面经

- 点击 [此处](https://alexwjj.github.io/views/fe/interview/2020%E5%B9%B4%E5%BA%95%E9%9D%A2%E7%BB%8F.html#%E6%9C%89%E8%B5%9E-offer) 查看



## 21-小程序中打开文件

#### 描述:

- ![image-20210317101547061](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210317101547061.png)
- 例如此页面点击查看文件
- 两种情况:  打开的是 `html` 文件   ||    打开文件   `doc xls ppt pdf docx xlsxx`等

#### 解决:

- ![image-20210317101753947](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210317101753947.png)



## 22-获取年月日API

#### 描述:

- `new Date().toLocaleDateString()`

- 通过API 获得年月日 无需要手动计算
- 注意: 此 API在不同浏览器下输出格式不同,注意使用

#### 演示:

- 代码: 

  ```js
  new Date().toLocaleDateString();//当前年月日
  // 输出 "2021/3/18" (谷歌浏览器) 
  ```





## 23-去除数组中的空值

#### 描述：

- 在一些场景下数组的数据,可能并不规范,比如会有一些空值

- ```js
  var arr = ['hello', '', 'world', null, '!'];
  ```

- 例如以上情况我们需要 去除数组中的空值

#### 解决:

- 代码:

  ```js
  var arr = ['hello', '', 'world', null, '!'];
  arr.filter(Boolean); // ["hello", "world", "!"]
  ```

- 直接在 `filter`判断条件里写 `Boolean`即可判断 布尔值为`false`的自动将其剔除



## 24-从一个对象中取部分值给另一个对象

#### 描述:

- 在一些场景中,我们需要将 一个对象中的部分属性,赋值给另一个对象

- ```js
  let obj = { a: 1 , b: 2 , c: 3}
  ```

- 如上,如果我们需要 `obj`对象中的部分属性给另一个对象则:

#### 解决:

- 方法一 --/  利用解构特性实现

  ```js
  let obj = { a: 1 , b: 2 , c: 3}
  let { a, b } = obj
  let obj1 = { a, b }
  ```

- 方法二 --/  利用解构+`...`展开运算符实现

  ```js
  let obj = { a: 1 , b: 2 , c: 3}
  let { a, ...val } = obj // 把不需要的属性放前面, val就是剩下的属性
  console.log(val) // { b: 2 , c: 3 }
  ```



## 25-`computed`作为`V-model`绑定值那些事儿

#### 描述:

- 当我们在某些情况下,我们的 `V-model`需要绑定一个判断式
- `!` 但是 `V-model` 是不允许绑定 判断式的 所以我们 可以用 `computed`计算属性来解决这个问题
- 注:  `V-model` 不可以绑定 函数（带括号的）、判断式。
- 但是如果用 `computed`计算属性的话,又有一个新的问题出现了,那就是会影响`Vue`关于`V-model`的双向绑定问题会报出如下错误![image-20210331172047813](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210331172047813.png)

#### 解决:

- 通过重写`computed`计算属性来解决此问题

- 解题思路: 通过 `get` 和`set`重新进行读取和写入的判断,每当 读取和写入的时候都会经过里面的判断

- 代码演示

  ```js
  computed : {
  	modelVal : {
  		get () {
  			if (this.val == 1) {
  				return true
  			}  else {
                  return false
              }
  		}
          set (val) {
              if (val == 1) {
           		return true       
              } else {
                  return false
              }
          }
  	}
  }
  ```

  



## 26-`Vue router.replace`的问题

#### 描述:

- 场景描述 `a<b<c`,`a`正常`push`到`b`,`b`正常`push`到`c`,`c`返回`b`的时候需要不保存路由历史跳转到`b`,此时使用到了`replace`,但是在使用的过程中发现,在未知的条件下此方法会出现异常,当你使用它从`c`跳转到`b`,问题就出现了,在`b`页面需要返回两次才能返回到`a`页面,而这两次返回的视觉效果没有变化,页面也没有发生变化,感觉就是重新加载了一次`b`页面,然后返回才返回到`a`页面,就很神奇离谱

#### 解决:

- 通过一番面向百度编程,搜索查看了很多文档后发现,好像`replace`确实有这种隐形`bug`
- 搜阅的文档博客里,提到可以使用`js`原生的`history`的`api`来手动去跳转和无痕跳转
- 这里我的解决办法,也很神奇离谱,我从`b`到`c`页面也是用了`replace`,然后在`c`页面调用了`history`的原生`api`,又储存了从`b`跳转到`c`的历史记录,然后判断历史记录的长度来决定是否再添加一次历史记录然后在手动返回一次
- ![image-20210705114529049](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210705114529049.png)



## 27-`H5`播放器-`MuiPlayer`遇到的问题

#### 描述:

- 关于移动端扩展 滑动音量不管用的问题

#### 解决:

- 在`MuiPlayer`官方文档中有一项 动作事件监听

- 根据示例配置一下在滑动音量时,调整`video`的`volume`音量

- ```js
  // 音量调节时触发
  mp.on('volume-change',function(e) {
      mp.video().volume = e.size;
  });
  ```

- `MuiPlayer` [官方文档](https://muiplayer.js.org/zh/guide/mui-player-mobile-plugin.html#%E5%8A%A8%E4%BD%9C%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC)

#### 描述

- `MuiPlayer`的自动播放问题
- 因为浏览器策略限制,现移动端大多数无法 有声自动播放,但是可以静音自动播放,而`MuiPlayer`在刚开始配置时发现通过`videoAttribute`给`video`标签设置`muted`来实现自动播放竟然无效,后面学习沟通发现需要在初始化时配置`MuiPlayer`的`volume`为`0`然后`autoplay`设置为`true`这样就可以静音自动播放了
- ![image-20210705144833340](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/image-20210705144833340.png)



#### 描述和解决

- 继上个问题,我们实现了静音自动播放后,在页面视觉展示上发现播放器竟然没有提供一个可切换静音的按钮,于是我们查看官方文档,发现有自定义播放器控件的实例
- 于是我们去 阿里巴巴[Iconfont](https://www.iconfont.cn/)上面找到合适的字体图标来进行自定义播放器控件,这之中遇到了一些问题
- 根据示例使用`templte + slot`来添加控件时发现并没有生效,后换成`div + slot`之后解决了此问题
- 之后是配置样式的问题,样式一直不生效,后面给 外部的`div`配置了宽度来限制大小,然后给根据`iconfont`的实例引入字体图标以`svg`的方式设置`svg`的样式,解决了样式的问题
- 再之后是给静音按钮设置点击事件,来达到静音和取消静音的效果,然而在直接给外部`div`或`svg`设置`click`事件时,发现事件无效,绑定不成功,然后查看官方文档发现在自定义控件的语法里有提供点击事件,然后根据示例完成了点击事件的绑定
- 继点击事件绑定完成后,去实现点击切换静音和取消静音的功能和图标,又出现了问题,在我在`div`里写了俩个`svg`然后根据`v-if`去切换后发现无效,然后我有尝试了写两个控件也就是两个`div`里面包不同的`svg`发现一样的无效,之后在点击事件里发现了点击的事件对象`svg`,然后通过切换`svg`的内部`use`标签的`xlink-href`的值来切换不同的字体图标这样来解决了图标切换的问题,关于功能的实现则是根据`video`来获取音量,根据音量来去修改`video`的`volume`的值(0/1),这样实现了功能
- 又来~, 功能和图标的切换都实现完成之后,测试时发现再第一次进入页面时,直接去点击静音按钮会报错,大致是获取不到`svg`事件对象,略一想发现`svg`的事件对象是在点击之后才被我储存起来的,在点击之前当然是获取不到的,所以就想到了`MuiPlayer`提供的另一方法`myVideo.getControls()`使用此方法来获取所有的控件事件对象,然后有了事件对象之后,去执行之前写好的逻辑,这样解决了此问题



## 28-`H5`直播中遇到的问题

#### 描述

- 页面布局为 头部视频播放区  中部评论互动区 底部输入评论区
- 需求为 头部固定  底部固定  中间互动区可以滚动查看评论

#### 解决

- 给 互动区设置固定的高度,然后 `overflow: auto;`,在内容超过了设置的高度之后就会自动出现滚动条来查看因高度隐藏的评论

#### 描述

- H5页面键盘遮挡输入框的问题
- 在输入评论时,点击输入框会弹起软键盘,这时软键盘会遮盖住输入框,导致看不到输入的内容,用户体验差

#### 解决

- 在弹起软键盘时调用`scrollIntoView`方法,将调用它的元素滚动到浏览器窗口的可见区域,来解决键盘遮住输入框的问题

- 关于`scrollIntoView`方法的 [详细介绍](https://blog.csdn.net/learn8more/article/details/108047794)

- ```js
  // 因为是在vue中所以调用了$nextTick来实现在DOM发生变化才去执行
  // 不然执行过快的话,此时输入框还未被遮挡就会造成没效果的问题出现
  // 如果在原生js中的话可以使用定时器来实现$nextTick的效果
  this.$nextTick(() => {
              console.log('nextTick');
              this.$refs.sendMsg.scrollIntoView(false);
  });
  ```



## 29-两个数组对象比较是否相同

#### 描述

- 两个数组对象比较是否相同,此处需求顺序不同也算相同

- ```js
  let arr = [
  	{
          id: 1,
          name: 'ni'
      },
      {
          id: 2,
          name: 'ni'
      },
      {
          id: 3,
          name: 'ni'
      },
      {
          id: 4,
          name: 'ni'
      }
  ]
  let arr1 = [
  	{
          id: 1,
          name: 'ni'
      },
      {
          id: 2,
          name: 'ni'
      },
      {
          id: 3,
          name: 'ni'
      },
      {
          id: 4,
          name: 'ni'
      }
  ]
  ```

#### 解决

- ```js
  // 判断两个数组是否相同根据id
  // 通过every在arr2里的每一项里获取, arr1的id属性数组和arr2的id属性数组
  // 然后使用 includes来判断 arr1的id数组里是否有arr2的id数组里的每一项
  // 如果每一项都有则是 相同的, 如果有一项不同则会 return fasle 表示不同
  function Compare(arr1, arr2) {
     return arr2.every((item, inx, arr) => {
          let id = arr2.map(v=>v.id)
          let id1 = arr1.map(v=>v.id)
          return id1.includes(id[inx])
      })
  }
  ```





## 30-基于`URLSearchParams`或`URL`获取queryString的值

#### 描述

- 常用的方式是使用正则或者`split`方法，其实不然，`URLSearchParams`和`URL`都能很好的实现功能。

#### 示例

- ```js
  // 测试地址： /index.html?pid=10
  const urlSP = new URLSearchParams(location.search);
  function getQueryString(key){
      return urlSP.get(key)
  }
  // 10
  const urlObj = new URL(location.href);
  function getQueryString(key){
      return urlObj.searchParams.get(key)
  }
  // 10
  // 作者：云的世界
  // 链接：https://juejin.cn/post/6987166546502090788
  // 来源：掘金
  ```

  



## 31-scrollTo方法的平滑滚动

#### 描述

- 涨知识: 指定滚动条位置时可以使用此方法指定滚动条位置

#### 示例

- 使用方法示例:

  - 两种方法

  - 一种是直接  设置 x,y轴的位置

  - 第二种是  传入一个对象,对象有三个参数 top,left,behavior

    - top: y 轴
    - left: x 轴
    - behavior: 滚动行为(过渡方式)    
      -   'smooth' (平滑滚动)
      -   'instant'  (瞬间滚动)
      -   默认值: auto  效果等同于 瞬间滚动

  - 代码示例:

    - ```js
      1.scrollTo(x,y)   //指定滚动到x轴和y轴的位置
      2.scrollTo(options)  //options有三个参数，（left,top,behavior ）,
      top 等同于  y-coord
      left 等同于  x-coord
      behavior  类型String,表示滚动行为,支持参数 smooth(平滑滚动),instant(瞬间滚动),默认值auto,实测效果等同于instant
         window.scrollTo({
                          top: 0,
                          behavior: "smooth"
                      });
      ```

      




## 32- `rem`的计算

#### 描述

- 项目中要使用`rem`来做多屏幕适配

#### 示例

- ```js
  function rem() { // 监控页面尺寸变化重新计算REM
    document.documentElement.style.fontSize =
      document.documentElement.clientWidth / 75 + 'px'
  }
  rem()
  window.onresize = rem
  ```

  

## 33.`VsCode`的代码片段折叠

#### 描述

- 在使用 VsCode 进行开发时,经常会用到注释功能,而有一些注释代码,在注释掉后无法折叠,非常占用我们的开发视野,此时我们就可以用`#region``#endregion`,这两个关键字来对需要折叠的部分代码进行折叠

#### 示例

- ```js
  #region
    const xx = 'xx'
    const yy = () = > {}
  #endregion
  ```

- 此时被`#region``#endregion`包裹的代码就可以进行折叠的操作,来为我们的开发视野省出空间



## 34.console.log 报警

#### 描述

- 在学习 `vue3+ts+vite` 时,根据掘金上的 [一篇文章 ](https://juejin.cn/post/7036745610954801166#heading-26)去照着敲的过程中使用了`console.log`,发现`console.log`一直被标黄也就是`warn`

#### 解决

- 原因后面找到是因为,照着抄了文章中的 `eslint`规则,而在规则中有这么一句话

  - ```json
    // 禁止出现console
    "no-console": "warn", // off 关闭检查 console
    ```

- 修改这句话就可以了,如果以后在遇到类似的代码规则检查报错可以去项目根目录下找到`.eslintrc.js`修改对应的规则



## 35.`5W1H` 分析法

#### 描述

1. 对象 (`what`)  -- 什么事情
2. 场所 (`where`) -- 什么地点
3. 时间 (`when`) -- 什么时间
4. 人员 (`who`) -- 什么人
5. 为什么 (`why`) -- 为什么 原因
6. 方式 (`how`) -- 如何 怎样



## 36.`Axios`中的`transformRequest`

#### 描述

- `transformRequest` 允许在向服务器发送前，修改请求数据

- 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法

- 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream

- ```js
  transformRequest: [function (data, headers) {
      // 对 data 进行任意转换处理
      return data;
    }],
  ```

- 参数 `urlencoded`编码

- ```js
  // 对参数进行 urlencoded 编码
  axios.defaults.transformRequest = [
    (data) => {
      let ret = "";
      for (const it in data) {
        ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
      }
      return ret;
    },
  ];
  ```




## 37.`element-ui`内置方法传入私有(自定义)参数

#### 描述

- 在使用element的上传组件时在以下几个钩子中传递其他参数

- ![img](https://raw.githubusercontent.com/Artwinter/uploadImg/master/picgoImg/1009106-20190917202213899-780772632.png)

- 图中是文件上传时的几个钩子，参数为文件或文件列表或者其他参数，但是现在我想在原有参数上传递其他参数。比如我想在on-success的钩子中传递一个自定义参数i，原本是这样写的：

  - ```js
    :on-success=”handleSuccess（i）” //handleSuccess是一个方法
    ```

  - 但是发现这样写取不到自身原来的参数

#### 解决

- 后来在网上找到了一个比较好的方法

- ```js
  :on-change="(file,fileList)=>handleChange(file,fileList,index)"
  ```

- 这样就既可以获取到原有的参数又可以获取自定义传递的参数





## 38-函数的柯里化(多重箭头函数)

#### 描述

- 首先得去了解一下柯里化的概念

- 多个箭头函数就是一种柯里化的表现形式

- 多个箭头函数的意思是函数有多个形参,通过`ES6`的箭头函数拆分成多个

  - 先看简单的例子

    - ```js
      // 这三个函数的意思是一样的
      let sum = (a, b) => a + b
      var sum = function (a) { return function (b) { return a + b; }; }
      let sum = a => b => a + b
      alert(sum(1)(2))
      ```
  
- 然后是复杂一些的例子
  
  - ```js
      const pige = (...obj) => input => obj.reduce((acc, val) => val(acc), input)
      ```
  
  - 这个多重箭头函数转换成普通函数的话是这样的
  
  - ```js
      const pige1 = function (...obj) {
          return function (input) {
              return obj.reduce((acc, val) => val(acc), input)
          }
      }
      // 
      ```
  
  - 此处 reduce 方法的参数[点击此处查阅](https://www.jianshu.com/p/e375ba1cfc47)