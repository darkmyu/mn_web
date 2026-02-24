import imageCompression from 'browser-image-compression';
import { convertHeicToJpeg } from './convertHeicToJpeg';

export async function convertOptimizeImage(file: File) {
  const image = await convertHeicToJpeg(file);

  const compressedFile = await imageCompression(image, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });

  return compressedFile;
}
