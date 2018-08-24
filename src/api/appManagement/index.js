import { Router } from 'express';
import multer from 'multer';
import { uploadDir } from '../../config';
import { isPositiveInteger } from '../../core/utils';
import uploadAdImage from './uploadAdImage';

// 存储图片上传的位置和文件命名
// linux 下需要注意存储图片的位置的文件夹是否有权限创建
// 如果没有权限，会导致图片上传失败
const imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    // 以进程 id、timestamp 和 accessId 计算的 filename，
    // node.js 的单线程保证了结果不会重复
    const filename = `${1e8 - process.pid}${Date.now()}${1e8 - req._accessId}`; // eslint-disable-line
    let suffix;
    if (file.mimetype === 'image/png') {
      suffix = '.png';
    } else {
      suffix = '.jpg';
    }
    cb(null, `${filename}${suffix}`);
  },
});

// 新建、编辑创意的上传图片的过滤器，筛选哪些是合法的上传
const imageFilter = (req, file, cb) => {
  const { adGroupId, adContentId, imageId } = req.body || {};
  const { mimetype } = file;
  const validType = /^image\/(png|jpeg)$/.test(mimetype);
  const idValid =
    isPositiveInteger(adGroupId) || isPositiveInteger(adContentId);
  cb(null, validType && idValid && isPositiveInteger(imageId));
};
const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 200 * 1024, // 200KB
    files: 1, // 不同图片名个数
    fields: 3, // body 中参数个数
    fieldNameSize: 100, // body 中参数名长度
    fieldSize: 100, // body 中参数值长度
  },
  fileFilter: imageFilter,
}).single('adImage');

const router = new Router();

// 新建 提交审核页面上传图片
router.post(
  '/uploadAdImage',
  (req, res, next) => {
    upload(req, res, err => {
      if (err) {
        // eslint-disable-next-line no-param-reassign
        err.message = `${err.message} (code: ${err.code}, field: ${
          err.field
        }, storageErrors: ${err.storageErrors.join(';')})`;
        err.code = 400; // eslint-disable-line no-param-reassign
      }
      next(err);
    });
  },
  uploadAdImage,
);

export default router;
