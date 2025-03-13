document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".header_main_menu li");

  // Đặt thẻ đầu tiên là mặc định
  menuItems[0].classList.add("active");

  menuItems.forEach((item) => {
    item.addEventListener("mouseover", function () {
      // Xóa lớp active khỏi tất cả các thẻ
      menuItems.forEach((i) => i.classList.remove("active"));
      // Thêm lớp active vào thẻ hiện tại
      this.classList.add("active");
    });
  });
});
const smoothProductInfoRow = document.querySelector(".header_main_menu ul");
let isDragging = false;
let startX, scrollLeft;

// Bắt đầu kéo
smoothProductInfoRow.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - smoothProductInfoRow.offsetLeft;
  scrollLeft = smoothProductInfoRow.scrollLeft;
  smoothProductInfoRow.style.cursor = "grabbing"; // Thay đổi con trỏ khi đang kéo
});

// Kéo trong khi giữ chuột
smoothProductInfoRow.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - smoothProductInfoRow.offsetLeft;
  const walk = (x - startX) * 2; // Tốc độ kéo (có thể điều chỉnh)
  smoothProductInfoRow.scrollLeft = scrollLeft - walk;
});

// Kết thúc kéo
smoothProductInfoRow.addEventListener("mouseup", () => {
  isDragging = false;
  smoothProductInfoRow.style.cursor = "grab"; // Trả lại con trỏ mặc định
});

// Khi rê chuột ra khỏi container, dừng kéo
smoothProductInfoRow.addEventListener("mouseleave", () => {
  isDragging = false;
});

// Thêm sự kiện touch
smoothProductInfoRow.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - smoothProductInfoRow.offsetLeft;
  scrollLeft = smoothProductInfoRow.scrollLeft;
  smoothProductInfoRow.style.cursor = "grabbing";
});

smoothProductInfoRow.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.touches[0].pageX - smoothProductInfoRow.offsetLeft;
  const walk = (x - startX) * 2;
  smoothProductInfoRow.scrollLeft = scrollLeft - walk;
});

smoothProductInfoRow.addEventListener("touchend", () => {
  isDragging = false;
  smoothProductInfoRow.style.cursor = "grab";
});
