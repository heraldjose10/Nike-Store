import banners from "../../data/banners";

import Banner from "../../components/banner/banner.component";

const Home = () => (
  <main className='grow mx-6 my-6'>
    <Banner {...banners['main']} />
    <Banner {...banners['featured']} />
    <Banner {...banners['trending']} />
  </main>
)

export default Home