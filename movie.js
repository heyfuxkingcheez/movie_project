// HTTP 요청에 대한 옵션을 정의합니다.
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzc4YmI0ZTA3ZGM2ZmM5NTIwYjg2OGU2OTQ0MjA5MSIsInN1YiI6IjY1MmY3MTEwYzk5NWVlMDEwMGRlOWEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6feX7u20gdSOrsez2RlWSmZyIfdyK-tkrj6YwN2JHIk',
    },
};
// 영화 데이터를 저장할 변수를 선언합니다.
let searchArr;
let movieMap = new Map();

// 반복문을 사용하여 영화 데이터를 가져옵니다.
for (let i = 0; i < 5; i++) {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${i}`, options)
        .then((response) => response.json())
        .then((response) => {
            // API 응답에서 영화 결과를 추출합니다
            let movieResult = response.results;
            let movieArr = [...movieResult];
            searchArr = response['results'];
            // console.log("api불러오기 성공!", searchArr);

            // 각 영화에 대한 HTML 요소를 생성합니다.
            movieArr.forEach((movie, i) => {
                // 각 영화를 위한 div 요소를 생성합니다.
                let temp = document.createElement('div');
                temp.setAttribute('class', 'poster');

                // API 응답에서 영화 정보를 추출합니다.
                let movieTitle = movieArr[i].title;
                let movieOverview = movieArr[i].overview;
                let moviePoster = `https://image.tmdb.org/t/p/w500${movieArr[i].poster_path}`;
                let movieId = movieArr[i].id;
                let movieRating = movieArr[i].vote_average;
                let movieDate = movieArr[i].release_date;
                let moviePoster1 = movieArr[i].poster_path;
                let strposter_path = moviePoster1.substr(2, 10);
                let strposter_path1 = strposter_path
                    .replace('1', '')
                    .replace('2', '')
                    .replace('3', '')
                    .replace('4', '')
                    .replace('5', '')
                    .replace('6', '')
                    .replace('7', '')
                    .replace('8', '')
                    .replace('9', '')
                    .replace('0', '');
                // console.log("코드보면 웃음 밖에 안나옴 =>", strposter_path1)

                // 제목 길이 ...로 줄이기
                let limitLength = 25;
                if (movieTitle.length > limitLength) {
                    movieTitle = movieTitle.substr(0, limitLength - 2) + '...';
                }

                // 검색 입력 요소에 포커스를 맞춥니다.
                document.querySelector('.searchInput').focus();

                // 영화 검색을 수행하는 함수
                const searchBtn = document.querySelector('.searchBtn');
                const searchInput = document.querySelector('.searchInput');

                function search() {
                    const searchText = searchInput.value;
                    searchArr.forEach((a) => {
                        let movieTitle = movieArr[i].title;
                        let check = movieTitle.includes(searchText);
                        movieMap.set(movieTitle, temp);
                        if (check) {
                            movieMap.get(movieTitle).style.display = 'block';
                        } else {
                            movieMap.get(movieTitle).style.display = 'none';
                        }
                    });
                }
                // 검색 버튼에 클릭 이벤트 리스너를 추가합니다.
                searchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    search();
                });
                // 검색 엔터
                // searchInput.addEventListener("keyup", (e) => {
                //     e.preventDefault();
                //     if (e.keyCode === 13 || e.which === 13) {
                //         search();
                //     }
                // })

                // 각 영화에 대한 HTML 내용을 생성합니다.
                temp.innerHTML = `
            <div id="wook" class="movie-card" data-bs-toggle="modal" data-bs-target="#${strposter_path1}">
            <img src=${moviePoster}
                alt="poster image"
            />
            <div class="posterContentsBox">
                <span class="posterId">${movieId}</span>
                <h2 class="title">${movieTitle}</h2>
                <div class="release">${movieDate} 개봉</div>
                <div class="ratingBox">
                <span class="rating">⭐${movieRating}</span>
            
                </div>
                <p class="overview">${movieOverview.length > 0 ? movieOverview : '줄거리가 없습니다.'}</p>
            </div>
            </div>
            <div class="modal fade wook" id="${strposter_path1}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">ID : ${movieId}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary">예고편</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                </div>
            </div>
        </div>
    </div>`;
                // 영화 요소를 영화 그리드에 추가합니다.
                document.querySelector('.movie-grid').appendChild(temp);
            });
        })
        .catch((error) => console.log('ERROR'));
}
