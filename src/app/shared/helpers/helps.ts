export function getFormatedDate(date: Date): string {
  const publishedDate = new Date(date);
  const options: any = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
  };

  return publishedDate.toLocaleString('en-US', options);
}

export function setDefaultImage(event: Event, defaultImg: string): string {
  const img = event.target as HTMLImageElement;
  img.src = defaultImg;
  return img.src;
}
