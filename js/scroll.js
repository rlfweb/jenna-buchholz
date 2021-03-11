// Put any functions at the top here that you want to be available to all functions lower down

const pixelsTag = document.querySelector("div.pixels");

const bodyTag = document.querySelector("body");

const progressTag = document.querySelector("div.progress");

// ADDING PIXEL SCROLL FEATURE
// when scroll page, update the pixels tag to be how far we have scrolled
document.addEventListener("scroll", function () {
  const pixels = window.pageYOffset;
  // .toFixed removes the decimal places that seem to appear by default
  pixelsTag.innerHTML = pixels.toFixed();
});

// ADDING PROGRESS SCROLL BAR
// when we scroll the page, make a progress bar that keeps track of teh distance
document.addEventListener("scroll", function () {
  const pixels = window.pageYOffset;
  const pageHeight = bodyTag.getBoundingClientRect().height;
  const totalScrollableDistance = pageHeight - window.innerHeight;

  const percentage = pixels / totalScrollableDistance;

  // can add various options i.e. use height instead of width
  progressTag.style.width = `${100 * percentage}%`;
});

// SECTION SCROLLING FOR ALTERING HEADER
// when scroll the page, want to see how far down the page we've scrolled then for each section, check whether we've passed it, if so update the header
