import { v2 as cloudinary } from 'cloudinary';

import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: 'dmpstmxrj',
  api_key: '368229374619456',
  api_secret: '7-BHWhkm98c4e6v3R2TewZgJAsM',
  secure: true,
})

describe('fileUpload', () => {
  test('should upload file to Cloudinary', async () => {
    const imageUrl = 'https://image.shutterstock.com/image-vector/vector-illustration-basketball-on-fire-260nw-1932908948.jpg';
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const file = new File([blob], 'image.jpg');

    const url = await fileUpload(file);

    expect(url).toBeTruthy();

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    await cloudinary.api.delete_resources(['journal/' + imageId]);
  })

  test('should return null', async () => {
    const file = new File([], 'image.jpg');
    const url = await fileUpload(file);

    expect(url).toBeNull();
  })
});