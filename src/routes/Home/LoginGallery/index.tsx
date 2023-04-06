import React, { useEffect, useState } from "react";
import { Background, Container, Image } from "./styled";
import screenshot1 from "../../../assets/images/homepage/screenshots/screenshot1.png";
import screenshot2 from "../../../assets/images/homepage/screenshots/screenshot2.png";
import screenshot3 from "../../../assets/images/homepage/screenshots/screenshot3.png";
import screenshot4 from "../../../assets/images/homepage/screenshots/screenshot4.png";

interface Props {}

export const LoginGallery: React.FC<Props> = () => {
  const [current, setCurrent] = useState(1);
  const [previous, setPrevious] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevState) => (prevState === 4 ? 1 : prevState + 1));
      setPrevious((prevState) => (prevState === 4 ? 1 : prevState + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Background>
      <Container>
        <Image
          alt=""
          src={screenshot1}
          previous={previous === 1}
          current={current === 1}
        />
        <Image
          alt=""
          src={screenshot2}
          previous={previous === 2}
          current={current === 2}
        />
        <Image
          alt=""
          src={screenshot3}
          previous={previous === 3}
          current={current === 3}
        />
        <Image
          alt=""
          src={screenshot4}
          previous={previous === 4}
          current={current === 4}
        />
      </Container>
    </Background>
  );
};
