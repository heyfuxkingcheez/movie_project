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

            temp.innerHTML = `
            <div class="movie-card" id="card">
            <img
                class="movie-card img"
                src=${moviePoster}
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
            </div>`;
            
            document.querySelector(".movie-grid").append(temp);
        })
    })
    .catch(error => console.log('ERROR'));
}

// 클릭 시 alert창
document.addEventListener('DOMContentLoaded', () => {
    const movieContent = document.querySelector("#card")

    movieContent.addEventListener('click', (event) => {
        console.log("아이야")
        
    })
})

