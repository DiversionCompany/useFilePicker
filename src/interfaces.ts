export type ReadType = 'Text' | 'BinaryString' | 'ArrayBuffer' | 'DataURL';

export type ReaderMethod = keyof FileReader;

export interface LimitFilesCofnig {
  min?: number;
  max?: number;
}
export interface UseFilePickerConfig extends Options {
  multiple?: boolean;
  accept?: string | string[];
  readAs?: ReadType;
  limitFilesConfig?: LimitFilesCofnig;
}

export interface FileContent {
  lastModified: number;
  name: string;
  content: string;
}

export type FilePickerReturnTypes = [FileContent[], FileError[], () => void, boolean];

export interface ImageDims {
  minImageWidth?: number;
  maxImageWidth?: number;
  minImageHeight?: number;
  maxImageHeight?: number;
}

export interface Options extends ImageDims {
  /**Minimum file size in mb**/
  minFileSize?: number;
  /**Maximum file size in mb**/
  maxFileSize?: number;
}

export interface FileError extends FileSizeError, FileReaderError, FileLimitError {
  name?: string;
}

interface FileReaderError {
  readerError?: DOMException | null;
}

interface FileLimitError {
  minLimitNotReached?: boolean;
  maxLimitExceeded?: boolean;
}

interface FileSizeError {
  fileSizeToolarge?: boolean;
  fileSizeTooSmall?: boolean;
}
