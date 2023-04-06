import React, { SyntheticEvent, useState } from "react";
import { Recipient } from "../styled";
import { ReactComponent as CloseSmallSvg } from "../../../assets/svgs/closeSmall.svg";
import { RecipientType, ToggleRecipientProps } from "..";

interface Props {
  recipient: RecipientType;
  toggleRecipient: ({
    username,
    userId,
    chatId,
    title,
  }: ToggleRecipientProps) => void;
}

export const RecipientCard: React.FC<Props> = ({
  recipient,
  toggleRecipient,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Recipient
      key={recipient.username}
      isClicked={isClicked}
      onClick={() => setIsClicked((prevState) => (prevState ? false : true))}
    >
      <span>{recipient.username ? recipient.username : recipient.title}</span>
      {isClicked && (
        <button
          onClick={() =>
            toggleRecipient({
              username: recipient.username,
              userId: recipient.userId,
              chatId: "",
              title: "",
            })
          }
        >
          <CloseSmallSvg height={12} width={12} stroke="white" />
        </button>
      )}
    </Recipient>
  );
};
