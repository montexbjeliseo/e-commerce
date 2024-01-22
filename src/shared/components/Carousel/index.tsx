import { useState } from 'react';
import "./styles.css"
import { v4 as uuidv4 } from 'uuid';

type CarouselProps = {
    images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <>
            <div className="slideshow-container">

                {images.map((image, index) => (
                    <div key={uuidv4()} className={`mySlides fade ${index === currentIndex ? 'active' : ''}`}>
                        <div className="numbertext">{`${currentIndex + 1} / ${images.length}`}</div>
                        <img src={image} alt="" />
                    </div>
                ))}

                <a className="prev" onClick={handlePrev}>&#10094;</a>
                <a className="next" onClick={handleNext}>&#10095;</a>
            </div>
        </>
    );
}
