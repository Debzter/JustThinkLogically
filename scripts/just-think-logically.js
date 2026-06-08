const websiteWrapper = document.querySelector('.website-wrapper');

let currentSectionIndex = 0;

const startPage = document.querySelector('.start-page');
const startButton = document.querySelector('#start-button');


startButton.addEventListener('click', function () {
  startPage.style.display = 'none';
  websiteWrapper.style.display = 'block';

  websiteWrapper.scrollTop = 0;
  websiteWrapper.scrollLeft = 0;
});

const homeButton = document.querySelector('#home-button');


homeButton.addEventListener('click', () => {
  startPage.style.display = 'flex';
  websiteWrapper.style.display = 'none';

  websiteWrapper.scrollTop = 0;
  websiteWrapper.scrollLeft = 0;
});

const aboutButton = document.querySelector('#about-button');
const aboutDropdown = document.querySelector('#about-dropdown');

aboutButton.addEventListener('click', () => {
  aboutDropdown.classList.toggle('visible');
});


const sections = [
  {
    startTop: 0,
    endTop: 4400,
    startLeft: 0,
    endLeft: 0,
    mode: 'vertical'
  },
  {
    startTop: 4400,
    endTop: 4400,
    startLeft: 0,
    endLeft: 900,
    direction: 'right',
    mode: 'horizontal'

  },
  {
    startTop: 4400,
    endTop: 6000,
    startLeft: 900,
    endLeft: 900,
    direction: 'down',
    mode: 'vertical'
  },
  {
    startTop: 6000,
    endTop: 6000,
    startLeft: 900,
    endLeft: 0,
    direction: 'left',
    mode: 'horizontal'
  },
  {
    startTop: 6000,
    endTop: 6800,
    startLeft: 0,
    endLeft: 0,
    direction: 'down',
    mode: 'vertical'
  },
  {
    startTop: 6800,
    endTop: 6800,
    startLeft: 0,
    endLeft: 3400,
    direction: 'right',
    mode: 'horizontal'
  },
  {
    startTop: 6800,
    endTop: 8000,
    startLeft: 3400,
    endLeft: 3400,
    direction: 'down',
    mode: 'vertical'
  },
  {
    startTop: 8000,
    endTop: 8000,
    startLeft: 3400,
    endLeft: 1000,
    direction: 'left',
    mode: 'horizontal'
  },
  {
    startTop: 8000,
    endTop: 9100,
    startLeft: 1000,
    endLeft: 1000,
    direction: 'down',
    mode: 'vertical',
  },
  {
    startTop: 9100,
    endTop: 9100,
    startLeft: 1000,
    endLeft: 0,
    direction: 'left',
    mode: 'horizontal',
  },
  {
    startTop: 9100,
    endTop: 11600,
    startLeft: 0,
    endLeft: 0,
    direction: 'down',
    mode: 'vertical'
  },
  {
    startTop: 11600,
    endTop: 11600,
    startLeft: 300,
    endLeft: 1800,
    direction: 'right',
    mode: 'horizontal'
  },
  {
    startTop: 11600,
    endTop: 12200,
    startLeft: 1800,
    endLeft: 1800,
    direction: 'down',
    mode: 'vertical'
  }
];



websiteWrapper.addEventListener("wheel", function (event) {
  event.preventDefault();

  const currentSection = sections[currentSectionIndex];

  if (currentSection.mode === "vertical") {
    websiteWrapper.scrollTop += event.deltaY;
    if(currentSection.direction === 'up') {
      websiteWrapper.scrollTop -= event.deltaY;}

    else if( currentSection.direection === 'down')
       {
        websiteWrapper.scrollTop += event.deltaY;}
  }

  if (currentSection.mode === "horizontal") {
    if(currentSection.direction === 'right'){
      websiteWrapper.scrollLeft += event.deltaY;
    }
    else if (currentSection.direction === 'left'){
      websiteWrapper.scrollLeft -= event.deltaY;
    }
  }

  checkEffects(currentSection);

  if (
    event.deltaY > 0 &&
    currentSectionIndex < sections.length - 1 &&
    shouldGoToNextSection(currentSection)
  ) {
    currentSectionIndex++;
  }

  if (
    event.deltaY < 0 &&
    currentSectionIndex > 0 &&
    shouldGoToPreviousSection(currentSection)
  ) {
    currentSectionIndex--;
  }

  console.log("current section:", currentSectionIndex);
  console.log(`Y position: ${websiteWrapper.scrollTop} X position: ${websiteWrapper.scrollLeft}`);
}, { passive: false });


function shouldGoToNextSection(section) {
  if (section.mode === "vertical") {
    return websiteWrapper.scrollTop >= section.endTop;
  }

  if (section.mode === "horizontal") {
    if (section.direction === "right") {
      return websiteWrapper.scrollLeft >= section.endLeft;
    }

    if (section.direction === "left") {
      return websiteWrapper.scrollLeft <= section.endLeft;
    }
  }

  return false;
}

function shouldGoToPreviousSection(section) {
  if (section.mode === "vertical") {
    return websiteWrapper.scrollTop <= section.startTop;
  }

  if (section.mode === "horizontal") {
    if (section.direction === "right") {
      return websiteWrapper.scrollLeft <= section.startLeft;
    }

    if (section.direction === "left") {
      return websiteWrapper.scrollLeft >= section.startLeft;
    }
  }

  return false;
}


function checkEffects(section) {
  if (section.effect === 'set-class') {
    if (websiteWrapper.scrollTop >= section.endTop) {
      const element = document.querySelector(`.${section.element}`);
      element.classList.add('effect-visible');
    }
  }
}


