import type { IFile } from '@/types/IFile';
import type { IHttpClient } from '../types/api';

export class FilesServices {
  private readonly $http: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.$http = httpClient;
  }

  async uploadFile(files: File | File[]) {
    const formData = new FormData();
    let filesArray;

    if (Array.isArray(files)) {
      filesArray = [...files];
    }
    else {
      filesArray = [files];
    }
    filesArray.forEach((file) => {
      formData.append('filedata', file);
    });

    const res = await this.$http.makeRequest<IFile>({
      url: '/files',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    return res.data;
  }
}
