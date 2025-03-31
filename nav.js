// Page Navigation
function changePage(pageId) {
  // Hide all pages
  var pages = ["home", "about", "products"];
  for (var i = 0; i < pages.length; i++) {
    var pageElement = document.getElementById(pages[i] + "Page");
    pageElement.classList.remove("active");
  }

  // Show selected page
  var selectedPage = document.getElementById(pageId + "Page");
  selectedPage.classList.add("active");
  selectedPage.querySelector(".page-content").classList.add("animate-entry");
}
