import type { Enums, Tables } from "../../database.types";


export const getFileMimeType = (file: File) : string => {
  const mimeType = file.type;

  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('text/')) return 'document';

  const specificMimeMap: {
    [k in string]: string
  } = {
    'application/pdf': 'document',
    'application/msword': 'document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document',
    'application/vnd.ms-excel': 'file-spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'file-spreadsheet',
    'application/zip': 'compressed',
    'application/x-rar-compressed': 'compressed',
    'application/json': 'code',
    'image/png': 'image',
  };

  return specificMimeMap[mimeType] || 'other';
};


export const getFileTypeFromName = (fileName: string) : Enums<"file_type"> => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();;

  const fileTypes = {
    image: [
      'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'tif',
      'ico', 'heic', 'heif', 'raw', 'cr2', 'nef', 'arw', 'dng'
    ],

    // Video files
    video: [
      'mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'mpg', 'mpeg',
      'm4v', '3gp', 'ogv', 'mts', 'ts', 'vob', 'asf'
    ],

    // Audio files
    audio: [
      'mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma', 'opus', 'aiff',
      'au', 'ra', 'amr', 'ac3', 'dts'
    ],

    // Document files
    document: [
      'pdf', 'doc', 'docx', 'txt', 'rtf', 'pages', 'odt', 'wpd',
      'tex', 'wps', 'epub', 'mobi', 'azw', 'azw3',
      'xlsx', 'xls', 'csv', 'ods', 'numbers', 'tsv', 'xlsm', 'xltx',
      'pptx', 'ppt', 'odp', 'key', 'pps', 'ppsx', 'potx'
    ],

    // Spreadsheet files
    // spreadsheet: [
    //   'xlsx', 'xls', 'csv', 'ods', 'numbers', 'tsv', 'xlsm', 'xltx'
    // ],

    // Presentation files
    // presentation: [
    //   'pptx', 'ppt', 'odp', 'key', 'pps', 'ppsx', 'potx'
    // ],

    // Archive/Compressed files
    compressed: [
      'zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'tgz', 'tbz2',
      'lz', 'lzma', 'z', 'cab', 'ace', 'arj', 'lha', 'sit', 'sitx'
    ],

    // Code files
    // code: [
    //   'js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'h', 'cs',
    //   'php', 'rb', 'go', 'rs', 'swift', 'kt', 'scala', 'r', 'm',
    //   'html', 'css', 'scss', 'sass', 'less', 'vue', 'svelte'
    // ],

    // Configuration files
    // config: [
    //   'json', 'xml', 'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf',
    //   'config', 'env', 'properties', 'plist'
    // ],

    // Executable files
    application: [
      'exe', 'msi', 'dmg', 'pkg', 'deb', 'rpm', 'appimage', 'snap',
      'flatpak', 'app', 'run', 'bin', 'com', 'bat', 'sh', 'ps1'
    ]
  }

  if (!fileExtension) return 'other'

  for (const [type, extensions] of Object.entries(fileTypes)) {
    if (extensions.includes(fileExtension)) {
      return type as Enums<"file_type">;
    }
  }

  return 'other'
}

export const getFileType = (file : File) : Enums<"file_type"> => {
  let type = getFileMimeType(file)

  if (type === 'file-spreadsheet' || type === 'code') {
    type = 'document'
  }
  if (type === 'other') {
    type = getFileTypeFromName(file.name)
  }
  return type as Enums<"file_type">
}



export const formatSize = (bytes: number, decimals = 0) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  let i = 0

  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }

  return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
}

export const saveFilesData = async (files: Omit<Tables<"files">, "id">[]) => {
  try {
    const resp = await fetch(`http://localhost:5173/api/save-file-data`, {
      method: "POST",
      body: JSON.stringify(files)
    })

    const data = await resp.json()
    if (!resp.ok) throw new Error(data.message)
    return {
      success: true
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      message: errorMessage
    }
  }
}