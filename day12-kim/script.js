const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

const NOW_PLAYING_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const container = document.querySelector("#movie-list");

function createMovieCard(movie) {
  const { title, vote_average, poster_path } = movie;

  const card = document.createElement("div");

  card.className = "movie-card";

  const poster = document.createElement("img");

  poster.src = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  poster.alt = `${title} 포스터`;

  const titleEl = document.createElement("h3");

  titleEl.textContent = title;

  const rating = document.createElement("p");

  rating.textContent = `평점 ${vote_average}`;

  card.append(poster, titleEl, rating);

  return card;
}

function renderMovies(movies) {
  movies.forEach((movie) => {
    const card = createMovieCard(movie);

    container.append(card);
  });
}

async function getNowPlayingMovies() {
  container.textContent = "영화 목록을 불러오는 중...";
  try {
    const response = await fetch(NOW_PLAYING_URL, options);

    if (!response.ok) {
      container.textContent = "정보를 불러오지 못했습니다.";

      return;
    }

    const data = await response.json();

    container.textContent = "";

    renderMovies(data.results);
  } catch (error) {
    container.textContent = "정보를 불러오지 못했습니다.";

    console.error(error);
  }
}

async function searchMovies(keyword) {
  try {
    const encodedKeyword = encodeURIComponent(keyword);

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodedKeyword}&language=ko-KR&page=1`,
      options,
    );

    if (!response.ok) {
      throw new Error(`요청 실패 (Status: ${response.status})`);
    }

    const data = await response.json();

    if (data.results.length === 0) {
      container.textContent = "검색 결과가 없습니다.";
      return;
    }

    container.textContent = "";

    renderMovies(data.results);
  } catch (error) {
    console.error(error);
    container.textContent = "검색 중 문제가 발생했습니다.";
  }
}

const recentKeyword = document.querySelector("#recent-keyword");
const keywordList = document.querySelector("#keyword-list");

const savedKeywords = localStorage.getItem("keywords");


function renderKeywords() {
  keywordList.textContent = "";

  keywords.forEach((keyword) => {
    const keywordItem = document.createElement("li");

    const keywordText = document.createElement("span");
    keywordText.textContent = keyword;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "기록 삭제";

    deleteButton.addEventListener("click", () => {
      keywords = keywords.filter(
        (itemKeyword) => itemKeyword !== keyword,
      );

      localStorage.setItem(
        "keywords",
        JSON.stringify(keywords),
      );

      renderKeywords();
    });

    keywordItem.append(keywordText, deleteButton);

    keywordList.append(keywordItem);
  });
}

let keywords = savedKeywords ? JSON.parse(savedKeywords) : [];
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const keyword = input.value.trim();
  if (!keyword) return;

  recentKeyword.textContent = `최근 검색어: ${keyword}`;

  // TODO 1

  localStorage.setItem("recentKeyword", keyword);
  keywords = keywords.filter(
    (itemKeyword) => itemKeyword !== keyword,
  );
  keywords.unshift(keyword);

  localStorage.setItem("keywords", JSON.stringify(keywords));
  
  renderKeywords();
  input.value = ""; // 검색창 비우기

  searchMovies(keyword);
});

// TODO 2
const savedKeyword = localStorage.getItem("recentKeyword");

if (savedKeyword) {
  recentKeyword.textContent = `최근 검색어: ${savedKeyword}`;
}

console.log(typeof savedKeyword);

getNowPlayingMovies();
renderKeywords();