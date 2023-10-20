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
                let m_id = originData[i].id; // id
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
                        <button></button>
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
                div_movie.setAttribute('id', m_id);// div_movie에 id 추가(setAttribute())
                div_movie.innerHTML = movie;// movie의 내용 변경(innerHTML)

                const moviesContainer = document.querySelector('.movies:last-child'); // 가장 마지막 .movies에 movie 추가
                moviesContainer.appendChild(div_movie); // 선택한 .movies 요소에 movie 추가
            }

            // selectMovie 함수 : 영화 선택 시 ID 띄우기
            const moviesElements = document.querySelectorAll(".movie"); // 모든 movie class 선택
            moviesElements.forEach(function (movieElement) {
                movieElement.addEventListener('click', function () {
                    // click 이벤트가 발생했을 때 함수를 실행(@.addEventListener('click', function(){}))
                    const select_m_id = movieElement.getAttribute('id'); // select_m_id에 선택한 movie의 id값 할당
                    alert(`영화의 id는 ${select_m_id} 입니다.`);
                });
            });

            // searchMovie 함수 : 영화 제목 검색
            const $search_btn = document.querySelector('#search_btn'); // 검색 버튼 id
            const $search_text = document.querySelector('#search_text'); // 영화 카드 class
            const $allMovies = document.querySelectorAll('.movies');
            $search_btn.addEventListener('click', function () {
                const searchKeyword = $search_text.value; // search_text의 입력값 받아오기
                const searchMovie = originData.filter(function (item) {
                    return item.title.includes(searchKeyword); // 
                });

                // 유효성 검사
                if (searchMovie.length <= 0) {
                    // 검색 결과가 존재하지 않을 경우
                    alert("검색 결과가 없습니다.");
                } else {
                    $allMovies.forEach(function ($allMovies) {
                        $movie_list.removeChild($allMovies);
                    });
                    console.log(searchMovie);
                }

                // 검색 결과가 없을 경우

            });
        }
        selectData();

    })
    // ----- Fetch -----
    .catch(err => console.error(err));


