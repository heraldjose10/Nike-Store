import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritesStart } from "../../redux/favorites/favorites.actions";
import { selectFavoriteItems } from "../../redux/favorites/favorites.selectors";

import {
  selectAccessToken,
  selectRefreshToken
} from "../../redux/user/user.selectors";

const Favorites = () => {

  const dispatch = useDispatch()

  const accessToken = useSelector(selectAccessToken)
  const refreshToken = useSelector(selectRefreshToken)
  const favorites = useSelector(selectFavoriteItems)
  console.log(favorites);

  useEffect(() => {
    dispatch(setFavoritesStart(
      accessToken,
      '/api/favorites',
      refreshToken
    ))
  }, [])

  return (
    <Fragment>
      <div>Fav</div>
      <div>
        {
          favorites.map(item=>(
            <li>{item.name}</li>
          ))
        }
      </div>
    </Fragment>
  )
}

export default Favorites;