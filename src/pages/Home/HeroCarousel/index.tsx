import { useState } from "react";
import styled from "styled-components"

const SlideShowContainer = styled.section`
  *, & {
	box-sizing: border-box;
  }
  width: 100%;
  height: 80vh;
  position: relative;

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
  background-color: rgba(0,0,0,0.08);
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

.active {
    display:block;
}

`;

const SlideShowDots = styled.div`
    text-align: center;
    /* The dots/bullets/indicators */
    .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
	}

	.dot:hover {
		background-color: #717171;
	}
`;

type Props = {
  children: React.ReactNode[]
}

export const HeroCarousel: React.FC<Props> = ({ children }) => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide < children.length - 1 ? prevSlide + 1 : 0));
  }

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : children.length - 1));
  }

  return (
    <>

      <SlideShowContainer>
        {children.map((child, index) => {
          return (
            <div className={`mySlides fade ${index === currentSlide ? 'active' : ''}`}>
              {child}
            </div>
          )
        })}
        <a className="prev" onClick={handlePrev}>&#10094;</a>
        <a className="next" onClick={handleNext}>&#10095;</a>
      </SlideShowContainer>
      <br />
      <SlideShowDots>
        {[...Array(children.length).keys()].map((index) => {
          return (
            <span className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
          )
        })}
      </SlideShowDots>
    </>
  )
}