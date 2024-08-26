const movies = require('../src/data');

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map((movie)=>movie.director)
  // const uniqueDirector = new  Set(directors);
  // return uniqueDirector;
  return directors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const drama = moviesArray.filter((movie)=>{
    return (movie.director === "Steven Spielberg" && movie.genre.includes("Drama"));
});
return drama.length ;
}
// console.log(howManyMovies(movies))

// Iteration 3: All scores average - Get the average of all scores with 2 decimals

function scoresAverage(moviesArray) {
  if(moviesArray.length === 0) return 0;      
  const total = moviesArray.map(movie=>movie.score || 0 ).reduce((total,sum)=>total+sum,0)  
  return  Math.round((total/moviesArray.length)*100)/100;   
}

// console.log(scoresAverage(movies)); 
// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  
  const dramaMovies = moviesArray.filter(movie=>movie.genre.includes("Drama"));
  if(dramaMovies.length === 0)return 0;
  const total = dramaMovies.reduce((total,movie)=>total+movie.score,0);
  return Math.round((total/dramaMovies.length)*100)/100;
  
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

  const new_arr = [...moviesArray];
  new_arr.sort((a,b)=>{
      
      if(a.year === b.year){
         if(a.title < b.title){
          return -1;
         }
          if(a.title > b.title){
          return 1;
         }
         
        }
      return a.year - b.year
    });


  return new_arr;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
const new_arr=[...moviesArray]
  new_arr   .sort((a,b)=>{
    if(a.title < b.title){
      return -1
    }
    if(a.title > b.title){
      return 1
    }
    return 0;
  })

  const res =[];

  if(new_arr.length < 20){
      for(let i = 0;i<new_arr.length;i++){
          res.push(new_arr[i])
      }
  }

  if(new_arr.length >= 20){
          for(let i =0;i<20;i++){
                  res.push(new_arr[i])
              }
      }


return res.map(movie=>movie.title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  
   
  const res = moviesArray.map((movie)=>{
let timeParts = movie.duration.split(" ");
let hour = 0, min = 0;

if(timeParts[0].includes("h")){
   hour =  Number(timeParts[0].replace("h",""))
}

if(timeParts.length > 1 && timeParts[1].includes("min")){
    min = Number(timeParts[1].replace("min",""))
}


let totalMinutes = (hour*60)+min ;

return {
    ...movie,
    duration:totalMinutes
}

})
return res
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
   if(moviesArray.length === 0) return null
  let years = new Set(moviesArray.map((movie)=>movie.year))
  // console.log(years);
let res_arr = []
let bestYear =[];
for (let year of years) {
   bestYear = moviesArray.filter((movie)=>{
     return year === movie.year
     
  })

  let len = bestYear.length;
  let totalscores = bestYear.reduce((total,movie)=>total+movie.score,0)
  let avgScore = Math.round((totalscores/bestYear.length)*100)/100
  res_arr.push({year,avgScore})

}

const finalScore = res_arr.sort((a,b)=>{
  
if(a.avgScore === b.avgScore){
  return a.year - b.year
}
      


      return b.avgScore - a.avgScore})[0]



// The best year was <YEAR> with an average score of <RATE>
return `The best year was ${finalScore.year} with an average score of ${finalScore.avgScore}`
}             



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
