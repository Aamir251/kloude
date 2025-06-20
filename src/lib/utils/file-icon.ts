

const getFileIconByMimeType = (file: File) => {
  const mimeType = file.type;

  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'music';
  if (mimeType.startsWith('text/')) return 'file-text';

  const specificMimeMap: {
    [k in string]: string
  } = {
    'application/pdf': 'file-text',
    'application/msword': 'file-text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'file-text',
    'application/vnd.ms-excel': 'file-spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'file-spreadsheet',
    'application/zip': 'archive',
    'application/x-rar-compressed': 'archive',
    'application/json': 'code',
  };

  return specificMimeMap[mimeType] || 'file';
};


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
    'pdf': 'file-text',
    'doc': 'file-text',
    'docx': 'file-text',
    'txt': 'file-text',
    'rtf': 'file-text',

    // Spreadsheets
    'xls': 'file-spreadsheet',
    'xlsx': 'file-spreadsheet',
    'csv': 'file-spreadsheet',

    // Presentations
    'ppt': 'presentation',
    'pptx': 'presentation',

    // Archives
    'zip': 'archive',
    'rar': 'archive',
    '7z': 'archive',
    'tar': 'archive',
    'gz': 'archive',

    // Audio
    'mp3': 'music',
    'wav': 'music',
    'flac': 'music',
    'aac': 'music',

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
  let icon = getFileIconByMimeType(file);

  // Fallback to extension if MIME type gives generic result
  if (icon === 'file') {
    icon = getFileIconByExtension(file.name);
  }

  return icon;
};

export const getFileIcon = (file: File) => {
  const iconType = getFileIconType(file);

  const iconConfig : { [ k in string ] : { icon : string }} = {
    'image': { icon: 'image.png' },
    'video': { icon: 'video.png', },
    'music': { icon: 'music.png', },
    'file-text': { icon: 'file.png', },
    'file-spreadsheet': { icon: 'spreadsheet.png', },
    'presentation': { icon: 'presentation.png', },
    'archive': { icon: 'zip.png', },
    'code': { icon: 'code.png', },
    'file': { icon: 'file.png', },
  };


  const icon = iconConfig[iconType].icon

  return `/icons/file-types/${icon}`

}