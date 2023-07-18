import Script from 'next/script';

const GTM = () => {
  return (
    <>
      <Script id="gdm" src="/assets/js/couters.js" />
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KMJ8HKG"
height="0" width="0" style={{display: 'none', visibility: 'hidden' }}></iframe></noscript>
    </>
  )
};

export default GTM;
