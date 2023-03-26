import type { AxiosInstance } from "axios";
import type { IFile } from "../../models/IFile";

export class FilesServices {
  private readonly $http: AxiosInstance;
  constructor($http: AxiosInstance) {
    this.$http = $http;
  }

  async uploadFile(files: File | File[]) {
    const formData = new FormData();
    let filesArray;

    if (Array.isArray(files)) {
      filesArray = [...files];
    } else {
      filesArray = [files];
    }
    filesArray.forEach((file) => {
      formData.append("filedata", file);
    });

    const res = await this.$http.post<IFile>("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}
