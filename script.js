console.log("Loading...")
const { gsap, imagesLoaded } = window;

const InitTyped = () => {
    var typed = new Typed('.typedintro', {
        strings: ["Hello!", "Something Smart", "I script when bored", "Lego Games are c00l"],
        typeSpeed: 40,
        showCursor: false
    });
}

const waitForImages = () => {
    const images = [...document.querySelectorAll("img")];
    const totalImages = images.length;
    let loadedImages = 0;
    const loaderEl = document.querySelector(".loader span");

    images.forEach((image) => {
        imagesLoaded(image, (instance) => {
            if (instance.isComplete) {
                loadedImages++;
                let loadProgress = loadedImages / totalImages;

                gsap.to(loaderEl, {
                    duration: 1,
                    scaleX: loadProgress,
                    backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
                });

                if (totalImages == loadedImages) {
                    gsap.timeline()
                        .to(".loading__wrapper", {
                        duration: 0.8,
                        opacity: 0,
                        pointerEvents: "none",
                    })
                        .call(() => init());
                }
            }
        });
    });
    console.log("Loading completed...")
    
    setTimeout(function(){
        InitTyped();
    }, 3000);
};

// 24 hour long loading screen bc Im not done with site :)

setTimeout(function(){
    waitForImages();
}, 86400000);


// waitForImages();