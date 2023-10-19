
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzc4YmI0ZTA3ZGM2ZmM5NTIwYjg2OGU2OTQ0MjA5MSIsInN1YiI6IjY1MmY3MTEwYzk5NWVlMDEwMGRlOWEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6feX7u20gdSOrsez2RlWSmZyIfdyK-tkrj6YwN2JHIk'
    }
};
for (let i = 0; i < 5; i++) {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-kr&page=${i}`,
        options)
        .then(response => response.json())
        .then(response => {
            let movieResult = response.results;
            let movieArr = [...movieResult];
            console.log("api불러오기 성공!", movieArr);

            movieArr.forEach((movie, i) => {
                let temp = document.createElement("div");
                temp.setAttribute("class", "poster");
                let movieTitle = movieArr[i].title;
                let movieOverview = movieArr[i].overview;
                let moviePoster = `https://image.tmdb.org/t/p/w500${movieArr[i].poster_path}`;
                let movieId = movieArr[i].id;
                let movieRating = movieArr[i].vote_average;
                let movieDate = movieArr[i].release_date;
                let moviePoster1 = movieArr[i].poster_path
                let strposter_path = moviePoster1.substr(6, 10);
                let strposter_path1 = strposter_path.replace('0', '').replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', '');

                console.log("코드보면 웃음 밖에 안나옴ㅋ =>", strposter_path1)



                temp.innerHTML = `
            <div class="movie-card" data-bs-toggle="modal" data-bs-target="#${strposter_path1}">
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
                <p class="overview">${movieOverview.length > 0 ? movieOverview : "줄거리가 없습니다."}</p>
            </div>
            </div>
            <div class="modal fade wook" id="${strposter_path1}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
                document.querySelector(".movie-grid").append(temp);

                //클릭 이벤트
                const clickcard = document.querySelector('temp')

                temp.addEventListener("click", (e) => {
                    console.log(`해당 영화의 id => ${movieId}`);
                });
            })
        })
        .catch(error => console.log('ERROR'));
}







