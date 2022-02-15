import { BasicFetchResult } from '/@/api/model/baseModel';
export interface FileItem {
  id: number;
  fileName: string;
  fileImg: Boolean;
  status?: string;
  createdTime: Date;
}

export type FileListResultVO = BasicFetchResult<FileItem>;
