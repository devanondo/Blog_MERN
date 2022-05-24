import React from "react";

export default function Hfront() {
  let student = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let suffle = shuffleArray(student);
  console.log(suffle);
  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <>
      <div>some</div>
    </>
  );
}
