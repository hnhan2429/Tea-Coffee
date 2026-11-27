// =========== JS USER ===============
const SO_MON_TRONG_GIO = 4;

function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  toast.innerHTML = `
    <!-- Icon tích xanh -->
    <svg class="toast-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    
    <!-- Nội dung -->
    <div class="toast-content">
      <div class="toast-message">${message}</div>
    </div>
    
    <!-- Nút tắt (X) -->
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
     `;

  container.appendChild(toast);

  // Tự động xóa sau 3 giây
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.animation = "slideInRight 0.3s ease reverse forwards";
      setTimeout(() => toast.remove(), 300);
    }
  }, 3000);
}

// 1. Trạng thái đăng nhập: Mặc định là TRUE (đã đăng nhập sẵn)
function daDangNhap() {
  const status = sessionStorage.getItem("daDangNhap");
  // Nếu chưa có trạng thái (lần đầu mở web) -> Trả về true (đã đăng nhập)
  // Nếu đã bấm đăng xuất (status = "false") -> Trả về false
  return status === null || status === "true";
}

const ICON_USER =
  '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
const ICON_ORDER =
  '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
const ICON_LOGOUT =
  '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>';
const ICON_CART =
  '<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';

function kiemTraDangNhap() {
  const headerActions = document.getElementById("header-actions");
  if (!headerActions) return;

  const page = window.location.pathname.split("/").pop();
  const laTrangDangNhap = page === "login.html" || page === "register.html";

  // Kiểm tra xem trang hiện tại có phải là cart.html không
  const isCartPage = window.location.pathname.includes("cart.html");
  const activeClass = isCartPage ? "active" : "";

  const HTML_GIO_HANG = `
    <a href="cart.html" class="header-action-item ${activeClass}" style="margin-left: 15px;">
      <div class="cart-icon-wrapper">
        ${ICON_CART}
        <span class="cart-badge-header">${SO_MON_TRONG_GIO}</span>
      </div>
      <div class="action-text">
        <span class="main-text" style="margin-top: 5px;">Giỏ hàng</span>
      </div>
    </a>
  `;

  if (laTrangDangNhap) {
    headerActions.innerHTML = `
      <a href="login.html" class="btn-header btn-dang-nhap">Đăng nhập</a>
      <a href="register.html" class="btn-header btn-dang-ky">Đăng ký</a>
      ${HTML_GIO_HANG}
    `;
  } else if (!daDangNhap()) {
    // Chưa đăng nhập: Hiện nút Đăng nhập, Đăng ký và Giỏ hàng
    headerActions.innerHTML = `
      <a href="login.html" class="btn-header btn-dang-nhap">Đăng nhập</a>
      <a href="register.html" class="btn-header btn-dang-ky">Đăng ký</a>
      ${HTML_GIO_HANG}
    `;
  } else {
    // Đã đăng nhập: Hiện Tài khoản và Giỏ hàng
    const isAccountPage = window.location.pathname.includes("account.html");
    const accountActiveClass = isAccountPage ? "active" : "";

    headerActions.innerHTML = `
      <div class="header-action-group">
        <details class="user-dropdown header-action-item ${accountActiveClass}">
          <summary>
            ${ICON_USER}
            <div class="action-text">
              <span class="main-text">Nguyễn Văn A ▾</span>
            </div>
          </summary>
          <div class="user-dropdown-content">
            <a href="account.html">${ICON_USER} Thông tin tài khoản</a>
            <a href="order-history.html">${ICON_ORDER} Lịch sử đơn hàng</a>
            <a href="login.html" onclick="dangXuat()">${ICON_LOGOUT} Đăng xuất</a>
          </div>
        </details>
        ${HTML_GIO_HANG}
      </div>
    `;
  }
}
// 2. Các hàm đăng nhập, đăng ký, đăng xuất
function dangNhap() {
  sessionStorage.setItem("daDangNhap", "true");
}

function dangKy() {
  // Chỉ cần chuyển về trang login, không báo
}

function dangXuat() {
  sessionStorage.setItem("daDangNhap", "false");
  // Thẻ <a href="login.html"> ở Header sẽ tự động chuyển trang
}

// 3. Chặn trang Lịch sử đơn hàng (Gọi ở đầu trang order-history.html)
function baoVeTrang() {
  if (!daDangNhap()) {
    window.location.href = "login.html"; // Chuyển sang login
  }
}

// 4. Chặn thanh toán (Gọi ở nút Đặt Hàng trong cart.html)
function xuLyThanhToan() {
  if (daDangNhap()) {
    return true; // Đã đăng nhập -> Cho phép chuyển sang trang thành công
  } else {
    window.location.href = "login.html"; // Chưa đăng nhập -> Chuyển sang login không báo
    return false; // Chặn không cho chuyển sang trang thành công
  }
}

//Các hàm minh họa
function themVaoGio() {
  showToast("Đã thêm sản phẩm vào giỏ hàng!");
}
function muaNgay() {
  showToast("Đang chuyển đến giỏ hàng...");
}
function chonTopping(ten) {
  showToast("Đã chọn " + ten + "!");
}
function tangSoLuong() {
  showToast("Đã cập nhật số lượng!");
}
function giamSoLuong() {
  showToast("Đã cập nhật số lượng!");
}
function xoaSanPham() {
  showToast("Đã xóa sản phẩm khỏi giỏ hàng!");
}

// ---------- TỰ ĐỘNG ĐỊNH DẠNG SỐ (THÊM DẤU CHẤM) ----------
function formatTienTe(input) {
  // 1. Lấy giá trị hiện tại, xóa tất cả các ký tự không phải là số
  let value = input.value.replace(/\D/g, "");

  // 2. Nếu có số, định dạng lại bằng dấu chấm
  if (value) {
    // Thêm dấu chấm ngăn cách hàng nghìn
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    input.value = value;
  }
}

function kichHoatDanhMuc() {
  const links = document.querySelectorAll(".categories-inner a");
  const tieuDe = document.querySelectorAll(".category-title-mini[id]");
  if (!tieuDe.length) return; // chỉ chạy ở trang có danh mục

  function capNhat() {
    let idHienTai = "";
    tieuDe.forEach((h) => {
      if (h.getBoundingClientRect().top <= 160) idHienTai = h.id;
    });

    // Cuộn tới cuối trang thì coi như đang ở mục cuối (Topping)
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
      idHienTai = tieuDe[tieuDe.length - 1].id;
    }

    links.forEach((a) => {
      const href = a.getAttribute("href");
      if (href.includes("#")) {
        a.classList.toggle("active", href.split("#")[1] === idHienTai);
      } else if (href === "products.html") {
        // "Sản phẩm" chỉ sáng khi chưa cuộn tới mục nào
        a.classList.toggle("active", idHienTai === "");
      }
    });
  }

  window.addEventListener("scroll", capNhat, { passive: true });
  capNhat();
}
