// ======= variables =======

const visibleBtn = document.querySelector(".addlesson-viewer-container");
const gameListContainer = document.querySelector(".game-list");
const closeBtn = document.querySelector(".game-list .header i");
const gameListOptions = document.querySelector(".game-list-options");
const closeOptionsBtn = document.querySelector(".game-list-options .header");
const options = document.querySelectorAll(".select-media-type-container .card");
const listItems = document.querySelector(".hide-bullets");
const items = document.querySelectorAll(".hide-bullets li");
const arrItems = Array.from(items);

const cards = document.querySelectorAll(".card");
const dropBtn = document.querySelector(".filter-pup-btn");
const filterMenu = document.getElementById("filtermenu");
const hiddenBtn = document.querySelector(".bars");
let counter = document.querySelectorAll(".counter");
const game_body = document.querySelector(".game-body");
const slider = document.querySelector(".slider");
let alert = document.querySelector(".alert");
let selectedState = true;
const myFrame = document.getElementById("iframe");
let backBtnCkeditor = document.querySelector(".ckeditor .backBtn");
let backBtnGames = document.querySelector(".back_add_media");
const ckeditor = document.querySelector(".ckeditor");
const closeEditorBtn = document.querySelector(".ckeditor .header i");
console.log(backBtnGames);
// ======= visible game list =======

visibleBtn.addEventListener("click", function () {
  gameListOptions.classList.add("active");
});

closeBtn.addEventListener("click", function () {
  gameListContainer.classList.remove("active");
});

closeOptionsBtn.addEventListener("click", function () {
  gameListOptions.classList.remove("active");
});

closeEditorBtn.addEventListener("click", function () {
  ckeditor.classList.remove("active");
});

backBtnCkeditor.addEventListener("click", function () {
  ckeditor.classList.remove("active");
  gameListOptions.classList.add("active");
});

backBtnGames.addEventListener("click", function () {
  gameListContainer.classList.remove("active");
  gameListOptions.classList.add("active");
});

// ===== add myFrameents from game list to slidebar =====

cards.forEach((card) => {
  let addBtn = card.querySelector(".card-control .addBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      console.log("clicked");

      let img = card.querySelector(".card-images img").src;
      let title = card.querySelector(".card-title span");

      const newItem = document.createElement("li");
      newItem.draggable = true;
      newItem.classList.add(
        "col-sm-12",
        "col-md-12",
        "col-lg-12",
        "jq_media_item",
        "ui-sortable-handle"
      );

      newItem.setAttribute("media_agree", card.getAttribute("media_agree"));
      newItem.setAttribute("media_type", card.getAttribute("media_type"));
      newItem.setAttribute("media_cat", card.getAttribute("media_cat"));
      newItem.setAttribute("media_id", card.getAttribute("media_id"));
      newItem.setAttribute("src-attr", card.getAttribute("src-attr"));
      newItem.setAttribute("category_ar", card.getAttribute("category_ar"));
      newItem.setAttribute("category_en", card.getAttribute("category_en"));
      newItem.setAttribute("title_ar", card.getAttribute("title_ar"));
      newItem.setAttribute("title_en", card.getAttribute("title_en"));
      newItem.setAttribute("type", card.getAttribute("type"));

      const itemHeader = document.createElement("div");
      itemHeader.classList.add("item-header");

      const itemCategory = document.createElement("div");
      itemCategory.classList.add("item-category");
      itemCategory.title = "المادة الدراسية";
      itemCategory.textContent = title.textContent;

      const deleteBtn = document.createElement("div");
      deleteBtn.classList.add("item-delete", "float-right");
      deleteBtn.title = "حذف";
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      const moveBtn = document.createElement("div");
      moveBtn.classList.add(
        "jq_moveitem",
        "float-right",
        "icon-sorting",
        "col-main-color"
      );
      moveBtn.innerHTML = '<i class="fa-solid fa-arrows-up-down"></i>';
      moveBtn.title = "lang.move";

      itemHeader.appendChild(itemCategory);
      itemHeader.appendChild(deleteBtn);
      itemHeader.appendChild(moveBtn);

      const thumbnailContainer = document.createElement("a");
      thumbnailContainer.classList.add("thumbnail", "jq_media_title");
      thumbnailContainer.id = "carousel-selector-1";
      thumbnailContainer.title = "قياس الزوايا";

      const imageElement = document.createElement("img");
      imageElement.src = img;

      thumbnailContainer.appendChild(imageElement);

      newItem.appendChild(itemHeader);
      newItem.appendChild(thumbnailContainer);

      card.parentElement.remove();

      listItems.appendChild(newItem);

      // إعادة تعيين الأحداث للعنصر الجديد هنا
      newItem.addEventListener("click", (event) => {
        console.log(222222222);
        if (!event.target.closest(".item-delete")) {
          removeAllSelected();
          myFrame.src = newItem.getAttribute("src-attr");
          newItem.classList.add("selected");
        } else {
          newItem.remove();
        }
      });

      newItem.addEventListener("dragstart", () =>
        setTimeout(() => newItem.classList.add("dragging"), 0)
      );
      newItem.addEventListener("dragend", () =>
        newItem.classList.remove("dragging")
      );





      // إضافة العنصر الجديد إلى قائمة العناصر القديمة
      newListItems.push(newItem);

      editCount();
    });
  }
  let fullBtn = card.querySelector(".card-control .fullScreenBtn");
  // when user click on full screen btn in game list
  if (fullBtn) {
    fullBtn.addEventListener("click", function () {
      document.getElementById('iframe').src = card.getAttribute("src-attr");
      openFullscreen();
    });
  }
});

