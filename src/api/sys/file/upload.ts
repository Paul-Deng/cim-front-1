import { UploadApiResult } from '../../model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/@/utils/http/axios/types';

enum Api {
  UPLOAD_MODEL_URL = '/api/api-model/model/import',
}

export function uploadModelApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.UPLOAD_MODEL_URL,
      onUploadProgress,
    },
    params,
  );
}
