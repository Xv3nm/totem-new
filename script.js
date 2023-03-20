function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }


  function positionContactButton() {
    let projectsButton = document.getElementById("projectsButton");
    let contactButton = document.getElementById("contactButton");
    let rect = projectsButton.getBoundingClientRect();
    let newPos = rect.right + 2;
    contactButton.style.left = newPos + "px";
  }

  window.onresize = function() {
    positionContactButton();
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    
      const typed = new Typed('#typed-text', {
          strings: ['My scripts are so good, even my errors look intentional.','Don\'t quote me on that.','','What are you waiting for?','Im done.'],
          typeSpeed: 25,
          backSpeed: 10,
          backDelay: 1000,
          startDelay: 1000,
          loop: false,
          onComplete: function(self) {
            const projectsButton = document.getElementById("projectsButton");
            projectsButton.classList.add("animate");
            const contactButton = document.getElementById("contactButton");
            contactButton.classList.add("animate");

            positionContactButton();
          }
      });
    
      
  
      let arrowContainer = document.querySelector(".arrow-container");
  
      arrowContainer.addEventListener("click", () => {
          window.scrollBy({
              top: window.innerHeight,
              behavior: 'smooth'
          });
      });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
      const glitchText = document.getElementById("typed-text");
  
      function randomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
      }
  
      function glitch() {
          const glitchAmount = randomInt(1, 3);
  
          for (let i = 0; i < glitchAmount; i++) {
              const glitchNode = glitchText.cloneNode(true);
              glitchNode.style.position = "absolute";
              glitchNode.style.left = `${glitchText.offsetLeft + randomInt(-3, 3)}px`;
              glitchNode.style.top = `${glitchText.offsetTop + randomInt(-3, 3)}px`;
              glitchNode.style.color = `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, ${Math.random()})`;
              glitchNode.style.zIndex = -1;
              glitchText.parentNode.appendChild(glitchNode);
  
              setTimeout(() => {
                  glitchText.parentNode.removeChild(glitchNode);
              }, randomInt(50, 150));
          }
      }
  
      setInterval(glitch, 250);
  });