// ======= drag and drop on nav lists =======

items.forEach((li) => {
  li.querySelector(".item-delete").addEventListener("click", function () {
    console.log("remove");
    li.remove();
    editCount();
    showGame();
  });
});

// when user click on option
let arrOptions = Array.from(options);

arrOptions.forEach((opt) => {
  opt.addEventListener("click", function () {
    console.log(opt.dataset.page);
    if (opt.dataset.page === "ckeditor") {
      gameListOptions.classList.remove("active");
      ckeditor.classList.add("active");
    }
    if (opt.dataset.page === "games") {
      gameListOptions.classList.remove("active");
      gameListContainer.classList.add("active");
    }
  });
});

items.forEach((item) => {
  console.log(item);
  item.addEventListener("click", () => {
    console.log(111111111);
    removeAllSelected();
    item.classList.add("selected");
  });
  item.addEventListener("dragstart", () =>
    setTimeout(() => item.classList.add("dragging"), 0)
  );
  item.addEventListener("dragend", () => item.classList.remove("dragging"));
});

function removeAllSelected() {
  console.log("removed selected");

  items.forEach((item) => {
    if (item.classList.contains("selected")) {
      console.log(item);
      item.classList.remove("selected");
    }
  });
  // إزالة الفئة "selected" من العناصر التي تمت إضافتها مؤخرًا
  const newlyAddedItems = document.querySelectorAll(".jq_media_item.selected");
  newlyAddedItems.forEach((item) => {
    item.classList.remove("selected");
  });
  showGame();
}

// const sortableList = (e) => {
//   e.preventDefault();
//   const draggingItem = document.querySelector(".dragging");

//   //getting all items except currently dragging and making array of them
//   const siblings = [...listItems.querySelectorAll("li:not(.dragging)")];
//   //find the sibling after which the dragging item should be placed
//   let nextSibling = siblings.find((sibling) => {
//     return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
//   });

//   listItems.insertBefore(draggingItem, nextSibling);
//   editCount();
// };


// function to sort items when drageover

// listItems.addEventListener("dragover", sortableList);
// listItems.addEventListener("dragenter", (e) => e.preventDefault());

// ======= visible and hidden container =======




hiddenBtn.addEventListener("click", function () {
  var leftsidebar_width = document.getElementById("leftsidebar");
  var computedWidth = leftsidebar_width.style.width;

  if (computedWidth == "15%") {
    leftsidebar_width.style.width = "0%";
    document.getElementById("game-body").style.width = "100%";
  } else {
    leftsidebar_width.style.width = "15%";
    document.getElementById("game-body").style.width = "85%";
  }
});

items.forEach((item) => {
  item.addEventListener("click", function (event) {
    // check if the clicked element is not the "delete" item
    if (!event.target.closest(".item-delete")) {
      console.log("add");
      document.getElementById("iframe").src = item.getAttribute("src-attr");
      console.log(this);
    }
  });
});

// drop down menu
dropBtn.addEventListener("click", () => {
  filterMenu.classList.toggle("show");
});

const newListItems = [...listItems.querySelectorAll("li")];
function editCount() {
  // Update display with new order

  newListItems.forEach((item, index) => {
    // Remove previous order number
    const existingOrderIndicator = item.querySelector(".order-indicator");
    if (existingOrderIndicator) {
      item.removeChild(existingOrderIndicator);
    }

    // Create and append new order number
    const newOrderIndicator = document.createElement("input");
    newOrderIndicator.value = index + 1;
    newOrderIndicator.name = "order[]";

    newOrderIndicator.classList.add("order-indicator");
    item.appendChild(newOrderIndicator);
    item.querySelector(".item-delete").addEventListener("click", () => {
      item.remove();
    });
    // item.addEventListener("click" , ()=>{
    //   // removeAllSelected();
    //   // if(item.classList.contains("selected")){
    //   //   console.log("selected");
    //   //   item.classList.remove("selected")
    //   // }
    //   item.classList.add("selected")
    //   myFrame.src = item.getAttribute("src-attr");
    // })
  });

  // Array to store the IDs of the list items in their current order
  const itemIds = newListItems.map((item) => item.getAttribute("media_id"));
}

function openFullscreen() {
  if (myFrame.requestFullscreen) {
    myFrame.requestFullscreen();
  } else if (myFrame.webkitRequestFullscreen) {
    /* Safari */
    myFrame.webkitRequestFullscreen();
  } else if (myFrame.msRequestFullscreen) {
    /* IE11 */
    myFrame.msRequestFullscreen();
  } else if (myFrame.mozRequestFullscreen) {
    myFrame.mozRequestFullscreen();
  } else if (myFrame.webkitEnterFullscreen) {
    myFrame.webkitEnterFullscreen();
  }
}

function showGame() {
  // Check if there's a selected item
  let selectedListItem = document.querySelector(".selected");
  if (selectedListItem) {
    selectedState = true;
    let selectedSrcAttr = selectedListItem.getAttribute("src-attr");
    document.getElementById("iframe").src = selectedSrcAttr;
  } else {
    document.getElementById("iframe").src = "";
  }
}
showGame();



Sortable.create(listItems, {
  animation: 350,
  onSort: function (evt) {
    console.log('تم فرز العنصر', evt.item);
    editCount()
  },
});


