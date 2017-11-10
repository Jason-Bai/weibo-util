const ALPHAMERIC_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const WEIBO_URL_REG_EXP = /^http(s)?\:\/\/(www\.?|m\.?)?weibo\.com\/([0-9a-zA-Z\.\-\_]+)\/([0-9a-zA-Z\.\-\_]+)/;

const IS_ALPHAMERIC_REG_EXP = /^[a-zA-Z0-9]+$/;

const IS_NUMBER_REG_EXP = /^\d+$/;

const PLATFORM_TYPES = ['www.', 'm.'];

const ERRORS = {
  URL: 'check url format or platform should www or m',
};

function str62to10(str62) {
  let r = 0;
  for (let n = 0; n < str62.length; n += 1) {
    const a = str62.length - n - 1;
    const i = str62[n];
    r += ALPHAMERIC_CHARS.indexOf(i) * Math.pow(62, a);
  }
  return r;
}

function int10to62(e) {
  let r = '';
  let n = 0;
  while (e !== 0) {
    n = e % 62;
    r = ALPHAMERIC_CHARS[n] + r;
    e = Math.floor(e / 62);
  }
  return r;
}

function id2Mid(id) {
  if (!id) {
    id = '';
  }

  if (typeof id !== 'string') {
    id = id.toString();
  }

  id = id.trim();

  if (!id.length || !IS_ALPHAMERIC_REG_EXP.test(id)) {
    return null;
  }

  let weiboId = '';

  for (let r = id.length - 4; r > -4; r -= 4) {
    const n = r < 0 ? 0 : r;
    const a = r + 4;
    let i = id.substring(n, a);
    i = str62to10(i).toString();
    if (n > 0) {
      while (i.length < 7) {
        i = `0${i}`;
      }
    }
    weiboId = i + weiboId;
  }
  return weiboId;
}

function mid2Id(mid) {
  if (!mid) {
    mid = '';
  }

  if (typeof mid !== 'string') {
    mid = mid.toString();
  }

  mid = mid.trim();

  if (!mid.length || !IS_NUMBER_REG_EXP.test(mid)) {
    return null;
  }

  let weiboMid = '';
  for (let n = mid.length - 7; n > -7; n -= 7) {
    const a = n < 0 ? 0 : n;
    const i = n + 7;
    let o = mid.substring(a, i);
    o = int10to62(o);
    weiboMid = o + weiboMid;
  }
  return weiboMid;
}

function isUrl(url) {
  return WEIBO_URL_REG_EXP.test(url);
}

function getUrl(mid, uid) {
  const id = mid2Id(mid);
  return `http://weibo.com/${uid}/${id}`;
}

function getMidUid(url) {
  if (typeof url !== 'string') {
    url = url.toString();
  }

  url = url.trim();

  if (!url.length || !isUrl(url)) {
    return { error: ERRORS.URL };
  }

  const matched = url.match(WEIBO_URL_REG_EXP);

  let result;

  if (matched && matched.length) {
    const uid = matched[3];
    const mid = id2Mid(matched[4]);
    result = {
      error: null,
      uid,
      mid,
    };
  }

  return result;
}

module.exports = { id2Mid, mid2Id,  getUrl, getMidUid, ERRORS };
