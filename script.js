$(function() {
  $(".projects-wrapper").css("display", "none");
});

$(function() {
  $(".menu-link").click(function() {
      $(".menu-link").removeClass("is-active");
      $(this).addClass("is-active");
  });
});

$(function() {
  $(".main-header-link").click(function() {
      $(".main-header-link").removeClass("is-active");
      $(this).addClass("is-active");
  });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdowns.forEach((c) => c.classList.remove("is-active"));
      dropdown.classList.add("is-active");
  });
});

$(".search-bar input")
  .focus(function() {
      $(".header").addClass("wide");
  })
  .blur(function() {
      $(".header").removeClass("wide");
  });

$(document).click(function(e) {
  var container = $(".status-button");
  var dd = $(".dropdown");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
      dd.removeClass("is-active");
  }
});

$(function() {
  $(".dropdown").on("click", function(e) {
      $(".content-wrapper").addClass("overlay");
      e.stopPropagation();
  });
  $(document).on("click", function(e) {
      if ($(e.target).is(".dropdown") === false) {
          $(".content-wrapper").removeClass("overlay");
      }
  });
});

$(function() {
  $(".status-button:not(.open)").on("click", function(e) {
      $(".overlay-app").addClass("is-active");
  });
  $(".pop-up .close").click(function() {
      $(".overlay-app").removeClass("is-active");
  });
});

$(".status-button:not(.open)").click(function() {
  $(".pop-up").addClass("visible");
});

$(".pop-up .close").click(function() {
  $(".pop-up").removeClass("visible");
});

const toggleButton = document.querySelector('.dark-light');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

$(document).ready(function() {
  $(".home-btn").click(function() {
    $(".projects-wrapper").fadeOut(150, function() {
      $(".home-wrapper").fadeIn(150);
    });
  });

  $(".projects-btn").click(function() {
    $(".home-wrapper").fadeOut(150, function() {
      $(".projects-wrapper").fadeIn(150);
    });
  });

  console.clear()

  const repoName = "Xv3nm/totem-new";
  const branchName = "main";

  // Retrieve commit count
  const commitCountUrl = `https://api.github.com/repos/${repoName}/commits?sha=${branchName}&per_page=1`;
  fetch(commitCountUrl)
    .then(response => response.json())
    .then(commits => {
      const lastCommitUrl = `https://api.github.com/repos/${repoName}/commits?sha=${branchName}&per_page=1`;
      return fetch(lastCommitUrl);
    })
    .then(response => response.json())
    .then(commits => {
      const lastCommitDate = new Date(commits[0].commit.author.date);
      const now = new Date();
      const diffMs = now - lastCommitDate;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
      let timeAgo = "";
      if (diffDays > 0) {
        timeAgo += `${diffDays} day(s)`;
      } else if (diffHrs > 0) {
        timeAgo += `${diffHrs} hour(s)`;
      } else if (diffMins > 0) {
        timeAgo += `${diffMins} minute(s)`;
      } else {
        timeAgo += `${diffSecs} second(s)`;
      }
      timeAgo += " ago";
      console.log("Last commit was:", timeAgo);
      $(".updated-lable").text(timeAgo);
    })
    .catch(error => {
      console.error("Error getting commit count and last commit date:", error);
    });

    const commitCountFileUrl = `https://raw.githubusercontent.com/${repoName}/${branchName}/commit_count.json`;

    fetch('https://raw.githubusercontent.com/Xv3nm/totem-new/main/commit_count.json')
    .then((response) => response.json())
    .then((data) => {
      const commitCount = data.commitCount;
      console.log('Commit count:', commitCount);
      $(".commits-lable").text(commitCount + " Commits");
    })
    .catch((error) => {
      console.error('Error fetching and parsing commit_count.json:', error);
    });
});



// Loading Script

$(document).ready(function () {
  const $images = $('img');
  const $videos = $('video');
  const $loadingHeader = $('#loading-header')
  const $loadingScreen = $('#loading-screen');
  const $progressBar = $('#progress-bar');
  const totalCount = $images.length + $videos.length;
  let loadedCount = 0;

  function updateProgressBar() {
      loadedCount++;
      const progressPercentage = (loadedCount / totalCount) * 100;
      $progressBar.width(`${progressPercentage}%`);

      if (loadedCount === totalCount) {
        setTimeout(function(){
          $loadingHeader.text("Finished!");
          setTimeout(function(){
            $loadingScreen.fadeOut();
          },500)
        },1000)
      }
  }

  if (totalCount === 0) {
      $loadingScreen.hide();
  } else {
      $images.on('load', updateProgressBar).each(function () {
          if (this.complete) {
              $(this).trigger('load');
          }
      });

      $videos.on('loadeddata', updateProgressBar).each(function () {
          if (this.readyState >= 2) {
              $(this).trigger('loadeddata');
          }
      });
  }
});
