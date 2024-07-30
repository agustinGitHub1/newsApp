import { setDefaultImage } from "./helps";

describe('setDefaultImage', () => {
  it('should set the image src to the default image URL', () => {
    const img = document.createElement('img');
    const defaultImg = 'http://example.com/default-image.jpg';
    const event = {
      target: img
    } as unknown as Event;

    const result = setDefaultImage(event, defaultImg);

    expect(img.src).toBe(defaultImg);
    expect(result).toBe(defaultImg);
  });

  it('should not set src property if target is not an image element', () => {
    const nonImageElement = document.createElement('div');
    const defaultImg = 'http://example.com/default-image.jpg';
    const event = {
      target: nonImageElement
    } as unknown as Event;

    const result = setDefaultImage(event, defaultImg);

    expect(result).toBe(defaultImg);
  });
});
