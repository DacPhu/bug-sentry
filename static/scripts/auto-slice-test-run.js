// function truncateText() {
//   const elements = document.querySelectorAll(".truncate");

//   elements.forEach((element) => {

//     if (element.scrollWidth > element.offsetWidth) {
//       let text = element.textContent.trim();
//       let startIndex = 0;
//       let endIndex = text.length - 1;

//       while (startIndex <= endIndex) {
//         const middleIndex = Math.floor((startIndex + endIndex) / 2);
//         const slicedText = text.slice(0, middleIndex) + "...";

//         element.textContent = slicedText;

//         if (element.scrollWidth <= element.offsetWidth) {
//           startIndex = middleIndex + 1;
//         } else {
//           endIndex = middleIndex - 1;
//         }
//       }
//     }
//   });
// }

// // Call the truncateText function when the window is resized
// window.addEventListener("resize", truncateText);

// // Call the truncateText function after DOM content is loaded
// document.addEventListener("DOMContentLoaded", truncateText);
