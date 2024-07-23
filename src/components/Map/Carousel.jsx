import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ images }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
  };

  return (
    <div className="mt-6 carousel-container">
      <Slider {...settings}>
        <div>
          <img
            src={images.image1}
            className="rounded-2xl object-cover mx-auto"
            alt="Slide 1"
          />
        </div>
        <div>
          <img
            src={images.image2}
            className="rounded-2xl object-cover mx-auto"
            alt="Slide 2"
          />
        </div>
        <div>
          <img
            src={images.image3}
            className="rounded-2xl object-cover mx-auto"
            alt="Slide 3"
          />
        </div>
      </Slider>
    </div>
  );
}

Carousel.propTypes = {
  images: PropTypes.shape({
    image1: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    image3: PropTypes.string.isRequired,
  }).isRequired,
};
