// Put any functions at the top here that you want to be available to all functions lower down

const pixelsTag = document.querySelector("div.pixels");

const bodyTag = document.querySelector("body");

const progressTag = document.querySelector("div.progress");

const sections = document.querySelectorAll("section");

const clientTag = document.querySelector("div.client");

const pageTag = document.querySelector("div.page");

const headerTag = document.querySelector("header");

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

document.addEventListener("scroll", function () {
  const pixels = window.pageYOffset;

  sections.forEach((section) => {
    if (section.offsetTop - 60 <= pixels) {
      clientTag.innerHTML = section.getAttribute("data-client");
      pageTag.innerHTML = section.getAttribute("data-page");

      if (section.hasAttribute("data-is-dark")) {
        headerTag.classList.add("white");
        progressTag.classList.add("white");
      } else {
        headerTag.classList.remove("white");
        progressTag.classList.remove("white");
      }
    }
  });
});

// Explanation
// offsetTop returns the position of the top of the element relative to the page. For example, if a section starts at 1000px away from the top, section.offsetTop returns 1000px.

// const pixels = window.pageYOffset is the number of pixels that have been scrolled, so if (section.offsetTop &lt; pixels) {} checks if the top of the section is less than the pixels scrolled.

// ---

// PARALLAX SCROLL EFFECT

// we want to move certain tags based on how far they are from an anchor point
// an anchor point is the middle of the viewport?
// how far should we parallax? - a ratio of the middle distance scrolled to the middle point of the anchor
document.addEventListener("scroll", function () {
  const topViewport = window.pageYOffset;
  const midViewport = topViewport + window.innerHeight / 2;
  // console.log(midViewport);

  sections.forEach((section) => {
    const topSection = section.offsetTop;
    const midSection = topSection + section.offsetHeight / 2;
    // console.log(midSection);
    const distanceToSection = midViewport - midSection;
    // console.log(distanceToSection);
    const parallaxTags = section.querySelectorAll(`[data-parallax]`);
    // make sure this is section. not document.

    // loop over each parallaxed tag
    parallaxTags.forEach((tag) => {
      const speed = parseFloat(tag.getAttribute("data-parallax"));
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`;
    });
  });
});

// SMALLER SCREEN SIZES
// How can I change the speed for a smaller screensize? if not, how can I remove the parallax effect for mobile?
// What you could do is grab the window size with window.innerWidth and use that to build a new variable based on speedon line 67. Like const viewportSpeed = window.innerWidth < 720 ? speed * 0.8 : speed for “if the window is smaller than 720px make the speed 80% otherwise normal” and then use that viewportSpeed instead of speed on the next line.
