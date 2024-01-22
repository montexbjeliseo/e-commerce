import { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowUpIcon } from "../../Icons";

const TopButtonStyled = styled.button`
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px;
    &.visible {
        display: block;
    }
`;

export const TopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <TopButtonStyled className={`btn scroll-btn ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <ArrowUpIcon />
    </TopButtonStyled>
  );
}