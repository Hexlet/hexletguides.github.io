import Script from "next/script";

const Correction = () => {
  return (
    <>
    <Script
      src="https://cdn.jsdelivr.net/gh/hexlet/hexlet-correction@main/src/widget/index.js"
      strategy="lazyOnload"
      onReady={() => {
        handleTypoReporter({
            authorizationToken: 'MjI3OjQ4ODA3MzUwLTExYmYtNGI0ZC1hNTEyLTZkMTc5MWQzNmEzOQ==',
            workSpaceUrl: 'https://hexlet-correction.herokuapp.com', workSpaceId: '227'
          });
      }} />
    </>
  );
};

export default Correction;
