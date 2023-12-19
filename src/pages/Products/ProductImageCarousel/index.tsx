import { useState } from 'react';
import "./styles.css"
import { TrashIcon } from '../../../shared/components/Icons';
import { Modal } from '../../../shared/components/Modal';
import styled from 'styled-components';


const Slide = styled.div`
position: relative;
    .overlay {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .btn-rounded {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    } 
    
    .delete-btn {
        background-color: red;
        color: white;
        border: 1px solid #fff;
    }
`;

type CarouselProps = {
    images: string[];
    onRemoveImage: (image: string) => void;
}

export const ProductImageCarousel: React.FC<CarouselProps> = ({ images, onRemoveImage }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    const handleRemoveCurrentImage = () => {
        setCurrentIndex(0);
        onRemoveImage(images[currentIndex]);
        setShowRemoveImageModal(false);

    }

    return (
        <>
            <Modal isOpen={showRemoveImageModal} onClose={() => setShowRemoveImageModal(false)}>
                <h2 className="title">Remove Image</h2>
                <p>Are you sure you want to remove this image?</p>
                <p><i>You must to save the product after this action to apply the changes</i></p>
                <div className="btn-group">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowRemoveImageModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={handleRemoveCurrentImage}
                    >
                        Remove
                    </button>
                </div>
            </Modal>
            <div className="slideshow-container">

                {images.map((image, index) => (
                    <Slide key={crypto.randomUUID()} className={`mySlides fade ${index === currentIndex ? 'active' : ''}`}>
                        <div className="numbertext">{`${currentIndex + 1} / ${images.length}`}</div>
                        <img src={image} />
                        <div className="overlay">
                            <button
                                className="btn-rounded delete-btn"
                                onClick={() => setShowRemoveImageModal(true)}
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    </Slide>
                ))}

                <a className="prev" onClick={handlePrev}>&#10094;</a>
                <a className="next" onClick={handleNext}>&#10095;</a>
            </div>
        </>
    );
}
