import React, { useEffect, useRef, useState } from "react";
import { Container, Paragraph, Transfrom } from "./styled";

interface Props {
  footerMessage: string;
  setFooterMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  isMobile: boolean | null;
}

export const FooterPopUp: React.FC<Props> = ({
  isLoggedIn,
  isMobile,
  footerMessage,
  setFooterMessage,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (footerMessage) {
      messageRef.current?.focus();
      setIsHidden(false);
      setTimeout(() => {
        setIsHidden(true);
      }, 3000);
    }
  }, [footerMessage]);

  return (
    <Container mobileNavigation={isLoggedIn && isMobile}>
      <Transfrom
        role="alert"
        isHidden={isHidden}
        onTransitionEnd={() => {
          if (isHidden) {
            setFooterMessage("");
          }
        }}
      >
        {footerMessage && (
          <Paragraph ref={messageRef}>{footerMessage}</Paragraph>
        )}
      </Transfrom>
    </Container>
  );
};
