// HTML 변수
const $movie_list = document.querySelector('.movie_list'); // 영화 목록 class
const $movies = document.querySelector('.movies'); // 영화 카드 class
const $movie = document.querySelector('.movie'); // 영화 카드 class

let originData; // API 응답 결과를 받을 변수

// TMDB - Top Rated - API 
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjU1M2E2ODVhZmE1OGNjYzE1ZjE2YmM3YjE0YjQwOCIsInN1YiI6IjY1MmY4MTJjMzU4ZGE3NWI1YzBkODEzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jkev6tU8acRvqkKUV-TjvPsuJWITFiQAALi2dEKB5F0'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko&opage=1', options)
    .then(response => response.json())
    .then(response => {
        originData = response.results;
        console.log(originData);

        // HTML에 영화 카드 추가
        let selectData = () => {
            // foreach로 변경 예정
            for (let i = 0; i < originData.length; i++) {
                // 필요한 값 추출 후 변수에 참조!!
                let title = originData[i].title; // 제목
                let overview = originData[i].overview; // 내용
                let vote_average = originData[i].vote_average; // 별점
                let poster_path = originData[i].poster_path; // 썸네일
                let backdrop_path = originData[i].backdrop_path; // 영화 이미지
                let release_date = originData[i].release_date; // 출시일

                // movie DIV에 추가할 내용 작성
                let movie = `
                    <div class="rank">
                        ${i + 1}
                    </div>
                    <img class="movie__img" src="https://image.tmdb.org/t/p/w500/${poster_path}">
                    <div class="movie__text">
                        <h2 class="title"> ${title} </h2>
                        <div class="overview">${overview}</div>
                        <h3 class="vote_average">${vote_average}</h3>
                    </div>
                `;
                // movies div 1개에 movie div 2개 삽입
                if (i % 2 === 0) {
                    const div_movies = document.createElement('div');// div 추가(createElement)
                    div_movies.setAttribute('class', 'movies');// div_movies에 class 추가(setAttribute())
                    $movie_list.appendChild(div_movies);
                }

                // movies div에 movie div 삽입
                const div_movie = document.createElement('div');// div 추가(createElement)
                div_movie.setAttribute('class', 'movie');// div_movie에 class 추가(setAttribute())
                div_movie.innerHTML = movie;// movie의 내용 변경(innerHTML)

                const moviesContainer = document.querySelector('.movies:last-child'); // 가장 마지막 .movies에 movie 추가
                moviesContainer.appendChild(div_movie); // 선택한 .movies 요소에 movie 추가
            }
        }
        selectData();
    })
    .catch(err => console.error(err));

// movie.addEventListener(, listener)





