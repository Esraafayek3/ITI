// task1
$(".hover, .sidebar").on("mouseenter", function () {
  $(".sidebar").css("left", "0");
});

$(".hover, .sidebar").on("mouseleave", function () {
  $(".sidebar").css("left", "-200px");
});

// task2

$(function () {
  let images = [
    "images/shuffle-01.jpg",
    "images/shuffle-02.jpg",
    "images/shuffle-03.jpg",
    "images/shuffle-04.jpg",
    "images/shuffle-05.jpg",
  ];
  let current = 0;

  $(".thumbnails img").click(function () {
    current = parseInt($(this).data("index"));
    $("#bigImage").attr("src", images[current]);
    $(".popup").fadeIn();
  });

  $("#next").click(function () {
    current = (current + 1) % images.length;
    $("#bigImage").attr("src", images[current]);
  });

  $("#prev").click(function () {
    current = (current - 1 + images.length) % images.length;
    $("#bigImage").attr("src", images[current]);
  });

  $(".close").click(function () {
    $(".popup").fadeOut();
  });
});
// task3
$(document).ready(function () {
  let allPosts = [];
  let currentIndex = 0;
  const postsPerPage = 10;

  $.get("https://jsonplaceholder.typicode.com/posts", function (data) {
    allPosts = data;
    showPosts();
  });

  function showPosts(filteredPosts = null) {
    const posts = filteredPosts || allPosts;
    const sliced = posts.slice(0, currentIndex + postsPerPage);
    $("#posts-container").empty();

    sliced.forEach(function (post) {
      const postHtml = `
            <div class="post-card">
              <h2>${post.title}</h2>
              <p>${post.body}</p>
            </div>
          `;
      $("#posts-container").append(postHtml);
    });

    if (sliced.length >= posts.length) {
      $("#load-more").hide();
    } else {
      $("#load-more").show();
    }
  }

  $("#load-more").click(function () {
    currentIndex += postsPerPage;
    showPosts();
  });

  $("#search").on("input", function () {
    const keyword = $(this).val().toLowerCase();
    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(keyword)
    );

    currentIndex = 0;
    showPosts(filtered);
  });
});



function counter() {
	let count = 0;
	let name = "Ahmed";

	return function () {
		count++;
		console.log("Count:", count);

		console.log("Name:", name);
	};
}
// debugger;

const counter1 = counter();
console.dir(counter1);

counter1(); // 0 -> 1
counter1(); // 1 -> 2
counter1(); // 2 -> 3
// counter1();
// counter1();
// counter1();
// counter1();
// counter1();
