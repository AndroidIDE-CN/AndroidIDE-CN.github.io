//1223
setConfig();
setVersion();
setContact();
setSponsor();
setLinks();
setBullet();
function setConfig() {
  ajax(
    'GET',
    'https://api.aidepro.repl.co/web',
    false,
    false,
    function(success, data) {
      setLoading('安全检查中...');
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        let icon = _data.icon;
        let name = _data.name;
        let desc = _data.desc;
        let keyword = _data.keyword;
        let author = _data.author;
        let copyright = _data.copyright;
        let cover = _data.cover;
        let screenshot = _data.screenshot;
        let info = _data.info;
        let down = _data.downloads;
        let views = _data.pageviews;
        document.querySelector('link[rel="shortcut icon"]').src = icon;
        document.title = name;
        document.querySelector('meta[name=description]').content = desc;
        document.querySelector('meta[name=keywords]').content = keyword;
        document.querySelector('meta[name=author]').content = author;
        document.querySelector('meta[name=copyright]').content = copyright;
        document.querySelector('.oiEt0d').src = cover;
        document.querySelector('.T75of.cN0oRe.fFmL2e').src = icon;
        document.querySelector('.T75of.QhHVZd').src = icon;
        //document.querySelector('.Fd93Bb.ynrBgc.xwcR9d').innerText = name;
        document.querySelector('.Vbfug.auoIOc').innerText = name.replace('AIDE', '');
        document.querySelector('.ulKokd').innerText = desc;
        setInfo(false, down, false, views);
        setScreenshot(screenshot);
        document.querySelector('.bARER>html-blob').innerHTML = replaceNewline(info);
        document.querySelector('.yVZQTb').innerHTML = 'Powered By <a target="_blank" href="http://s1243808733.top">' + copyright + '</a>';
      }
    });
}

function setScreenshot(data) {
  let content = '';
  for (var i = 0; i < data.length; i++) {
    content += '<div class="ULeU3b Utde2e">\
		<div class="Atcj9b">\
		<img src="' + data[i] + '" class="T75of B5GQxf">\
		</div>\
		</div>';
  }
  document.querySelector('.aoJE7e.qwPPwf').innerHTML = content;
}

function setVersion() {
  ajax(
    'GET',
    'https://api.aidepro.repl.co/version/last',
    false,
    false,
    function(success, data) {
      setLoading('查询版本中...');
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        let versionCode = _data.versionCode;
        let versionName = _data.versionName;
        let minVersion = _data.minVersion;
        let targetVersion = _data.targetVersion;
        let updateLog = _data.updateLog;
        let downloadUrl = _data.downloadUrl;
        let fileSize = _data.fileSize;
        let updateTime = _data.updateTime;
        setInfo(bytesToSize(fileSize), false, stampToDate(updateTime * 1000, 'Y-m-d', false));
        //document.querySelector('.VAgTTd.LMcLV>div>div>div>a').innerText = '获取(' + bytesToSize(fileSize) + ')';
        document.querySelector('.u4ICaf.fg1d2g>div>a').href = downloadUrl;
        document.querySelector('.VAgTTd.LMcLV>div>div>div>a').href = downloadUrl;
        document.querySelectorAll('.HcyOxe>.cswwxf>.VMq4uf')[1].innerText = 'V' + versionName + '更新日志';
        document.querySelector('c-wiz>section>.SfzRHd').innerHTML = replaceNewline(updateLog);
      }
    });
}

function setInfo(versionName, downloads, updateTime, pageviews) {
  let obj = document.querySelectorAll('.w7Iutd>.wVqUob>.ClM7O');
  if (versionName) {
    obj[0].innerText = versionName;
  }
  if (downloads) {
    obj[1].innerText = downloads;
  }
  if (updateTime) {
    obj[2].innerText = updateTime;
  }
  if (pageviews) {
    obj[3].innerText = pageviews;
  }
}

function setContact() {
  ajax('GET', 'https://api.aidepro.repl.co/contact', false,
    false,
    function(success, data) {
      setLoading('检测网络中...');
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        _setContact(_data);
      }
    });
}

