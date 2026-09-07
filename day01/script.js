const title = "인터스텔라";
const voteAverage = 8.7;
const voteCount = 32000;
const popularity = 150.5;
const releaseDate = "2014-11-05";
const originalLanguage = "en";

console.log(title);
console.log(voteAverage);
console.log(voteCount);
console.log(popularity);
console.log(releaseDate);
console.log(originalLanguage);
const additionalVoteCount = 100;

console.log(voteCount + additionalVoteCount);

const genre = "SF";
const category = "영화";

console.log(genre + " " + category);
console.log("영화 제목: " + title);
console.log("평점: " + voteAverage);
console.log("개봉일: " + releaseDate);

console.log(`영화 제목: ${title}`);
console.log(`평점: ${voteAverage}`);
console.log(`개봉일: ${releaseDate}`);

console.log(
  `${title}는 ${releaseDate}에 개봉한 영화이며, 현재 평점은 ${voteAverage}점이고 ${voteCount}명이 평가했습니다.`,
);