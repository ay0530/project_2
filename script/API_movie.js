// HTML 변수
const $movie_list = document.querySelector('.movie_list'); // 영화 목록 class
const $movies = document.querySelector('.movies'); // 영화 카드 class
const $movie = document.querySelector('.movie'); // 영화 카드 class

const $search_btn = document.querySelector('#search_btn'); // 검색 버튼 id
const $search_text = document.querySelector('#search_text'); // 검색란 id

let originData; // API 응답 결과를 받을 변수

$search_text.focus(); // 검색란에 focus

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

        // 영화 카드 추가 함수
        let drawMovie = (m_id, title, overview, vote_average, poster_path, index) => {
            // function drawMovie(m_id, title, overview, vote_average, poster_path, index) {
            // movie DIV에 추가할 내용 작성
            let movie = `
                    <img class="movie__img" src="https://image.tmdb.org/t/p/w500/${poster_path}">
                    <div class="movie__text">
                        <h2 class="title"> ${title} </h2>
                        <div class="overview">${overview}</div>
                        <h3 class="vote_average">⭐${vote_average}</h3>
                    </div>
                `;
            // movies div 1개에 movie div 2개 삽입
            if (index % 2 === 0) {
                const div_movies = document.createElement('div');// div 추가(createElement)
                div_movies.setAttribute('class', 'movies');// div_movies에 class 추가(setAttribute())
                $movie_list.appendChild(div_movies);
            }

            // movies div에 movie div 삽입
            const div_movie = document.createElement('div');// div 추가(createElement)
            div_movie.setAttribute('class', 'movie');// div_movie에 class 추가(setAttribute())
            div_movie.setAttribute('id', m_id);// div_movie에 id 추가(setAttribute())
            div_movie.innerHTML = movie;// movie의 내용 변경(innerHTML)

            const moviesContainer = document.querySelector('.movies:last-child'); // 가장 마지막 .movies에 movie 추가
            moviesContainer.appendChild(div_movie); // 선택한 .movies 요소에 movie 추가
        };

        // HTML에 영화 카드 추가
        let count = 0;
        originData.forEach(function (item, index) {
            // 필요한 값 추출 후 변수에 참조!!
            let m_id = item.id; // id
            let title = item.title; // 제목
            let overview = item.overview; // 내용
            let vote_average = item.vote_average; // 별점
            let poster_path = item.poster_path; // 썸네일

            drawMovie(m_id, title, overview, vote_average, poster_path, index); // 영화 카드 추가 함수
            count++;
        });

        // selectMovie 함수 : 영화 선택 시 ID 띄우기
        const moviesElements = document.querySelectorAll(".movie"); // 모든 movie class 선택
        moviesElements.forEach(function (movieElement) {
            movieElement.addEventListener('click', function () {
                // click 이벤트가 발생했을 때 함수를 실행(@.addEventListener('click', function(){}))
                const select_m_id = movieElement.getAttribute('id'); // select_m_id에 선택한 movie의 id값 할당
                const $select_title = movieElement.querySelector('.title'); // title 클래스를 가진 태그 선택
                const select_title = $select_title.textContent; // 태그의 텍스트를 받아옴(tag.textContent)
                alert(`${select_title}의 id는 ${select_m_id} 입니다.`);
            });
        });

        // 검색 버튼을 눌렀을 때
        $search_btn.addEventListener('click', function () {
            // click 이벤트가 발생했을 때 함수를 실행(@.addEventListener('click', function(){}))
            search_Movie(); // 영화 검색 함수
        })

        // 검색란에서 엔터를 눌렀을 때
        $search_text.addEventListener('keyup', function (evnet) {
            // 키 입력 이벤트가 발생했을 때 함수를 실행(@.addEventListener('keyup', function(){}))
            if (event.key === 'Enter') {
                search_Movie(); // 영화 검색 함수
            }
        })

        // 영화 검색 함수
        let search_Movie = () => {
            const searchKeyword = $search_text.value; // search_text의 입력값 받아오기
            const searchMovie = originData.filter(function (item) {
                return item.title.includes(searchKeyword); // 
            });
            // 유효성 검사
            if (searchKeyword === "") {
                // 검색어를 입력하지 않았을 경우
                alert("검색어를 입력해주세요!!");
            }
            else if (searchMovie.length <= 0) {
                // 검색 결과가 존재하지 않을 경우
                alert("검색 결과가 없습니다.");
            } else {
                // 검색 결과가 존재할 경우
                const $allMovies = document.querySelectorAll('.movies');
                $allMovies.forEach(function ($allMovies) {
                    $movie_list.removeChild($allMovies);
                });

                // 영화 카드 추가
                searchMovie.forEach(function (item, index) {
                    // 필요한 값 추출 후 변수에 참조!!
                    let m_id = item.id; // id
                    let title = item.title; // 제목
                    let overview = item.overview; // 내용
                    let vote_average = item.vote_average; // 별점
                    let poster_path = item.poster_path; // 썸네일

                    drawMovie(m_id, title, overview, vote_average, poster_path, index); // 영화 카드 추가 함수
                    count++;
                });
            }
        }
    })
    .catch(err => console.error(err));