function _setContact(data) {
  let obj = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a>.pZ8Djf>.pSEeg');
  let _obj = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a');
  let obj2 = document.querySelectorAll('.o45e4d>c-wiz>section>div>.vfQhrf.BxIr0d>div>div>a>.pZ8Djf>.xFVDSb');
  obj[0].innerText = data.source[0];
  _obj[0].href = data.source[1];
  obj2[1].innerText = 'QQ群聊（' + data.group[2] + '人）';
  obj[1].innerText = data.group[0];
  _obj[1].href = data.group[1];
  obj2[2].innerText = 'QQ频道（' + data.guild[2] + '人）';
  obj[2].innerText = data.guild[0];
  _obj[2].href = data.guild[1];
}

function setLinks() {
  ajax(
    'GET',
    'https://api.aidepro.repl.co/links',
    false,
    false,
    function(success, data) {
      setLoading('检测环境中...');
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        addLinks(_data);
      }
    });
}

function setSponsor() {
  ajax(
    'GET',
    'https://api.aidepro.repl.co/sponsor',
    false,
    false,
    function(success, data) {
      setLoading('获取数据中...');
      if (!success) {
        return;
      }
      let code = data.code;
      if (code == 200) {
        let _data = data.data;
        document.querySelectorAll('.Uc6QCc>.VMq4uf')[0].innerText = '已有' + data.total_people + '人赞助';
        addSponsor(_data);
      }
    });
}

function addSponsor(data) {
  for (var i = 0; i < data.length; i++) {
    let div = document.createElement('div');
    div.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
    let content = '<img src="' + data[i].avatar + '" class="abYEib" style="margin-left: -16px;margin-right: 8px;">\
		<span class="VfPpkd-vQzf8d">' + data[i].name + '</span>\
      <canvas style="position:absolute;pointer-events:none;"></canvas>';
    div.innerHTML = content;
    document.querySelectorAll('.Uc6QCc>div')[0].append(div);
    let myElement = div.querySelector('span');
    div.addEventListener('click', function(event) {
      let x = event.clientX;
      let y = event.clientY;
      let myCanvas = div.querySelector('canvas');
      let myConfetti = confetti.create(myCanvas, {
        useWorker: true
      });
      myConfetti({
        startVelocity: 10,
        spread: 180
      });
    });
  }
  let div2 = document.createElement('div');
  div2.classList.add('VfPpkd-LgbsSe', 'VfPpkd-LgbsSe-OWXEXe-INsAgc', 'VfPpkd-LgbsSe-OWXEXe-dgl2Hf', 'Rj2Mlf', 'OLiIxf', 'PDpWxe', 'P62QJc', 'LQeN7', 'LMoCf');
  let content2 = '<span class="VfPpkd-vQzf8d">我要赞助</span>\
		<a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="https://afdian.net/order/create?plan_id=80adf53e829011edac0a52540025c377"></a>';
  div2.innerHTML = content2;
  document.querySelectorAll('.Uc6QCc>div')[0].append(div2);
}

function addLinks(data) {
  let content = '';
  for (var i = 0; i < data.length; i++) {
    content += '<div class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf PDpWxe P62QJc LQeN7 LMoCf">\
		<span class="VfPpkd-vQzf8d">' + data[i].name + '</span>\
		<a class="WpHeLc VfPpkd-mRLv6 VfPpkd-RLmnJb" target="_blank" href="' + data[i].url + '"></a>\
		</div>';
  }
  document.querySelectorAll('.Uc6QCc>div')[1].innerHTML = content;
}

function setLoading(str) {
  let value = parseFloat(document.querySelector('.first-indicator').style.transform.split('(')[1].split(')')[0]);
  value = value ? value : 0;
  value += 0.2;
  document.querySelector('.loading-message').innerText = str;
  document.querySelector('.first-indicator').style.transform = 'scaleX(' + value + ')';
  if (value >= 1) {
    setTimeout(function() {
      document.body.style.overflow = 'auto';
      document.querySelector('#console-splash-021280').style.opacity = 0;
      document.querySelector('#console-splash-021280').style.display = 'none';
    }, 300);
  }
}

