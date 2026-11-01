// =========== JS USER ===============
const SO_MON_TRONG_GIO = 2;

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
  '<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>';
const ICON_LOGOUT =
  '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>';
const ICON_CART =
  '<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>';

function kiemTraDangNhap() {
  const headerActions = document.getElementById("header-actions");
  if (!headerActions) return;

  const page = window.location.pathname.split("/").pop();
  const laTrangDangNhap = page === "login.html" || page === "register.html";

  // Phần Giỏ hàng (Luôn luôn hiển thị ở mọi trang, kể cả khi chưa đăng nhập)
  const HTML_GIO_HANG = `
    <a href="cart.html" class="header-action-item" style="margin-left: 15px;">
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
    headerActions.innerHTML = `
      <div class="header-action-group">
        <details class="user-dropdown header-action-item">
          <summary>
            ${ICON_USER}
            <div class="action-text">
              <span class="main-text">Nguyễn Văn A ▾</span>
            </div>
          </summary>
          <div class="user-dropdown-content">
            <a href="profile.html">${ICON_USER} Thông tin tài khoản</a>
            <a href="order-history.html">${ICON_ORDER} Lịch sử đơn hàng</a>
            <a href="login.html" onclick="dangXuat()">${ICON_LOGOUT} Đăng xuất</a>
          </div>
        </details>
        ${HTML_GIO_HANG}
      </div>
    `;
  }
}
// 2. Các hàm đăng nhập, đăng ký, đăng xuất (Không dùng alert)
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
    window.location.href = "login.html"; // Chuyển sang login không báo
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

// Các hàm minh họa
function themVaoGio() {
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}
function muaNgay() {
  alert("Đang chuyển đến giỏ hàng...");
}
function chonTopping(ten) {
  alert("Đã chọn " + ten + "!");
}
function tangSoLuong() {
  alert("Đã cập nhật số lượng!");
}
function giamSoLuong() {
  alert("Đã cập nhật số lượng!");
}
function xoaSanPham() {
  alert("Đã xóa sản phẩm khỏi giỏ hàng!");
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