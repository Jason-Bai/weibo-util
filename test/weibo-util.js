const should = require('should');
const WeiboUtil = require('../source');

describe('WeiboUtil', function() {
  describe('#id2Mid', function() {
    it('should true when id2Mid(id) equal mid', function() {
      const mid = '4172195338725943';
      const id = 'Fui85AC11';
      should.equal(WeiboUtil.id2Mid(id), mid);
    });

    it('should true when id is number type', function() {
      const id = 123;
      const mid = '3971';
      should.equal(WeiboUtil.id2Mid(id), mid);
    });

    it('should false when id2Mid(id) not equal mid', function() {
      const mid = '4172195338725942';
      const id = 'Fui85AC11';
      should.notEqual(WeiboUtil.id2Mid(id), mid);
    });

    it('should null when id is invalid string', function() {
      const id = '&^%$%^&';
      should.equal(WeiboUtil.id2Mid(id), null);
    });

    it('should null when id is ""', function() {
      const id = '';
      should.equal(WeiboUtil.id2Mid(id), null);
    });

    it('should null when id is null', function() {
      const id = null;
      should.equal(WeiboUtil.id2Mid(id), null);
    });
  });

  describe('#mid2Id', function() {
    it('should true when mid2Id(mid) equal id', function() {
      const mid = '4172195338725943';
      const id = 'Fui85AC11';
      should.equal(WeiboUtil.mid2Id(mid), id);
    });

    it('should false when mid2Id(mid) not equal id', function() {
      const mid = '4172195338725943';
      const id = 'Fui85AC01';
      should.notEqual(WeiboUtil.mid2Id(mid), id);
    });

    it('should null when mid is invalid', function() {
      const mid = '121ada12';
      should.equal(WeiboUtil.mid2Id(mid), null);
    });

    it('should null when mid is ""', function() {
      const mid = '';
      should.equal(WeiboUtil.mid2Id(mid), null);
    });

    it('should null when mid is null', function() {
      const mid = null;
      should.equal(WeiboUtil.mid2Id(mid), null);
    });
  });

  describe('#mid2Id', function() {
    it('should true when mid type is number', function() {
      const mid = 4172195338725943;
      const id = 'Fui85AC11';
      should.equal(WeiboUtil.mid2Id(mid), id);
    });
  });

  describe('#getUrl', function() {
    it('should true when getUrl(mid, uid) equal url', function() {
      const mid = '4172195338725943';
      const uid = '2324962515';
      const url = 'http://weibo.com/2324962515/Fui85AC11';
      should.equal(WeiboUtil.getUrl(mid, uid), url);
    });
  });

  describe('#getMidUid', function() {
    it('result should container uid and mid when url is valid', function() {
      const error = null;
      const mid = '4172195338725943';
      const uid = '2324962515';
      const url = 'http://weibo.com/2324962515/Fui85AC11';
      const result = WeiboUtil.getMidUid(url);
      (result).should.containEql({ error });
      (result).should.containEql({ mid });
      (result).should.containEql({ uid });
    });

    it('result should is { error: null, mid: "4172195338725943", uid: "2324962515" } when url is valid', function() {
      const error = null;
      const mid = '4172195338725943';
      const uid = '2324962515';
      const url = 'http://weibo.com/2324962515/Fui85AC11';
      const result = WeiboUtil.getMidUid(url);
      should.deepEqual(result, { error, mid, uid });
    });

    it('result should is { error: null, mid: "4172195338725943", uid: "2324962515" } when host start with www', function() {
      const error = null;
      const mid = '4172195338725943';
      const uid = '2324962515';
      const url = 'http://www.weibo.com/2324962515/Fui85AC11';
      const result = WeiboUtil.getMidUid(url);
      should.deepEqual(result, { error, mid, uid });
    });

    it('result should is { error: null, mid: "4172195338725943", uid: "2324962515" } when host start with m', function() {
      const error = null;
      const mid = '4172195338725943';
      const uid = '2324962515';
      const url = 'http://m.weibo.com/2324962515/Fui85AC11';
      const result = WeiboUtil.getMidUid(url);
      should.deepEqual(result, { error, mid, uid });
    });

    it('result should is { error: null, mid: "4172195338725943", uid: "2324962515" } when http protocol is https and host start with www', function() {
      const error = null;
      const mid = '4172195338725943';
      const uid = '2324962515';
      const url = 'https://www.weibo.com/2324962515/Fui85AC11';
      const result = WeiboUtil.getMidUid(url);
      should.deepEqual(result, { error, mid, uid });
    });

    it('result should is { error: null, mid: "4172195338725943", uid: "2324962515" } when http protocol is https and host start with m', function() {
      const error = null;
      const mid = '4172195338725943';
      const uid = '2324962515';
      const url = 'https://m.weibo.com/2324962515/Fui85AC11';
      const result = WeiboUtil.getMidUid(url);
      should.deepEqual(result, { error, mid, uid });
    });

    it('result should is { error: WeiboUtil.ERRORS.URL } when http protocol is http and host not start with www or m', function() {
      const url = 'http://abc.weibo.com/2324962515/Fui85AC11';
      const result = WeiboUtil.getMidUid(url);
      should.deepEqual(result, { error: WeiboUtil.ERRORS.URL });
    });

    it('result should is { error: WeiboUtil.ERRORS.URL } when http protocol is https and host not start with www or m', function() {
      const url = 'https://abc.weibo.com/2324962515/Fui85AC11';
      const result = WeiboUtil.getMidUid(url);
      should.deepEqual(result, { error: WeiboUtil.ERRORS.URL });
    });

    it('should return { error: WeiboUtil.ERRORS.URL } when url is ""', function() {
      const result = WeiboUtil.getMidUid('');
      should.deepEqual(result, { error: WeiboUtil.ERRORS.URL });
    });

    it('should return { error: WeiboUtil.ERRORS.URL } when url is 123', function() {
      const result = WeiboUtil.getMidUid(123);
      should.deepEqual(result, { error: WeiboUtil.ERRORS.URL });
    });
  });
});