function setBullet() {
  var DanMuPool = [
    {
      danmu: '6',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3093335823&spec=640&img_type=jpg'
    },
    {
      danmu: '汉化，新增功能，方便使用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2260804737&spec=640&img_type=jpg'
    },
    {
      danmu: '因为热爱',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3467125320&spec=640&img_type=jpg'
    },
    {
      danmu: '使用你的程序还要理由？',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=869827799&spec=640&img_type=jpg'
    },
    {
      danmu: '原版太难用了',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2794942751&spec=640&img_type=jpg'
    },
    {
      danmu: '美观，功能多',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3627146389&spec=640&img_type=jpg'
    },
    {
      danmu: '好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2798848176&spec=640&img_type=jpg'
    },
    {
      danmu: '用着较舒服且美观',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=865890126&spec=640&img_type=jpg'
    },
    {
      danmu: '好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=503291957&spec=640&img_type=jpg'
    },
    {
      danmu: '看的舒服',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1536723054&spec=640&img_type=jpg'
    },
    {
      danmu: '好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3257163775&spec=640&img_type=jpg'
    },
    {
      danmu: '界面还挺舒服，好看',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=939799210&spec=640&img_type=jpg'
    },
    {
      danmu: '方便',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2609428858&spec=640&img_type=jpg'
    },
    {
      danmu: '魔改版能更好的理解',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2157108231&spec=640&img_type=jpg'
    },
    {
      danmu: '好玩',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1148903602&spec=640&img_type=jpg'
    },
    {
      danmu: '好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=468129402&spec=640&img_type=jpg'
    },
    {
      danmu: '功能多',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2927634361&spec=640&img_type=jpg'
    },
    {
      danmu: '喜欢',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1847552621&spec=640&img_type=jpg'
    },
    {
      danmu: '好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=21379612&spec=640&img_type=jpg'
    },
    {
      danmu: '手机端方便',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2898167741&spec=640&img_type=jpg'
    },
    {
      danmu: '方便',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1197842527&spec=640&img_type=jpg'
    },
    {
      danmu: '好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3557275826&spec=640&img_type=jpg'
    },
    {
      danmu: '好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1641090381&spec=640&img_type=jpg'
    },
    {
      danmu: '非常好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2984537495&spec=640&img_type=jpg'
    },
    {
      danmu: '非常牛逼',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1667149115&spec=640&img_type=jpg'
    },
    {
      danmu: '很好看',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1019882157&spec=640&img_type=jpg'
    },
    {
      danmu: '可以',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=6295457&spec=640&img_type=jpg'
    },
    {
      danmu: '魔改版的设计比原版好很多，UI比原版更好看，各功能方便易找。',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1402832033&spec=640&img_type=jpg'
    },
    {
      danmu: '好',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3151620037&spec=640&img_type=jpg'
    },
    {
      danmu: '挺好',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1992598781&spec=640&img_type=jpg'
    },
    {
      danmu: 'Convenient!!!EspeciallyTranslationandCodeCompletion!',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=368905854&spec=640&img_type=jpg'
    },
    {
      danmu: '很不错',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=822490157&spec=640&img_type=jpg'
    },
    {
      danmu: '做得很好',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=2980077544&spec=640&img_type=jpg'
    },
    {
      danmu: '还可以',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3289851963&spec=640&img_type=jpg'
    },
    {
      danmu: '魔改版更好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=865252486&spec=640&img_type=jpg'
    },
    {
      danmu: '好用',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3041925895&spec=640&img_type=jpg'
    },
    {
      danmu: '魔改版牛逼',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1745947934&spec=640&img_type=jpg'
    },
    {
      danmu: '方便',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1457641994&spec=640&img_type=jpg'
    },
    {
      danmu: '因为热爱',
      avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3276485303&spec=640&img_type=jpg'
    }
  ];
  var danmuObj = $MDM({
    locate: '.PyyLUd',
    curtain: 'transparent',
    speed: 10,
    avatar: 'https://previewengine.zoho.com.cn/image/WD/o9yvm0ce51d6b80f346969f2b9fd21529a330',
    pool: DanMuPool,
    maxPoolDelay: 5,
    minPoolDelay: 0
  });

}