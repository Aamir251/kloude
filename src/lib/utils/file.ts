import type { Tables } from "../../database.types";

export const formatSize = (bytes: number, decimals = 0) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  let i = 0

  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }

  return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
}

export const saveFilesData = async (files : Omit<Tables<"files">, "id">[]) => {
  try {

    const resp = await fetch(`http://localhost:5173/api/save-file-data`, {
      method: "POST",
      body: JSON.stringify(files)
    })

    const data = await resp.json()
    if (!resp.ok) throw new Error(data.message)
    return {
      success : true
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success : false,
      message : errorMessage
    }
  } 
}