import React, { memo, useRef } from "react";
import useMactchMedia from "../../../hooks/use-match-media";
import MovieReviews from "../../containers/movie_ reviews";
import NoPoster from "../img_no_poster";
import contryes from "../../../assets/data/flags_data";
import { Woman, Man } from "../img_womeen_men";
// import man from "../../../assets/caps/man.jpg";
import ListRecommendations from "../list_card";
import Slider from "../slider";
import MyYouTube from "../youtube";
import * as S from "./styles";
import Container from "../../ui/container";
import Heart from "../heart";
import Tooltip from "../tooltip";
import * as T from "../../../types";
import type { RootState } from "../../../store";
import Button from "../../ui/button";
import Wrapper from "../../ui/wrapper";

interface Props {
  movie: T.OneMoviePage,
  recommendationsMovieIds: number[],
  onAdd: () => void,
  onDelete: () => void,
  markOpen: boolean,
  auth: null | object,
  select: (state: RootState, id: number) => T.OneMovieMain | undefined
}

const Card: React.FC<Props> = ({ movie, recommendationsMovieIds, select, onAdd, onDelete, markOpen, auth }: Props) => {
  const MINUTES_IN_HOUR = 60;

  const { isMobile } = useMactchMedia() as { isMobile: boolean };
  const itemsCastCrew = [ ...movie.credits.cast, ...movie.credits.crew ];
  const scrollToRef = useRef<HTMLDivElement>(null);

  return(
    <S.PageMovieSection>
      {auth === null &&  <Tooltip markOpen={markOpen}/>}
      <Container>
        <Wrapper>
          <Button type="button" onClick={() => scrollToRef.current?.scrollIntoView({behavior: "smooth"})}>Reviews</Button>
          <Heart isFav={movie.isFav} onAdd={() => onAdd()} onDelete={() => onDelete()}></Heart>
        </Wrapper>
      </Container>

      <S.ContainerPageMovie>
        {isMobile
          ? movie.backdrop_path !== null // if have backdrop_path => with backdrop_path
            ? (<S.ImgMovie src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`} alt="Poster" width={320} height={170} />)
            : <NoPoster width={320} height={170} />
          : movie.poster_path !== null
            ? (<S.ImgMovie src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="Poster" width={500} height={600} />)
            : <NoPoster width={500} height={600} />
        }
        <S.WrapperMovie>
          <h2>{movie.title}</h2>

          <S.WrapperYear>
            <S.Year>{movie.release_date && movie.release_date.split("-")[0]}</S.Year>
            <span>{movie.runtime !== 0 && `${Math.floor(movie.runtime / MINUTES_IN_HOUR)}h ${movie.runtime % MINUTES_IN_HOUR}m`}</span>
          </S.WrapperYear>

          <S.ListGenres>
            {movie.genres.length
              ? movie.genres.map((genre, i) => (
                <S.ItemGenre key={i}>
                  {genre.name}
                </S.ItemGenre>
              ))
              : null
            }
          </S.ListGenres>

          <S.List>{movie.production_countries
            && movie.production_countries.map((contry, i) => (
              <li key={i} title={contry.name}>
                <S.ImgFlag src={contryes[contry.iso_3166_1]} alt="country made is flag" width={30} height={30} />
              </li>
            ))}
          </S.List>

          <S.List>{movie.production_companies
            && movie.production_companies.map((company, i) => (
              <li key={i} title={company.name}>
                {company.logo_path
                  ? (<S.ImgContProd src={`https://image.tmdb.org/t/p/w300/${company.logo_path}`} alt="Logo production company" width={50} height={30} />)
                  : (<S.NoComProd>{company.name}</S.NoComProd>)
                }
              </li>
            ))}
          </S.List>

          <p>{movie.overview}</p>
        </S.WrapperMovie>
      </S.ContainerPageMovie>

      {movie.videos.results.length
        ? (<MyYouTube videoId={movie.videos.results.find(video => video.type === "Trailer")?.key} />)
        : null
      }

      <Container ref={scrollToRef}>
        <MovieReviews />
      </Container>

      {itemsCastCrew.length
        ? <S.ContainerCast>
          <h3>Cast & Crew</h3>
          <Slider items={itemsCastCrew} template={item =>
            <S.TemplateCast>
              {item.profile_path
                ? (<S.ImgCast src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`} alt="Foto" width={100} height={150} />)
                : (item.gender === 1 ? <Woman /> : <Man />)
              }
              <h4>{item.original_name}</h4>
              <p>{item.character ? item.character : item.job}</p>
            </S.TemplateCast>}
          />
        </S.ContainerCast>
        : null
      }

      {recommendationsMovieIds.length
        ? <div>
          <Container>
            <h3>Recommendations</h3>
          </Container>
          <ListRecommendations moviesIds={recommendationsMovieIds} select={select}/>
        </div>
        : null
      }

    </S.PageMovieSection>
  );
};

export default memo(Card);
