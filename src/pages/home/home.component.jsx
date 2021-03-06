import { Fragment } from "react";
import { Helmet } from "react-helmet";
import useWindowWidth from "../../hooks/useWindowWidth";

import banners from "../../data/banners";

import Banner from "../../components/banner/banner.component";

const Home = () => {

  const windowWidth = useWindowWidth()

  return (
    <Fragment>
      <Helmet>
        <title>Nike Online</title>
      </Helmet>
      <main className='grow mx-6 my-6'>
        <Banner windowWidth={windowWidth} {...banners['main']} />
        <Banner windowWidth={windowWidth} {...banners['featured']} />
        <Banner windowWidth={windowWidth} {...banners['trending']} />
      </main>
    </Fragment>
  )
}

export default Home