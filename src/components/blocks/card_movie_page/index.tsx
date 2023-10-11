import React, { memo } from "react";
import { OneMoviePage } from "../../../slices_redux/types";
import useMactchMedia from "../../../hooks/use-match-media";
import noPoster from "../../../assets/no_poster.png";
import contryes from "../../../assets/data/flags_data";
import woman from "../../../assets/woman.jpg";
import man from "../../../assets/man.jpg";
import ListRecommendations from "../list_card";
import Slider from "../slider";
import MyYouTube from "../youtube";
import * as S from "./styles";
import Container from "../../ui/container";
import Heart from "../heart";
import Tooltip from "../tooltip";

interface Props {
  movie: OneMoviePage,
  recommendationsMovieIds: number[],
  onAdd: () => void,
  onDelete: () => void,
  markOpen: boolean,
  auth: null | object,
  // @todo сделать
  select: any
}

const Card: React.FC<Props> = ({ movie, recommendationsMovieIds, select, onAdd, onDelete, markOpen, auth }: Props) => {
  const { isMobile } = useMactchMedia() as { isMobile: boolean };
  const itemsCastCrew = [...movie.credits.cast, ...movie.credits.crew];

  return(
    <S.PageMovieSection>
      {auth === null &&  <Tooltip markOpen={markOpen}/>}
      <S.WrapHeart><Heart isFav={movie.isFav} onAdd={() => onAdd()} onDelete={() => onDelete()}></Heart></S.WrapHeart>

      <S.ContainerPageMovie>
        {isMobile
          ? (<S.ImgMovie src={movie.backdrop_path !== null ? `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}` : noPoster} alt="Poster" width={320} height={170} />)
          : (<S.ImgMovie src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : noPoster} alt="Poster" width={500} height={600} />)}
        <S.WrapperMovie>
          <h2>{movie.title}</h2>

          <S.WrapperYear>
            <S.Year>{movie.release_date && movie.release_date.split("-")[0]}</S.Year>
            <span>{movie.runtime !== 0 && `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</span>
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

          <S.List>{movie.production_countries &&
            movie.production_countries.map((contry, i) => (
              <li key={i} title={contry.name}>
                <S.ImgFlag src={contryes[contry.iso_3166_1]} alt="country made is flag" width={30} height={30} />
              </li>
            ))}
          </S.List>

          <S.List>{movie.production_companies &&
            movie.production_companies.map((company, i) => (
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

      {itemsCastCrew.length
        ? <S.ContainerCast>
            <h3>Cast & Crew</h3>
            <Slider items={itemsCastCrew} template={item =>
              <S.TemplateCast>
                {item.profile_path
                  ? (<S.ImgCast src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`} alt="Foto" width={100} height={150} />)
                  : (<S.ImgCast src={item.gender === 1 ? woman : man }></S.ImgCast>)
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
