import { Fragment, lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Banner from './components/banner/Banner';
import Main from './components/layout/Main';
import 'swiper/css';

const MovieDetailsPage = lazy(() =>
  import('./components/page/MovieDetailsPage'),
);
const HomePage = lazy(() => import('./components/page/HomePage'));
const MoviePage = lazy(() => import('./components/page/MoviePage'));

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Main></Main>}>
              <Route
                path="/"
                element={
                  <>
                    <Banner></Banner>
                    <HomePage></HomePage>
                  </>
                }
              ></Route>
              <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
              <Route
                path="/movies/:movieID"
                element={<MovieDetailsPage></MovieDetailsPage>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
