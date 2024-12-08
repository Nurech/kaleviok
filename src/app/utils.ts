export const goTo = (href: string) => {
  window.open(href, '_blank');
};

export const share = ({
  title,
  text,
  url,
}: {
  title?: string;
  text?: string;
  url: string;
}) => {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
};
