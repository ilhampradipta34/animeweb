import Head from "next/head";
import { ReactNode } from "react";

interface PropTypes {
  title?: ReactNode;
}

const PageHead = (props: PropTypes) => {
  const { title = "Yondaime" } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/images/llogo.png" type="image/x-icon" />
    </Head>
  );
};

export default PageHead;
