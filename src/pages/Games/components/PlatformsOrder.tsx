import { useState, MouseEvent } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import { xbox, apple, playStation, nintendo } from '../../../utils/options';
import { ReactComponent as ChevronRight } from '../../../assets/chevron-right.svg';

interface Props {
  setTitle: (a: string) => void;
  isChangeNavbar: boolean;
  openAndHidePlatformOrder: () => void;
}

interface OptionsHolderProps {
  isChangeNavbar?: boolean;
}

function PlatformsOrder({
  setTitle,
  isChangeNavbar,
  openAndHidePlatformOrder,
}: Props) {
  const [isPlayStationHovered, setIsPlayStationHovered] = useState(false);
  const [isXboxHovered, setIsXboxHovered] = useState(false);
  const [isAppleHovered, setIsAppleHovered] = useState(false);
  const [isNintendoHovered, setIsNintendoHovered] = useState(false);

  const changeTitle = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const { textContent } = target;

    if (textContent !== null) setTitle(textContent);
  };

  const handleOptionClick = (e: MouseEvent<HTMLElement>) => {
    changeTitle(e);
    openAndHidePlatformOrder();
  };

  const handleMouseOver = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const textContent = target.textContent?.replace(/\s/g, '');

    if (textContent === 'PlayStation') {
      setIsPlayStationHovered(true);
    } else if (textContent === 'Xbox') {
      setIsXboxHovered(true);
    } else if (textContent === 'Macintosh') {
      setIsAppleHovered(true);
    } else if (textContent === 'Nintendo') {
      setIsNintendoHovered(true);
    }
  };

  return (
    <>
      <p>Platforms</p>
      <Option onClick={handleOptionClick}>PC</Option>

      <MoreOptions
        onMouseEnter={handleMouseOver}
        onMouseLeave={() => setIsPlayStationHovered(false)}
      >
        PlayStation <ChevronRight />
        {isPlayStationHovered && (
          <OptionsHolder isChangeNavbar={isChangeNavbar}>
            {playStation.map((option) => (
              <AdditionalOption onClick={handleOptionClick} key={uniqid()}>
                {option}
              </AdditionalOption>
            ))}
            <hr />
            <span>Select all</span>
          </OptionsHolder>
        )}
      </MoreOptions>

      <MoreOptions
        onMouseEnter={handleMouseOver}
        onMouseLeave={() => setIsXboxHovered(false)}
      >
        Xbox <ChevronRight />
        {isXboxHovered && (
          <OptionsHolder isChangeNavbar={isChangeNavbar}>
            {xbox.map((option) => (
              <AdditionalOption onClick={handleOptionClick} key={uniqid()}>
                {option}
              </AdditionalOption>
            ))}
            <hr />
            <span>Select all</span>
          </OptionsHolder>
        )}
      </MoreOptions>

      <Option onClick={handleOptionClick}>iOS</Option>
      <Option onClick={handleOptionClick}>Android</Option>

      <MoreOptions
        onMouseEnter={handleMouseOver}
        onMouseLeave={() => setIsAppleHovered(false)}
      >
        Macintosh <ChevronRight />
        {isAppleHovered && (
          <OptionsHolder isChangeNavbar={isChangeNavbar}>
            {apple.map((option) => (
              <AdditionalOption onClick={handleOptionClick} key={uniqid()}>
                {option}
              </AdditionalOption>
            ))}
            <hr />
            <span>Select all</span>
          </OptionsHolder>
        )}
      </MoreOptions>

      <Option onClick={handleOptionClick}>Linux</Option>

      <MoreOptions
        onMouseEnter={handleMouseOver}
        onMouseLeave={() => setIsNintendoHovered(false)}
      >
        Nintendo <ChevronRight />
        {isNintendoHovered && (
          <OptionsHolder isChangeNavbar={isChangeNavbar}>
            {nintendo.map((option) => (
              <AdditionalOption onClick={handleOptionClick} key={uniqid()}>
                {option}
              </AdditionalOption>
            ))}
            <hr />
            <span>Select all</span>
          </OptionsHolder>
        )}
      </MoreOptions>

      <Option onClick={handleOptionClick}>Web</Option>
    </>
  );
}

const Option = styled.div``;

const MoreOptions = styled.div`
  position: relative;
`;

const OptionsHolder = styled.div<OptionsHolderProps>`
  position: absolute;
  z-index: 1;
  top: -15px;
  left: ${(props) => (props.isChangeNavbar ? '' : '100px')};
  right: ${(props) => (props.isChangeNavbar ? '130px' : '')};
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  width: max-content;
  background-color: white;
  color: black;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgb(111, 110, 110), 0px 0px 5px rgb(111, 110, 110);

  hr {
    margin: 0;
    width: 100%;
  }

  span {
    text-align: center;
    padding: 3px 8px;
    color: rgb(23, 179, 12);
  }
`;

const AdditionalOption = styled.div`
  display: flex;
  font-size: 15px;
  padding: 3px 8px;
  border-radius: 7px;
  transition: 0.2s;

  &:hover {
    background-color: rgb(229, 229, 229);
  }
`;

export default PlatformsOrder;
