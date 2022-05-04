import { useSelector } from "react-redux"
import Slider from "react-slick"

import { selectEmail, selectUserName } from "../../redux/user/user.selectors"

import options from "../../data/options";
import benefits from "../../data/benefits";

import PrevArrow from "../../components/prev-arrow/prev-arrow.component";
import NextArrow from "../../components/next-arrow/next-arrow.component";


const Profile = () => {

  const username = useSelector(selectUserName)
  const email = useSelector(selectEmail)
  
  const settings = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }

    ]
  };

  return (
    <div className="my-10 flex flex-col mx-6">
      <div className="flex gap-4 overflow-scroll no-scrollbar md:self-center">
        {
          options.map((option, index) => (
            option === 'Profile'
              ? <span key={index} className="text-[#979797]">{option}</span>
              : <span key={index}>{option}</span>
          ))
        }
      </div>
      <div className="flex my-10 gap-5">
        <img
          className="rounded-full h-[60px] w-[60px] object-cover"
          src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'
          alt="user profile"
        />
        <div className="flex flex-col">
          <span className="text-4xl">{username}</span>
          <span className="text-[#979797] text-sm">{email}</span>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 ">
          <h2 className="text-2xl">
            Member Benefits
          </h2>
          <Slider {...settings}>
            {
              benefits.map((benefit, index) => (
                <div key={index} className="shrink-0 max-w-[92%] flex flex-col gap-6">
                  <img
                    src={benefit.image}
                    alt="benefit banner"
                  />
                  <span className="leading-tight md:text-lg">
                    {benefit.title}
                  </span>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Profile