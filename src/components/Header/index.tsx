import {
  Header as HeaderStyled, Title, ButtonsGroup, Button,
} from './styles';

interface HeaderButtons {
  onClick: () => void;
  text: string;
}

interface HeaderProps {
  title: string;
  buttons: HeaderButtons[];
}

export const Header = ({
  title,
  buttons = [],
}: HeaderProps): JSX.Element => (
  <HeaderStyled>
    <Title>{title}</Title>
    <ButtonsGroup>
      {buttons.map(({ onClick, text }, index) => (
        <Button key={`${index}-header-button-${text}`} onClick={onClick}>
          {text}
        </Button>
      ))}
    </ButtonsGroup>
  </HeaderStyled>
);
