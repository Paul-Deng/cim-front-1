// import { UploadApiResult } from './model/uploadModel';
// import { defHttp } from '/@/utils/http/axios';
// import { UploadFileParams } from '/@/utils/http/axios/types';

// enum Api {
//   UPLOAD_MODEL_URL = '/api/api-model/model/import',
//   UPLOAD_BIZ_URL = '/api/api-model/model/biz/import',
//   UPLOAD_TABLE_URL = '/api/api-model/model/table/import',
//   UPLOAD_TABLE_COLUMN_URL = '/api/api-model/model/column/import',
// }
// /**
//  * @description: Upload interface
//  */

// export function uploadModelApi(
//   params: UploadFileParams,
//   onUploadProgress: (progressEvent: ProgressEvent) => void
// ) {
//   return defHttp.uploadFile<UploadApiResult>(
//     {
//       url: Api.UPLOAD_MODEL_URL,
//       onUploadProgress,
//     },
//     params
//   );
// }

// export function uploadBizApi(
//   params: UploadFileParams,
//   onUploadProgress: (progressEvent: ProgressEvent) => void
// ) {
//   const data = defHttp.uploadFile<UploadApiResult>(
//     {
//       url: Api.UPLOAD_BIZ_URL,
//       onUploadProgress,
//     },
//     params
//   );
//   console.log(data);
//   return data;
// }

// export function uploadTableApi(
//   params: UploadFileParams,
//   onUploadProgress: (progressEvent: ProgressEvent) => void
// ) {
//   const data = defHttp.uploadFile<UploadApiResult>(
//     {
//       url: Api.UPLOAD_TABLE_URL,
//       onUploadProgress,
//     },
//     params
//   );
//   console.log(data);
//   return data;
// }

// export function uploadTableColumnApi(
//   params: UploadFileParams,
//   onUploadProgress: (progressEvent: ProgressEvent) => void
// ) {
//   const data = defHttp.uploadFile<UploadApiResult>(
//     {
//       url: Api.UPLOAD_TABLE_COLUMN_URL,
//       onUploadProgress,
//     },
//     params
//   );
//   console.log(data);
//   return data;
// }
