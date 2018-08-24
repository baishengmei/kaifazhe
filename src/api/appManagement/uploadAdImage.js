import fs from 'fs';
import { uploadAdContentImageReducer } from '../atomicRequest/appManagement';
import { tryCatch } from '../helper';
import { fetchUserInfo } from '../../core/utils';

const uploadAdImage = async req => {
  const {
    _accessId: accessId,
    body: { imageId, adGroupId, adContentId },
  } = req;

  const user = fetchUserInfo(req);

  // 数据合法性已在上级进行了验证
  const imageInfo = req.file;

  const base64 = await new Promise((resolve, reject) => {
    fs.readFile(imageInfo.path, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.toString('base64'));
    });
  });

  const postData = {
    imageId: Number(imageId),
    imageName: imageInfo.originalname,
    base64,
  };

  if (adContentId) {
    postData.adContentId = Number(adContentId);
  } else {
    postData.adGroupId = Number(adGroupId);
  }

  try {
    fs.unlinkSync(imageInfo.path);
  } catch (e) {
    console.info(`unlink image failed: ${imageInfo.path}`);
  }

  const ret = await uploadAdContentImageReducer({
    accessId,
    user,
    timeout: 15000,
    data: postData,
  });

  return {
    content: {
      data: ret,
    },
  };
};

export default tryCatch(uploadAdImage);
