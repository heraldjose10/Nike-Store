import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { selectEmail, selectUserName } from "../../redux/user/user.selectors"

import options from "../../data/options";
import benefits from "../../data/benefits";

import PrevArrow from "../../components/prev-arrow/prev-arrow.component";
import NextArrow from "../../components/next-arrow/next-arrow.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { clearUser } from "../../redux/user/user.actions";


const Profile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const handleSignOut = () => {
    dispatch(clearUser())
    navigate('/')
  }

  return (
    <div className="my-10 flex flex-col mx-6">
      <div className="flex gap-4 overflow-scroll no-scrollbar md:self-center">
        {
          options.map((option, index) => (
            option === 'Profile'
              ? <span key={index} className="text-[#979797]">{option}</span>
              : <span key={index} className="hover:cursor-pointer">{option}</span>
          ))
        }
      </div>
      <div className="flex my-10 gap-5">
        <img
          className="rounded-full h-[60px] w-[60px] object-cover"
          src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' // todo: use random pfp
          alt="user profile"
        />
        <div className="flex flex-col">
          <span className="text-4xl">{username}</span>
          <span className="text-[#979797] text-sm">{email}</span>
        </div>
      </div>
      <CustomButton
        buttonAction={handleSignOut}
        buttonText='Sign Out'
        padding_y={3}
        customStyles={'self-start mb-20'}
      />
      <div>
        <div className="flex flex-col gap-4 ">
          <h2 className="text-2xl">
            Member Benefits
          </h2>
          <Slider {...settings}>
            {
              benefits.map((benefit, index) => (
                <div key={index} className="shrink-0 max-w-[92%] flex flex-col gap-6">
                  <div className="w-full h-0 relative pt-[62.5%] hover:cursor-pointer">
                    <LazyLoadImage
                      src={benefit.image}
                      alt="benefit banner"
                      effect="opacity"
                      className='w-full absolute top-0 left-0'
                    />
                  </div>
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