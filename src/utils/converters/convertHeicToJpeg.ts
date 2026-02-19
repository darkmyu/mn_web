import { heicTo, isHeic } from 'heic-to';

export async function convertHeicToJpeg(file: File) {
  if (!(await isHeic(file))) {
    return file;
  }

  const convertedBlob = await heicTo({
    blob: file,
    type: 'image/jpeg',
    quality: 1,
  });

  return new File([convertedBlob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
    type: 'image/jpeg',
  });
}
