import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import s from './index.css';
import { componentUpdateByState } from '../../../../core/utils';

const uploadBtn = (
  <div className={s['image-uploader-picture-card']}>
    <Icon type="upload" />
    <div className={s['image-uploader-text']}>上传图片</div>
  </div>
);

const acceptImageType = ['image/jpg', 'image/jpeg', 'image/png'];

// 获取上传数据 Getter 方法
const getUploadDataGetter = data => file => ({
  imageId: file.imageId,
  ...data,
});

/* eslint-disable no-param-reassign */
// 根据 antd Upload 组件的文件对象的状态更新上传结果
const updateUploadResult = (imgInfo, file) => {
  if (!imgInfo) return;

  const { status, response } = file;

  imgInfo.file = file;

  if (status === 'done' && response) {
    if (response.errcode === 0) {
      imgInfo.valid = true;
      imgInfo.value = response.data.url;
      if (!file.thumbUrl) {
        file.thumbUrl = response.data.url;
      }
    } else {
      // 样式设置为错误样式
      file.status = 'error';
      imgInfo.valid = false;
      imgInfo.value = '';
      file.response = response.errmsg;
      Modal.error({
        title: '错误',
        content: response.errmsg,
        okText: '确定',
      });
    }
  } else if (status === 'removed') {
    imgInfo.file = undefined;
    imgInfo.value = '';
    imgInfo.valid = false;
  } else if (status === 'error') {
    imgInfo.valid = false;
    imgInfo.value = '';
    // response 为 object 的时候，
    // upload 组件内部会报错
    file.response = response.errmsg;
    Modal.error({
      title: '错误',
      content: response.errmsg,
      okText: '确定',
    });
  }
};

class ImageUploader extends React.Component {
  static propTypes = {
    imageInfoList: PropTypes.arrayOf(PropTypes.object.isRequired),
    // uploadData: PropTypes.shape({}),
    onImageChange: PropTypes.func.isRequired,
    maxSize: PropTypes.number.isRequired,
  };

  static defaultProps = {
    // uploadData: {},
    imageInfoList: [],
  };

  constructor(props) {
    super(props);
    // const { imageInfoList, uploadData } = props;
    const { imageInfoList } = props;
    this.state = {
      imageInfoList,
      previewImageSrc: '',
      previewVisible: false,
      // imageCurNum: 0,
      // imagesSumNums: 0,
      // imagesErrs: '',
      // isLoadedImages: {}, // 标记已被成功加载的图片，防止重复加载时 imageCurNum 计数错误
    };
    // this.uploadDataGetter = getUploadDataGetter(uploadData);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      imageInfoList: nextProps.imageInfoList,
    });
  }

  shouldComponentUpdate = componentUpdateByState;
  onPreviewImage = file => {
    this.setState({
      previewImageSrc: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  onCancelPreview = () => {
    this.setState({
      previewVisible: false,
    });
  };

  onImageChange = (index, file) => {
    const { imageInfoList: list } = this.state;
    updateUploadResult(list[index], file);

    const imageInfoList = [...list];
    this.setState(
      {
        imageInfoList,
      },
      () => {
        this.props.onImageChange(imageInfoList);
      },
    );
  };

  // onListenImagesLoaded = (imageCurNum, imagesSumNums, imagesErrs) => {
  //   if (imagesSumNums === 0 || imageCurNum > imagesSumNums) {
  //     this.state.imageCurNum = 0;
  //     this.state.imagesSumNums = 0;
  //     this.state.imagesErrs = '';
  //   } else if (
  //     imageCurNum === imagesSumNums &&
  //     imageCurNum !== 0 &&
  //     imagesErrs !== ''
  //   ) {
  //     Modal.warning({
  //       title: '提示',
  //       content: <p>{ReactHtmlParser(imagesErrs)}</p>,
  //       okText: '确定',
  //     });
  //     this.state.isLoadedImages = {};
  //     this.state.imageCurNum = 0;
  //     this.state.imagesSumNums = 0;
  //     this.state.imagesErrs = '';
  //   }
  // };

  beforeUploadSingle = file => {
    const validType = acceptImageType.includes(file.type);
    const validSize = file.size <= this.props.maxSize;
    const valid = validType && validSize;

    const errmsg = [
      validType ? '' : '图片格式不正确',
      validSize
        ? ''
        : `图片大小（${(file.size / 1024).toFixed(2)}KB）不符合要求`,
    ]
      .filter(Boolean)
      .join('，');

    if (!valid) {
      Modal.warning({
        title: '提示',
        content: errmsg,
        okText: '确定',
      });
      return false;
    }
    return true;
  };

  render() {
    const { imageInfoList, previewImageSrc, previewVisible } = this.state;
    // const { previewImageSrc, previewVisible } = this.state;
    const acceptImageTypeStr = acceptImageType.join(',');
    return (
      <div className={s['uploader-area-wrapper']}>
        {imageInfoList.map((imgInfo, index) => {
          let { file } = imgInfo;
          if (!file && imgInfo.valid && imgInfo.value) {
            file = {
              uid: -1,
              name: imgInfo.name,
              status: 'done',
              url: imgInfo.value,
            };
          }
          return (
            <div key={`${imgInfo.id}`} className={s['uploader-wrapper']}>
              <Upload
                action="/api/appManagement/uploadAdImage"
                name="adImage"
                listType="picture-card"
                accept={acceptImageTypeStr}
                // data={this.uploadDataGetter}
                fileList={file ? [file] : []}
                withCredentials
                beforeUpload={file => this.beforeUploadSingle(file)}
                onPreview={this.onPreviewImage}
                onChange={({ file: f }) => {
                  this.onImageChange(index, f);
                }}
              >
                {file ? null : uploadBtn}
              </Upload>
            </div>
          );
        })}
        <Modal
          wrapClassName={s['upload-image-preview-modal']}
          visible={previewVisible}
          footer={null}
          onCancel={this.onCancelPreview}
        >
          <img alt="preview" style={{ width: '100%' }} src={previewImageSrc} />
        </Modal>
      </div>
    );
  }
}

export default ImageUploader;
