import crypto from 'crypto';
import os from 'os';
import ExifImage from 'exif';

// hash.digest 调用后，会清空 hash，所以不能二次使用
// https://nodejs.org/docs/latest/api/crypto.html#crypto_hash_digest_encoding
const md5 = (...str) =>
  crypto
    .createHash('md5')
    .update(str.join(''))
    .digest('hex');

// stringify circular object
const stringify = obj => {
  const seen = [];
  return JSON.stringify(obj, (key, val) => {
    if (val != null && typeof val === 'object') {
      if (seen.includes(val)) return;
      seen.push(val);
    }
    return val; // eslint-disable-line
  });
};

const getIP = req =>
  req.ip ||
  req._remoteAddress || // eslint-disable-line no-underscore-dangle
  (req.connection && req.connection.remoteAddress) ||
  undefined;

// 唯一id生成器，每天从1开始
const getIdGenerator = (fmt = 'yyyymmdd') => {
  let id = 0;
  let today = new Date()[fmt]();

  return () => {
    const d = new Date()[fmt]();
    if (d !== today) {
      today = d;
      id = 0;
    }
    return (id += 1); // eslint-disable-line no-return-assign
  };
};

const getLocalIP = () => {
  const infoObj = os.networkInterfaces();
  const ipArr = Object.keys(infoObj)
    .map(key => infoObj[key])
    .reduce((a, b) => {
      a.push(...b);
      return a;
    }, [])
    .filter(a => !a.internal && a.family === 'IPv4')
    .map(a => a.address);
  if (ipArr.length === 0) {
    ipArr.push('127.0.0.1');
  }
  return ipArr;
};

// 获取 JPEG 图片宽高
const getJPGWidthHeight = buffer =>
  new Promise((resolve, reject) => { // eslint-disable-line
    if (!Buffer.isBuffer(buffer)) {
      return reject(new TypeError('only buffer can be processed'));
    }
    // eslint-disable-next-line no-new
    new ExifImage({ image: buffer }, (err, exifData) => { // eslint-disable-line
      if (err) {
        return reject(err);
      }
      resolve({
        width: exifData.exif.ExifImageWidth,
        height: exifData.exif.ExifImageHeight,
      });
    });
  });

// 获取 png 图片宽高
const getPNGWidthHeight = buffer =>
  new Promise((resolve, reject) => {
    if (!Buffer.isBuffer(buffer)) {
      return reject(new TypeError('only buffer can be processed'));
    }
    if (buffer.length < 16 + 8) {
      return reject(new RangeError('buffer length is too short'));
    }
    const signature = [0x89504e47, 0x0d0a1a0a];
    const validSig =
      buffer.readUInt32BE(0) === signature[0] &&
      buffer.readUInt32BE(4) === signature[1];
    const validIHDRPrefix = buffer.readUInt32BE(12) === 0x49484452;
    if (!validSig || !validIHDRPrefix) {
      return reject(new Error('not a valid png'));
    }
    try {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return resolve({
        width,
        height,
      });
    } catch (e) {
      return reject(new Error('invalid width or height'));
    }
  });

export {
  md5,
  stringify,
  getIP,
  getIdGenerator,
  getLocalIP,
  getJPGWidthHeight,
  getPNGWidthHeight,
};
