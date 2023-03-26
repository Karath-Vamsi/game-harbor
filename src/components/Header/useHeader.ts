import { useEffect, useState, KeyboardEvent, ChangeEvent, useRef } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAnimation } from 'framer-motion';
import { getGamesList } from 'api/gameData';
import { RootState } from 'redux/types';
import {
  setGames,
  setSearchedGames,
  setIsOpenSearchGames,
  setCurrentFilter,
  setIsSearching,
  setIsOpenCart,
} from 'redux/counterSlice';
import { useClickOutside, useScrollDirection } from 'utils/customHooks';
import { returnGames } from 'utils/helpers';

const useHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state: RootState) => state.harbor);
  const inputControls = useAnimation();
  const scrollDirection = useScrollDirection();
  const location = useLocation();
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isModifyHeader, setIsModifyHeader] = useState(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout>();
  const {
    isChangeSidebar,
    isOpenSearchGames,
    isHideSidebar,
    searchedGames,
    isOpenCart,
    inCartGames,
  } = reduxState;

  const setInputMaxWidth = (width: number) => {
    inputControls.start({ maxWidth: width });
  };

  const openAndHideCart = () => {
    dispatch(setIsOpenCart(!isOpenCart));
  };

  const minimizeInput = () => {
    dispatch(setIsOpenSearchGames(false));
    setIsInputFocused(false);
    setInputMaxWidth(310);
  };

  const handleSearchedGames = () => {
    // When user is on the Games page and searches for the games
    // we need to hide the filter as it's not correct any more
    if (searchedGames.length === 0) return;
    dispatch(setIsOpenSearchGames(false));
    dispatch(setIsSearching(true));
    dispatch(setCurrentFilter(''));
    dispatch(setGames(searchedGames));
    navigate('games');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleSearchedGames();
    }
  };

  const handleOnFocus = () => {
    setIsInputFocused(true);
    setInputMaxWidth(480);
    if (searchedGames.length !== 0) dispatch(setIsOpenSearchGames(true));
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 1)
      setTimeout(() => {
        dispatch(setIsOpenSearchGames(true));
      }, 600);

    const searchParams = createSearchParams({
      search: e.target.value,
    });

    if (typingTimer) clearTimeout(typingTimer);

    const timer = setTimeout(async () => {
      // games are set to an empty array in order to display a spinner when
      // refetching data instead of just unexpected games update
      dispatch(setSearchedGames([]));
      const gameList = await getGamesList({
        search: searchParams.toString(),
        search_precise: true,
      });
      const results = await returnGames({ games: gameList });
      if (results) dispatch(setSearchedGames(results));
    }, 1200);

    setTypingTimer(timer);
  };

  useClickOutside(isInputFocused, inputWrapperRef, minimizeInput);

  useEffect(() => {
    if (location.pathname === '/games') {
      setTimeout(() => {
        setIsModifyHeader(true);
      }, 400);
    } else {
      setIsModifyHeader(false);
    }
  }, [location]);

  return {
    scrollDirection,
    isModifyHeader,
    isChangeSidebar,
    isHideSidebar,
    inputControls,
    isOpenCart,
    inputWrapperRef,
    isOpenSearchGames,
    inCartGames,
    handleOnChange,
    handleKeyDown,
    openAndHideCart,
    handleOnFocus,
    handleSearchedGames,
  };
};

export default useHeader;
