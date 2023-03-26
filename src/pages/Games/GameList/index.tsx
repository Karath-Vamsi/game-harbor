import uniqid from 'uniqid';
import { CircularProgress } from 'react-cssfx-loading';
import useGameList from 'pages/Games/GameList/useGameList';
import { platformIcons } from 'pages/Games/GameList/constants';
import {
  GameListWrapper,
  GameWrapper,
  BackgroundImage,
  Info,
  Price,
  AddToCart,
  PlatformIcons,
  GameName,
} from 'pages/Games/GameList/styles';

function GameList() {
  const { games, handleAddToCart, handleNavigation } = useGameList();

  return (
    <GameListWrapper games={games}>
      {/* games[0].id === -1 appears after user changes filter.
          To prevent the spinner from being displayed on the entire
          page when refetching data the games are set to a predefined
          array to show the spinner only on gamesList section */}
      {games[0].id === -1 ? (
        <CircularProgress
          color="rgb(24, 176, 171)"
          height="80px"
          width="80px"
          duration="2s"
        />
      ) : (
        <>
          {games.map((game) => (
            <GameWrapper key={uniqid()}>
              <BackgroundImage
                style={{ backgroundImage: `url(${game.background_image})` }}
              />
              <Info>
                <Price>
                  <AddToCart
                    isInCart={game.isInCart}
                    onClick={() => {
                      handleAddToCart(game.id);
                    }}
                  >
                    Add to cart +
                  </AddToCart>
                  ${game.price}
                </Price>
                <PlatformIcons>
                  {game.parent_platforms.map((platform) => (
                    <span key={uniqid()}>
                      {platformIcons[platform.platform.slug]}
                    </span>
                  ))}
                </PlatformIcons>
                <GameName to="game" onClick={() => handleNavigation(game.id)}>
                  {game.name}
                </GameName>
              </Info>
            </GameWrapper>
          ))}
        </>
      )}
    </GameListWrapper>
  );
}

export default GameList;
