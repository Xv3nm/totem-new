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

  const repoName = "Xv3nm/totem-new";
const apiUrl = `https://api.github.com/repos/${repoName}`;

$.ajax({
  url: apiUrl,
  method: "GET",
  headers: {
    Accept: "application/vnd.github.v3+json"
  },
  success: function(data) {
    const commitCount = data["size"];
    console.log("Number of commits:", commitCount);

    const lastCommitDate = new Date(data["pushed_at"]);
    const now = new Date();
    const diffMs = now - lastCommitDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
    let timeAgo = "";
    if (diffDays > 0) {
      timeAgo += `${diffDays} day(s) `;
    }
    if (diffHrs > 0) {
      timeAgo += `${diffHrs} hour(s) `;
    }
    if (diffMins > 0) {
      timeAgo += `${diffMins} minute(s) `;
    }
    if (diffSecs > 0) {
      timeAgo += `${diffSecs} second(s) `;
    }
    timeAgo += "ago";
    console.log("Last commit was:", timeAgo);
  },
  error: function(error) {
    console.log("Error getting repository information:", error);
  }
});

});
