import { getFileMimeType } from "./file";




const getFileIconByExtension = (fileName: string) => {
  const extension = fileName.toLowerCase().split('.').pop() as string;

  const iconMap: { [k in string]: string } = {
    // Images
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'webp': 'image',
    'svg': 'image',

    // Documents
    'pdf': 'document',
    'doc': 'document',
    'docx': 'document',
    'txt': 'document',
    'rtf': 'document',

    // Spreadsheets
    'xls': 'file-spreadsheet',
    'xlsx': 'file-spreadsheet',
    'csv': 'file-spreadsheet',

    // Presentations
    'ppt': 'presentation',
    'pptx': 'presentation',

    // Archives
    'zip': 'compressed',
    'rar': 'compressed',
    '7z': 'compressed',
    'tar': 'compressed',
    'gz': 'compressed',

    // Audio
    'mp3': 'audio',
    'wav': 'audio',
    'flac': 'audio',
    'aac': 'audio',

    // Video
    'mp4': 'video',
    'avi': 'video',
    'mov': 'video',
    'wmv': 'video',
    'mkv': 'video',

    // Code
    'js': 'code',
    'html': 'code',
    'css': 'code',
    'json': 'code',
    'xml': 'code',
    'py': 'code',
    'java': 'code',
  };

  return iconMap[extension] || 'file'; // fallback to generic file icon
};

const getFileIconType = (file: File) => {
  // Try MIME type first
  let icon : string = getFileMimeType(file);

  // Fallback to extension if MIME type gives generic result
  if (icon === 'other') {
    icon = getFileIconByExtension(file.name);
  }

  return icon;
};

export const getFileIcon = (file: File) => {
  const iconType = getFileIconType(file);

  const iconConfig : { [ k in string ] : { icon : string }} = {
    'image': { icon: 'image.png' },
    'video': { icon: 'video.png', },
    'audio': { icon: 'audio.png', },
    'document': { icon: 'document.png', },
    'file-spreadsheet': { icon: 'spreadsheet.png', },
    'presentation': { icon: 'presentation.png', },
    'compressed': { icon: 'zip.png', },
    'code': { icon: 'code.png', },
    'file': { icon: 'document.png', },
  };

  const icon = iconConfig[iconType].icon

  return `/icons/file-types/${icon}`

}