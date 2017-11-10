# weibo-util
根据微博url获取微博ID和UID，ID转MID，MID转ID

## Installation

Using npm:

```
npm install -g weibo-util
npm install --save weibo-util
npm install --save-dev weibo-util
```

In Node.js

```
var WeiboUtil = require('weibo-util');

// do something

```

## Methods

### id2Mid

根据微博ID得到mid

```
var id = 'Fui85AC11';

var mid = WeiboUtil.id2Mid(id);
```

### mid2Id

根据mid得到微博ID

```
var mid = '4172195338725943';
or
var mid = 4172195338725943;

var id = WeiboUtil.mid2Id(mid);
```

### getUrl
根据mid和uid得到微博url

```
var mid = '4172195338725943';

var uid = '2324962515';

var url = WeiboUtil.getUrl(mid, uid);
```


### getMidUid

根据微博url得到{ error: 'xxx', mid: 'xxx', uid: 'xxx' }

```
var url = 'http://weibo.com/2324962515/Fui85AC11';

var result = WeiboUtil.getMidUid(url);
```
