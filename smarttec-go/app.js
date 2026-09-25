/* =========================================================
   SMARTTEC GO™
   FortSecure Kenya
   DEMONSTRATION INVENTORY MANAGEMENT SYSTEM

   NOTE:
   This is a browser-based demonstration prototype.
   Production deployment would require a secure backend,
   database, authentication, server-side authorization,
   backups and server-side audit logging.
========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
========================================================= */

const STORAGE_KEY = "smarttec_go_demo_v1";

const ROLES = {
  admin: {
    name: "Administrator",
    user: "Demo Administrator",
    avatar: "AD",
    pages: [
      "dashboard",
      "products",
      "receiving",
      "sales",
      "stock",
      "count",
      "expiry",
      "reorder",
      "reports",
      "users",
      "audit"
    ]
  },

  manager: {
    name: "Manager",
    user: "Demo Manager",
    avatar: "MG",
    pages: [
      "dashboard",
      "products",
      "receiving",
      "sales",
      "stock",
      "count",
      "expiry",
      "reorder",
      "reports",
      "audit"
    ]
  },

  worker: {
    name: "Inventory Worker",
    user: "Demo Inventory Worker",
    avatar: "IW",
    pages: [
      "dashboard",
      "products",
      "receiving",
      "stock",
      "count",
      "expiry",
      "reorder"
    ]
  },

  cashier: {
    name: "Cashier / Sales",
    user: "Demo Cashier",
    avatar: "CS",
    pages: [
      "dashboard",
      "sales",
      "stock"
    ]
  },

  auditor: {
    name: "Auditor",
    user: "Demo Auditor",
    avatar: "AU",
    pages: [
      "dashboard",
      "products",
      "stock",
      "expiry",
      "reports",
      "audit"
    ]
  }
};


/* =========================================================
   PAGE TITLES
========================================================= */

const PAGE_TITLES = {
  dashboard: "Dashboard",
  products: "Products",
  receiving: "Receive Stock",
  sales: "Sales",
  stock: "Live Stock",
  count: "Stock Count",
  expiry: "Expiry Monitor",
  reorder: "Reorder",
  reports: "Reports",
  users: "User Management",
  audit: "Audit Trail"
};


/* =========================================================
   DEMO DATA
========================================================= */

const DEMO_PRODUCTS = [
  {
    id: "P001",
    sku: "SM001",
    name: "Unga Maize Flour 2kg",
    category: "Flour",
    supplierId: "SUP001",
    unit: "Bag",
    buyingPrice: 145,
    sellingPrice: 175,
    openingStock: 80,
    reorderLevel: 30,
    reorderQty: 80,
    expiryDate: "2026-11-20"
  },
  {
    id: "P002",
    sku: "SM002",
    name: "Pishori Rice 2kg",
    category: "Grains",
    supplierId: "SUP002",
    unit: "Pack",
    buyingPrice: 310,
    sellingPrice: 370,
    openingStock: 55,
    reorderLevel: 20,
    reorderQty: 50,
    expiryDate: "2027-03-15"
  },
  {
    id: "P003",
    sku: "SM003",
    name: "Cooking Oil 1L",
    category: "Cooking",
    supplierId: "SUP003",
    unit: "Bottle",
    buyingPrice: 220,
    sellingPrice: 265,
    openingStock: 70,
    reorderLevel: 25,
    reorderQty: 60,
    expiryDate: "2027-01-10"
  },
  {
    id: "P004",
    sku: "SM004",
    name: "Fresh Milk 500ml",
    category: "Dairy",
    supplierId: "SUP004",
    unit: "Pack",
    buyingPrice: 55,
    sellingPrice: 70,
    openingStock: 100,
    reorderLevel: 35,
    reorderQty: 100,
    expiryDate: "2026-10-04"
  },
  {
    id: "P005",
    sku: "SM005",
    name: "Bread 400g",
    category: "Bakery",
    supplierId: "SUP004",
    unit: "Loaf",
    buyingPrice: 55,
    sellingPrice: 70,
    openingStock: 90,
    reorderLevel: 30,
    reorderQty: 80,
    expiryDate: "2026-09-29"
  },
  {
    id: "P006",
    sku: "SM006",
    name: "Sugar 2kg",
    category: "Groceries",
    supplierId: "SUP001",
    unit: "Pack",
    buyingPrice: 275,
    sellingPrice: 325,
    openingStock: 65,
    reorderLevel: 20,
    reorderQty: 50,
    expiryDate: ""
  },
  {
    id: "P007",
    sku: "SM007",
    name: "Tea Leaves 250g",
    category: "Beverages",
    supplierId: "SUP002",
    unit: "Pack",
    buyingPrice: 115,
    sellingPrice: 145,
    openingStock: 45,
    reorderLevel: 15,
    reorderQty: 40,
    expiryDate: "2027-05-01"
  },
  {
    id: "P008",
    sku: "SM008",
    name: "Bottled Water 1L",
    category: "Beverages",
    supplierId: "SUP005",
    unit: "Bottle",
    buyingPrice: 45,
    sellingPrice: 60,
    openingStock: 120,
    reorderLevel: 40,
    reorderQty: 120,
    expiryDate: "2028-01-12"
  },
  {
    id: "P009",
    sku: "SM009",
    name: "Bathing Soap 175g",
    category: "Personal Care",
    supplierId: "SUP003",
    unit: "Bar",
    buyingPrice: 65,
    sellingPrice: 85,
    openingStock: 50,
    reorderLevel: 15,
    reorderQty: 40,
    expiryDate: ""
  },
  {
    id: "P010",
    sku: "SM010",
    name: "Washing Powder 1kg",
    category: "Household",
    supplierId: "SUP003",
    unit: "Pack",
    buyingPrice: 180,
    sellingPrice: 225,
    openingStock: 40,
    reorderLevel: 15,
    reorderQty: 40,
    expiryDate: ""
  },
  {
    id: "P011",
    sku: "SM011",
    name: "Biscuits 100g",
    category: "Snacks",
    supplierId: "SUP002",
    unit: "Pack",
    buyingPrice: 30,
    sellingPrice: 45,
    openingStock: 85,
    reorderLevel: 25,
    reorderQty: 70,
    expiryDate: "2026-12-15"
  },
  {
    id: "P012",
    sku: "SM012",
    name: "Soda 500ml",
    category: "Beverages",
    supplierId: "SUP005",
    unit: "Bottle",
    buyingPrice: 45,
    sellingPrice: 60,
    openingStock: 75,
    reorderLevel: 25,
    reorderQty: 80,
    expiryDate: "2027-02-20"
  }
];


const DEMO_SUPPLIERS = [
  {
    id: "SUP001",
    name: "Metro Distributors",
    phone: "0712 345 678",
    category: "Groceries"
  },
  {
    id: "SUP002",
    name: "Prime Wholesale Ltd",
    phone: "0722 456 789",
    category: "Food & Beverages"
  },
  {
    id: "SUP003",
    name: "Nairobi Consumer Supplies",
    phone: "0733 567 890",
    category: "Household"
  },
  {
    id: "SUP004",
    name: "FreshLine Distributors",
    phone: "0701 678 901",
    category: "Fresh Products"
  },
  {
    id: "SUP005",
    name: "Aqua & Beverage Supplies",
    phone: "0744 789 012",
    category: "Beverages"
  }
];


const DEMO_USERS = [
  {
    id: "U001",
    name: "Demo Administrator",
    username: "admin",
    role: "admin",
    active: true
  },
  {
    id: "U002",
    name: "Demo Manager",
    username: "manager",
    role: "manager",
    active: true
  },
  {
    id: "U003",
    name: "Demo Inventory Worker",
    username: "worker",
    role: "worker",
    active: true
  },
  {
    id: "U004",
    name: "Demo Cashier",
    username: "cashier",
    role: "cashier",
    active: true
  },
  {
    id: "U005",
    name: "Demo Auditor",
    username: "auditor",
    role: "auditor",
    active: true
  }
];


/* =========================================================
   STATE
========================================================= */

let state = loadState();

let currentRole = null;
let currentUser = null;
let currentPage = "dashboard";


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  setupLogin();

  setupNavigation();

  setupGlobalButtons();

  setupToastContainer();

  /*
   * Keep the demo in login mode when the browser is opened.
   * The simulated data remains saved unless Reset Demo is used.
   */

  showLogin();

});


/* =========================================================
   STORAGE
========================================================= */

function createInitialState() {

  return {
    products: DEMO_PRODUCTS.map(p => ({ ...p })),

    suppliers: DEMO_SUPPLIERS.map(s => ({ ...s })),

    users: DEMO_USERS.map(u => ({ ...u })),

    receipts: [
      {
        id: "GR001",
        productId: "P001",
        quantity: 50,
        buyingPrice: 145,
        supplierId: "SUP001",
        batch: "MAZ-0926",
        date: "2026-09-20",
        user: "Demo Inventory Worker"
      },
      {
        id: "GR002",
        productId: "P003",
        quantity: 30,
        buyingPrice: 220,
        supplierId: "SUP003",
        batch: "OIL-0926",
        date: "2026-09-21",
        user: "Demo Inventory Worker"
      },
      {
        id: "GR003",
        productId: "P008",
        quantity: 80,
        buyingPrice: 45,
        supplierId: "SUP005",
        batch: "WTR-0926",
        date: "2026-09-22",
        user: "Demo Inventory Worker"
      }
    ],

    sales: [
      {
        id: "SL001",
        productId: "P001",
        quantity: 35,
        price: 175,
        date: "2026-09-24",
        user: "Demo Cashier"
      },
      {
        id: "SL002",
        productId: "P004",
        quantity: 62,
        price: 70,
        date: "2026-09-24",
        user: "Demo Cashier"
      },
      {
        id: "SL003",
        productId: "P005",
        quantity: 50,
        price: 70,
        date: "2026-09-24",
        user: "Demo Cashier"
      },
      {
        id: "SL004",
        productId: "P008",
        quantity: 75,
        price: 60,
        date: "2026-09-24",
        user: "Demo Cashier"
      },
      {
        id: "SL005",
        productId: "P006",
        quantity: 25,
        price: 325,
        date: "2026-09-25",
        user: "Demo Cashier"
      },
      {
        id: "SL006",
        productId: "P011",
        quantity: 58,
        price: 45,
        date: "2026-09-25",
        user: "Demo Cashier"
      }
    ],

    adjustments: [
      {
        id: "ADJ001",
        productId: "P010",
        quantity: -2,
        reason: "Damaged stock",
        date: "2026-09-24",
        user: "Demo Inventory Worker"
      }
    ],

    counts: [
      {
        id: "CNT001",
        productId: "P001",
        systemStock: 95,
        physicalCount: 93,
        variance: -2,
        date: "2026-09-24",
        user: "Demo Inventory Worker"
      },
      {
        id: "CNT002",
        productId: "P006",
        systemStock: 40,
        physicalCount: 40,
        variance: 0,
        date: "2026-09-24",
        user: "Demo Inventory Worker"
      }
    ],

    audit: [
      {
        id: "AUD001",
        date: "2026-09-20 09:14",
        user: "Demo Inventory Worker",
        role: "Inventory Worker",
        action: "Received stock",
        reference: "GR001",
        details: "Received 50 Unga Maize Flour 2kg"
      },
      {
        id: "AUD002",
        date: "2026-09-21 10:32",
        user: "Demo Inventory Worker",
        role: "Inventory Worker",
        action: "Received stock",
        reference: "GR002",
        details: "Received 30 Cooking Oil 1L"
      },
      {
        id: "AUD003",
        date: "2026-09-24 16:10",
        user: "Demo Cashier",
        role: "Cashier / Sales",
        action: "Recorded sale",
        reference: "SL003",
        details: "Sold 50 Bread 400g"
      }
    ]
  };

}


function loadState() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

  } catch (error) {

    console.warn("Could not load saved demo data.", error);

  }

  const fresh = createInitialState();

  saveState(fresh);

  return fresh;

}


function saveState(data = state) {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

  } catch (error) {

    console.warn("Could not save demo data.", error);

  }

}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

  document.querySelectorAll(".role-card").forEach(card => {

    card.addEventListener("click", () => {

      const role = card.dataset.role;

      loginAs(role);

    });

  });

}


function loginAs(role) {

  if (!ROLES[role]) return;

  currentRole = role;

  currentUser = {
    name: ROLES[role].user,
    role: role
  };

  currentPage = "dashboard";

  hideLogin();

  updateUserInterface();

  filterNavigation();

  renderPage("dashboard");

  addAudit(
    "Login",
    "SESSION",
    `Signed in as ${ROLES[role].name}`
  );

  showToast(
    `Welcome, ${ROLES[role].name}.`,
    "success"
  );

}


function showLogin() {

  const login = document.getElementById("loginScreen");
  const app = document.getElementById("appShell");

  if (login) login.classList.remove("hidden");
  if (app) app.classList.add("hidden");

}


function hideLogin() {

  const login = document.getElementById("loginScreen");
  const app = document.getElementById("appShell");

  if (login) login.classList.add("hidden");
  if (app) app.classList.remove("hidden");

}


/* =========================================================
   USER INTERFACE
========================================================= */

function updateUserInterface() {

  if (!currentUser) return;

  const role = ROLES[currentRole];

  const avatar = document.getElementById("userAvatar");
  const name = document.getElementById("currentUserName");
  const roleName = document.getElementById("currentUserRole");

  const headerName = document.getElementById("headerUserName");
  const headerRole = document.getElementById("headerUserRole");

  if (avatar) avatar.textContent = role.avatar;

  if (name) name.textContent = currentUser.name;

  if (roleName) roleName.textContent = role.name;

  if (headerName) headerName.textContent = currentUser.name;

  if (headerRole) headerRole.textContent = role.name;

}


function filterNavigation() {

  if (!currentRole) return;

  const allowed = ROLES[currentRole].pages;

  document.querySelectorAll(".nav").forEach(button => {

    const page = button.dataset.page;

    if (allowed.includes(page)) {

      button.style.display = "flex";

    } else {

      button.style.display = "none";

    }

  });

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  document.querySelectorAll(".nav").forEach(button => {

    button.addEventListener("click", () => {

      const page = button.dataset.page;

      navigate(page);

    });

  });

}


function navigate(page) {

  if (!currentRole) return;

  const allowed = ROLES[currentRole].pages;

  if (!allowed.includes(page)) {

    showToast(
      "You do not have permission to access this section.",
      "error"
    );

    return;

  }

  currentPage = page;

  document.querySelectorAll(".nav").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.page === page
    );

  });

  renderPage(page);

}


function renderPage(page) {

  const content = document.getElementById("content");
  const title = document.getElementById("pageTitle");

  if (!content) return;

  if (title) {
    title.textContent =
      PAGE_TITLES[page] || "SMARTTEC GO™";
  }

  switch (page) {

    case "dashboard":
      renderDashboard(content);
      break;

    case "products":
      renderProducts(content);
      break;

    case "receiving":
      renderReceiving(content);
      break;

    case "sales":
      renderSales(content);
      break;

    case "stock":
      renderStock(content);
      break;

    case "count":
      renderCount(content);
      break;

    case "expiry":
      renderExpiry(content);
      break;

    case "reorder":
      renderReorder(content);
      break;

    case "reports":
      renderReports(content);
      break;

    case "users":
      renderUsers(content);
      break;

    case "audit":
      renderAudit(content);
      break;

    default:
      renderDashboard(content);

  }

}


/* =========================================================
   GLOBAL BUTTONS
========================================================= */

function setupGlobalButtons() {

  const reset = document.getElementById("reset");

  if (reset) {

    reset.addEventListener("click", resetDemo);

  }


  const switchUser =
    document.getElementById("switchUser");

  if (switchUser) {

    switchUser.addEventListener("click", () => {

      addAudit(
        "Logout",
        "SESSION",
        "Switched demonstration user"
      );

      currentRole = null;
      currentUser = null;

      showLogin();

    });

  }

}


function resetDemo() {

  const confirmed = confirm(
    "Reset the SMARTTEC GO demonstration data?\n\n" +
    "All demo transactions, counts and user changes will return " +
    "to the original demonstration state."
  );

  if (!confirmed) return;

  state = createInitialState();

  saveState();

  currentPage = "dashboard";

  renderPage("dashboard");

  showToast(
    "Demo data has been reset.",
    "success"
  );

}


/* =========================================================
   INVENTORY CALCULATIONS
========================================================= */

function getReceivedQty(productId) {

  return state.receipts
    .filter(r => r.productId === productId)
    .reduce((sum, r) => sum + Number(r.quantity), 0);

}


function getSoldQty(productId) {

  return state.sales
    .filter(s => s.productId === productId)
    .reduce((sum, s) => sum + Number(s.quantity), 0);

}


function getAdjustmentQty(productId) {

  return state.adjustments
    .filter(a => a.productId === productId)
    .reduce((sum, a) => sum + Number(a.quantity), 0);

}


function getCurrentStock(productId) {

  const product = getProduct(productId);

  if (!product) return 0;

  return (
    Number(product.openingStock || 0) +
    getReceivedQty(productId) -
    getSoldQty(productId) +
    getAdjustmentQty(productId)
  );

}


function getStockValue(productId) {

  const product = getProduct(productId);

  if (!product) return 0;

  return getCurrentStock(productId) *
    Number(product.buyingPrice || 0);

}


function getRetailValue(productId) {

  const product = getProduct(productId);

  if (!product) return 0;

  return getCurrentStock(productId) *
    Number(product.sellingPrice || 0);

}


function getProduct(productId) {

  return state.products.find(
    p => p.id === productId
  );

}


function getSupplier(supplierId) {

  return state.suppliers.find(
    s => s.id === supplierId
  );

}


function getStockStatus(product) {

  const qty = getCurrentStock(product.id);

  if (qty <= 0) {
    return {
      label: "Out of Stock",
      className: "status-danger"
    };
  }

  if (qty <= product.reorderLevel) {
    return {
      label: "Reorder",
      className: "status-warning"
    };
  }

  return {
    label: "In Stock",
    className: "status-ok"
  };

}


function getExpiryInfo(product) {

  if (!product.expiryDate) {

    return {
      label: "No Expiry",
      className: "status-info",
      days: null
    };

  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const expiry = new Date(
    product.expiryDate + "T00:00:00"
  );

  const days =
    Math.ceil(
      (expiry - today) /
      (1000 * 60 * 60 * 24)
    );

  if (days < 0) {

    return {
      label: "Expired",
      className: "status-danger",
      days
    };

  }

  if (days <= 3) {

    return {
      label: "Urgent",
      className: "status-danger",
      days
    };

  }

  if (days <= 14) {

    return {
      label: "Expiring Soon",
      className: "status-warning",
      days
    };

  }

  return {
    label: "OK",
    className: "status-ok",
    days
  };

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard(content) {

  const totalSKUs = state.products.length;

  const stockCost = state.products.reduce(
    (sum, p) => sum + getStockValue(p.id),
    0
  );
  const retailValue = state.products.reduce(
    (sum, p) => sum + getRetailValue(p.id),
    0
  );

  const today = todayISO();

  const todaySales = state.sales
    .filter(s => s.date === today)
    .reduce(
      (sum, s) =>
        sum + Number(s.quantity) * Number(s.price),
      0
    );

  const reorderItems =
    state.products.filter(
      p => getCurrentStock(p.id) <= p.reorderLevel
    ).length;

  const outOfStock =
    state.products.filter(
      p => getCurrentStock(p.id) <= 0
    ).length;

  const expiring =
    state.products.filter(p => {

      const e = getExpiryInfo(p);

      return (
        e.days !== null &&
        e.days <= 14
      );

    }).length;

  const varianceItems =
    state.counts.filter(
      c => Number(c.variance) !== 0
    ).length;


  content.innerHTML = `

    <div class="kpi-grid">

      ${kpi(
        "Total SKUs",
        formatNumber(totalSKUs),
        "Products in master",
        ""
      )}

      ${kpi(
        "Stock Cost Value",
        money(stockCost),
        "Current inventory cost",
        ""
      )}

      ${kpi(
        "Retail Value",
        money(retailValue),
        "Potential selling value",
        "success"
      )}

      ${kpi(
        "Today's Sales",
        money(todaySales),
        "Recorded sales today",
        ""
      )}

      ${kpi(
        "Reorder Items",
        formatNumber(reorderItems),
        "At or below reorder level",
        "warning"
      )}

      ${kpi(
        "Out of Stock",
        formatNumber(outOfStock),
        "Items requiring attention",
        "danger"
      )}

      ${kpi(
        "Expiring Soon",
        formatNumber(expiring),
        "Within 14 days",
        "warning"
      )}

      ${kpi(
        "Stock Variances",
        formatNumber(varianceItems),
        "Unresolved count differences",
        "danger"
      )}

    </div>


    <div class="dashboard-grid">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Stock Requiring Attention</h3>
            <p>Items approaching reorder level</p>
          </div>

          <button
            class="btn btn-secondary"
            onclick="navigate('reorder')"
          >
            View Reorder
          </button>

        </div>

        <div class="card-body">

          ${renderAttentionTable()}

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Expiry Monitor</h3>
            <p>Products requiring attention</p>
          </div>

          <button
            class="btn btn-secondary"
            onclick="navigate('expiry')"
          >
            View All
          </button>

        </div>

        <div class="card-body">

          ${renderExpiryMini()}

        </div>

      </div>

    </div>


    <div style="height:17px"></div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Recent Activity</h3>
            <p>Latest recorded system actions</p>
          </div>

        </div>

        <div class="card-body">

          ${renderRecentAudit(6)}

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Quick Actions</h3>
            <p>Common operational activities</p>
          </div>

        </div>

        <div class="card-body">

          <div class="grid-2">

            ${
              canAccess("receiving")
                ? `
                  <button
                    class="btn btn-primary"
                    onclick="navigate('receiving')"
                  >
                    ⇩ Receive Stock
                  </button>
                `
                : ""
            }

            ${
              canAccess("sales")
                ? `
                  <button
                    class="btn btn-gold"
                    onclick="navigate('sales')"
                  >
                    ⇧ Record Sale
                  </button>
                `
                : ""
            }

            ${
              canAccess("count")
                ? `
                  <button
                    class="btn btn-secondary"
                    onclick="navigate('count')"
                  >
                    ☷ Stock Count
                  </button>
                `
                : ""
            }

            ${
              canAccess("reports")
                ? `
                  <button
                    class="btn btn-secondary"
                    onclick="navigate('reports')"
                  >
                    ▤ Reports
                  </button>
                `
                : ""
            }

          </div>

        </div>

      </div>

    </div>

  `;

}


function kpi(label, value, note, type) {

  return `
    <div class="kpi ${type || ""}">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-note">${note}</div>
    </div>
  `;

}


function renderAttentionTable() {

  const items = state.products
    .filter(
      p => getCurrentStock(p.id) <= p.reorderLevel
    )
    .slice(0, 6);

  if (!items.length) {

    return `
      <div class="empty-state">
        <div class="empty-state-icon">✓</div>
        <strong>Stock levels are healthy</strong>
        <p>No products currently require reorder.</p>
      </div>
    `;

  }

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Reorder Level</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          ${items.map(p => {

            const qty = getCurrentStock(p.id);
            const status = getStockStatus(p);

            return `
              <tr>
                <td>
                  <strong>${escapeHTML(p.name)}</strong>
                </td>

                <td>${qty}</td>

                <td>${p.reorderLevel}</td>

                <td>
                  <span class="status ${status.className}">
                    ${status.label}
                  </span>
                </td>
              </tr>
            `;

          }).join("")}

        </tbody>
      </table>
    </div>
  `;

}


function renderExpiryMini() {

  const items = state.products
    .filter(p => {

      const e = getExpiryInfo(p);

      return (
        e.days !== null &&
        e.days <= 14
      );

    })
    .slice(0, 5);

  if (!items.length) {

    return `
      <div class="empty-state">
        <div class="empty-state-icon">✓</div>
        <strong>No immediate expiry concerns</strong>
        <p>No products expire within 14 days.</p>
      </div>
    `;

  }

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Expiry</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          ${items.map(p => {

            const e = getExpiryInfo(p);

            return `
              <tr>
                <td>${escapeHTML(p.name)}</td>
                <td>${formatDate(p.expiryDate)}</td>
                <td>
                  <span class="status ${e.className}">
                    ${e.label}
                  </span>
                </td>
              </tr>
            `;

          }).join("")}
          
        </tbody>
      </table>
    </div>
  `;

}
/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts(content) {

  content.innerHTML = `

    <div class="toolbar">

      <div class="toolbar-left">

        <input
          class="search-box"
          id="productSearch"
          type="search"
          placeholder="Search products..."
        >

        <select id="categoryFilter">
          <option value="">All Categories</option>
          ${getCategories().map(
            c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`
          ).join("")}
        </select>

      </div>


      <div class="toolbar-right">

        ${
          canModifyProducts()
            ? `
              <button
                class="btn btn-primary"
                id="addProductBtn"
              >
                + Add Product
              </button>
            `
            : ""
        }

      </div>

    </div>


    <div class="card">

      <div class="card-header">

        <div>
          <h3>Product Master</h3>
          <p>Products, pricing, suppliers and reorder settings</p>
        </div>

      </div>

      <div class="card-body">

        <div id="productsTable"></div>

      </div>

    </div>

  `;


  const search =
    document.getElementById("productSearch");

  const category =
    document.getElementById("categoryFilter");


  function refresh() {

    const query =
      search.value.trim().toLowerCase();

    const cat = category.value;

    const products =
      state.products.filter(p => {

        const matchesQuery =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query);

        const matchesCategory =
          !cat || p.category === cat;

        return matchesQuery && matchesCategory;

      });

    renderProductsTable(
      document.getElementById("productsTable"),
      products
    );

  }


  search.addEventListener("input", refresh);

  category.addEventListener("change", refresh);

  const addBtn =
    document.getElementById("addProductBtn");

  if (addBtn) {

    addBtn.addEventListener(
      "click",
      showAddProductModal
    );

  }

  refresh();

}


function renderProductsTable(container, products) {

  if (!products.length) {

    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⌕</div>
        <strong>No products found</strong>
        <p>Try a different search or category.</p>
      </div>
    `;

    return;

  }

  container.innerHTML = `

    <div class="table-wrap">

      <table>

        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          ${products.map(p => {

            const supplier =
              getSupplier(p.supplierId);

            const status =
              getStockStatus(p);

            return `
              <tr>

                <td>${escapeHTML(p.sku)}</td>

                <td>
                  <strong>${escapeHTML(p.name)}</strong>
                </td>

                <td>${escapeHTML(p.category)}</td>

                <td>
                  ${supplier
                    ? escapeHTML(supplier.name)
                    : "—"}
                </td>

                <td>${money(p.buyingPrice)}</td>

                <td>${money(p.sellingPrice)}</td>

                <td>
                  <strong>${getCurrentStock(p.id)}</strong>
                </td>

                <td>
                  <span class="status ${status.className}">
                    ${status.label}
                  </span>
                </td>

                <td>

                  ${
                    canModifyProducts()
                      ? `
                        <button
                          class="btn btn-secondary"
                          onclick="showEditProductModal('${p.id}')"
                        >
                          Edit
                        </button>
                      `
                      : `
                        <button
                          class="btn btn-secondary"
                          onclick="showProductDetails('${p.id}')"
                        >
                          View
                        </button>
                      `
                  }

                </td>

              </tr>
            `;

          }).join("")}

        </tbody>

      </table>

    </div>

  `;

}


function getCategories() {

  return [
    ...new Set(
      state.products.map(p => p.category)
    )
  ].sort();

}


/* =========================================================
   RECEIVE STOCK
========================================================= */

function renderReceiving(content) {

  if (!canAccess("receiving")) {

    renderNoAccess(content);

    return;

  }

  content.innerHTML = `

    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Receive Stock</h3>
            <p>Record goods received from suppliers</p>
          </div>

        </div>

        <div class="card-body">

          <form id="receiveForm">

            <div class="form-grid">

              <div class="form-group full">
                <label>Product</label>

                <select id="receiveProduct" required>
                  <option value="">Select product</option>

                  ${state.products.map(p =>
                    `<option value="${p.id}">
                      ${escapeHTML(p.name)}
                    </option>`
                  ).join("")}

                </select>
              </div>


              <div class="form-group">
                <label>Quantity Received</label>

                <input
                  id="receiveQuantity"
                  type="number"
                  min="1"
                  required
                >
              </div>


              <div class="form-group">
                <label>Buying Price / Unit</label>

                <input
                  id="receivePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                >
              </div>


              <div class="form-group">
                <label>Supplier</label>

                <select id="receiveSupplier" required>

                  <option value="">
                    Select supplier
                  </option>

                  ${state.suppliers.map(s =>
                    `<option value="${s.id}">
                      ${escapeHTML(s.name)}
                    </option>`
                  ).join("")}

                </select>

              </div>


              <div class="form-group">
                <label>Batch / Reference</label>

                <input
                  id="receiveBatch"
                  type="text"
                  placeholder="e.g. GRN-0926"
                >
              </div>

            </div>


            <div class="form-actions">

              <button
                class="btn btn-primary"
                type="submit"
              >
                Record Goods Received
              </button>

            </div>

          </form>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Recent Receipts</h3>
            <p>Latest goods received</p>
          </div>

        </div>

        <div class="card-body">

          ${renderReceiptsTable(8)}

        </div>

      </div>

    </div>

  `;


  document
    .getElementById("receiveForm")
    .addEventListener(
      "submit",
      recordReceipt
    );

}


/* =========================================================
   RECORD RECEIPT
========================================================= */

function recordReceipt(event) {

  event.preventDefault();

  const productId =
    document.getElementById("receiveProduct").value;

  const quantity =
    Number(
      document.getElementById("receiveQuantity").value
    );

  const price =
    Number(
      document.getElementById("receivePrice").value
    );

  const supplierId =
    document.getElementById("receiveSupplier").value;

  const batch =
    document.getElementById("receiveBatch").value.trim();


  if (!productId || quantity <= 0 || price < 0) {

    showToast(
      "Please enter valid receiving details.",
      "error"
    );

    return;

  }


  const product =
    getProduct(productId);

  const id =
    nextId("GR", state.receipts);


  state.receipts.unshift({

    id,
    productId,
    quantity,
    buyingPrice: price,
    supplierId,
    batch,
    date: todayISO(),
    user: currentUser.name

  });


  /*
   * Keep the product's current buying price updated
   * for future valuation.
   */

  product.buyingPrice = price;


  addAudit(
    "Received stock",
    id,
    `Received ${quantity} ${product.name}`
  );


  saveState();

  showToast(
    `${quantity} units of ${product.name} received.`,
    "success"
  );


  renderReceiving(
    document.getElementById("content")
  );

}


/* =========================================================
   SALES
========================================================= */

function renderSales(content) {

  if (!canAccess("sales")) {

    renderNoAccess(content);

    return;

  }

  content.innerHTML = `

    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Record Sale</h3>
            <p>Reduce inventory through a recorded sale</p>
          </div>

        </div>

        <div class="card-body">

          <form id="saleForm">

            <div class="form-grid">

              <div class="form-group full">

                <label>Product</label>

                <select id="saleProduct" required>

                  <option value="">
                    Select product
                  </option>

                  ${state.products.map(p => `
                    <option value="${p.id}">
                      ${escapeHTML(p.name)}
                      — Stock: ${getCurrentStock(p.id)}
                    </option>
                  `).join("")}

                </select>

              </div>


              <div class="form-group">

                <label>Quantity Sold</label>

                <input
                  id="saleQuantity"
                  type="number"
                  min="1"
                  required
                >

              </div>


              <div class="form-group">

                <label>Selling Price / Unit</label>

                <input
                  id="salePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                >

              </div>

            </div>


            <div class="form-actions">

              <button
                class="btn btn-gold"
                type="submit"
              >
                Record Sale
              </button>

            </div>

          </form>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Recent Sales</h3>
            <p>Latest recorded transactions</p>
          </div>

        </div>

        <div class="card-body">

          ${renderSalesTable(8)}

        </div>

      </div>

    </div>

  `;


  const productSelect =
    document.getElementById("saleProduct");

  const priceInput =
    document.getElementById("salePrice");


  productSelect.addEventListener(
    "change",
    () => {

      const product =
        getProduct(productSelect.value);

      if (product) {

        priceInput.value =
          product.sellingPrice;

      }

    }
  );


  document
    .getElementById("saleForm")
    .addEventListener(
      "submit",
      recordSale
    );

}


/* =========================================================
   RECORD SALE
========================================================= */

function recordSale(event) {

  event.preventDefault();

  const productId =
    document.getElementById("saleProduct").value;

  const quantity =
    Number(
      document.getElementById("saleQuantity").value
    );

  const price =
    Number(
      document.getElementById("salePrice").value
    );


  const product =
    getProduct(productId);

  if (!product || quantity <= 0 || price < 0) {

    showToast(
      "Please enter valid sale details.",
      "error"
    );

    return;

  }


  const available =
    getCurrentStock(productId);


  if (quantity > available) {

    showToast(
      `Insufficient stock. Available: ${available}.`,
      "error"
    );

    return;

  }


  const id =
    nextId("SL", state.sales);


  state.sales.unshift({

    id,
    productId,
    quantity,
    price,
    date: todayISO(),
    user: currentUser.name

  });


  addAudit(
    "Recorded sale",
    id,
    `Sold ${quantity} ${product.name}`
  );


  saveState();

  showToast(
    `Sale recorded. ${product.name} stock reduced by ${quantity}.`,
    "success"
  );


  renderSales(
    document.getElementById("content")
  );

}


/* =========================================================
   LIVE STOCK
========================================================= */

function renderStock(content) {

  content.innerHTML = `

    <div class="toolbar">

      <div class="toolbar-left">

        <input
          class="search-box"
          id="stockSearch"
          type="search"
          placeholder="Search stock..."
        >

        <select id="stockStatusFilter">
          <option value="">All Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Reorder">Reorder</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

      </div>

    </div>


    <div class="card">

      <div class="card-header">

        <div>
          <h3>Live Stock Position</h3>
          <p>
            Opening + Received − Sales ± Adjustments
          </p>
        </div>

      </div>

      <div class="card-body">

        <div id="stockTable"></div>

      </div>

    </div>

  `;


  const search =
    document.getElementById("stockSearch");

  const filter =
    document.getElementById("stockStatusFilter");


  function refresh() {

    const q =
      search.value.trim().toLowerCase();

    const statusFilter =
      filter.value;


    const products =
      state.products.filter(p => {

        const status =
          getStockStatus(p).label;

        const matchSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q);

        const matchStatus =
          !statusFilter ||
          status === statusFilter;

        return matchSearch && matchStatus;

      });


    renderStockTable(
      document.getElementById("stockTable"),
      products
    );

  }


  search.addEventListener("input", refresh);

  filter.addEventListener("change", refresh);

  refresh();

}


function renderStockTable(container, products) {

  container.innerHTML = `

    <div class="table-wrap">

      <table>

        <thead>

          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Opening</th>
            <th>Received</th>
            <th>Sold</th>
            <th>Adjustments</th>
            <th>Current</th>
            <th>Reorder</th>
            <th>Value</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          ${products.map(p => {

            const received =
              getReceivedQty(p.id);

            const sold =
              getSoldQty(p.id);

            const adjustment =
              getAdjustmentQty(p.id);

            const current =
              getCurrentStock(p.id);

            const status =
              getStockStatus(p);

            return `
              <tr>

                <td>${escapeHTML(p.sku)}</td>

                <td>
                  <strong>${escapeHTML(p.name)}</strong>
                </td>

                <td>${p.openingStock}</td>

                <td>${received}</td>

                <td>${sold}</td>

                <td>${adjustment}</td>

                <td>
                  <strong>${current}</strong>
                </td>

                <td>${p.reorderLevel}</td>

                <td>${money(getStockValue(p.id))}</td>

                <td>
                  <span class="status ${status.className}">
                    ${status.label}
                  </span>
                </td>

              </tr>
            `;

          }).join("")}

        </tbody>

      </table>

    </div>

  `;

}

/* =========================================================
   STOCK COUNT
========================================================= */

function renderCount(content) {

  if (!canAccess("count")) {

    renderNoAccess(content);

    return;

  }


  content.innerHTML = `

    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Physical Stock Count</h3>
            <p>Compare physical quantity with system stock</p>
          </div>

        </div>

        <div class="card-body">

          <form id="countForm">

            <div class="form-group">

              <label>Product</label>

              <select id="countProduct" required>

                <option value="">
                  Select product
                </option>

                ${state.products.map(p => `
                  <option value="${p.id}">
                    ${escapeHTML(p.name)}
                    — System: ${getCurrentStock(p.id)}
                  </option>
                `).join("")}

              </select>

            </div>


            <div class="form-group" style="margin-top:13px">

              <label>Physical Count</label>

              <input
                id="physicalCount"
                type="number"
                min="0"
                required
              >

            </div>


            <div class="form-actions">

              <button
                class="btn btn-primary"
                type="submit"
              >
                Record Count
              </button>

            </div>

          </form>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Recent Counts</h3>
            <p>Physical versus system stock</p>
          </div>

        </div>

        <div class="card-body">

          ${renderCountsTable()}

        </div>

      </div>

    </div>

  `;


  document
    .getElementById("countForm")
    .addEventListener(
      "submit",
      recordCount
    );

}


function recordCount(event) {

  event.preventDefault();

  const productId =
    document.getElementById("countProduct").value;

  const physical =
    Number(
      document.getElementById("physicalCount").value
    );


  const product =
    getProduct(productId);


  if (!product || physical < 0) {

    showToast(
      "Please enter a valid physical count.",
      "error"
    );

    return;

  }


  const system =
    getCurrentStock(productId);

  const variance =
    physical - system;


  const id =
    nextId("CNT", state.counts);


  state.counts.unshift({

    id,
    productId,
    systemStock: system,
    physicalCount: physical,
    variance,
    date: todayISO(),
    user: currentUser.name

  });


  addAudit(
    "Stock count",
    id,
    `${product.name}: system ${system}, physical ${physical}, variance ${variance}`
  );


  saveState();


  showToast(
    variance === 0
      ? "Count recorded. No variance."
      : `Count recorded. Variance: ${variance}.`,
    variance === 0 ? "success" : "warning"
  );


  renderCount(
    document.getElementById("content")
  );

}


function renderCountsTable() {

  if (!state.counts.length) {

    return `
      <div class="empty-state">
        <strong>No counts recorded</strong>
      </div>
    `;

  }


  return `
    <div class="table-wrap">

      <table>

        <thead>

          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>System</th>
            <th>Physical</th>
            <th>Variance</th>
            <th>User</th>
          </tr>

        </thead>

        <tbody>

          ${state.counts.slice(0, 12).map(c => {

            const product =
              getProduct(c.productId);

            const variance =
              Number(c.variance);

            return `
              <tr>

                <td>${formatDate(c.date)}</td>

                <td>
                  ${product
                    ? escapeHTML(product.name)
                    : "Unknown"}
                </td>

                <td>${c.systemStock}</td>

                <td>${c.physicalCount}</td>

                <td>
                  <span class="status ${
                    variance === 0
                      ? "status-ok"
                      : "status-danger"
                  }">
                    ${variance > 0 ? "+" : ""}
                    ${variance}
                  </span>
                </td>

                <td>${escapeHTML(c.user)}</td>

              </tr>
            `;

          }).join("")}

        </tbody>

      </table>

    </div>
  `;

}


/* =========================================================
   EXPIRY
========================================================= */

function renderExpiry(content) {

  content.innerHTML = `

    <div class="card">

      <div class="card-header">

        <div>
          <h3>Expiry Monitor</h3>
          <p>FEFO-focused visibility of products approaching expiry</p>
        </div>

      </div>

      <div class="card-body">

        <div class="table-wrap">

          <table>

            <thead>

              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Expiry Date</th>
                <th>Days Remaining</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              ${state.products
                .filter(p => p.expiryDate)
                .sort((a, b) =>
                  a.expiryDate.localeCompare(
                    b.expiryDate
                  )
                )
                .map(p => {

                  const e =
                    getExpiryInfo(p);

                  return `
                    <tr>

                      <td>
                        <strong>
                          ${escapeHTML(p.name)}
                        </strong>
                      </td>

                      <td>
                        ${escapeHTML(p.category)}
                      </td>

                      <td>
                        ${getCurrentStock(p.id)}
                      </td>

                      <td>
                        ${formatDate(p.expiryDate)}
                      </td>

                      <td>
                        ${
                          e.days === null
                            ? "—"
                            : e.days
                        }
                      </td>

                      <td>
                        <span class="status ${e.className}">
                          ${e.label}
                        </span>
                      </td>

                    </tr>
                  `;

                }).join("")}

            </tbody>

          </table>

        </div>


      </div>

    </div>

  `;

            }

/* =========================================================
   REORDER
========================================================= */

function renderReorder(content) {

  content.innerHTML = `

    <div class="card">

      <div class="card-header">

        <div>
          <h3>Reorder Queue</h3>
          <p>
            Products at or below their configured reorder level
          </p>
        </div>

        <button
          class="btn btn-primary"
          onclick="createPurchaseDraft()"
        >
          Generate Purchase Draft
        </button>

      </div>

      <div class="card-body">

        ${renderReorderTable()}

      </div>

    </div>

  `;

}


function renderReorderTable() {

  const items =
    state.products.filter(
      p => getCurrentStock(p.id) <= p.reorderLevel
    );


  if (!items.length) {

    return `
      <div class="empty-state">

        <div class="empty-state-icon">
          ✓
        </div>

        <strong>
          No reorder items
        </strong>

        <p>
          Current stock is above configured reorder levels.
        </p>

      </div>
    `;

  }


  return `
    <div class="table-wrap">

      <table>

        <thead>

          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
            <th>Suggested Qty</th>
            <th>Est. Purchase</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          ${items.map(p => {

            const current =
              getCurrentStock(p.id);

            const supplier =
              getSupplier(p.supplierId);

            const estimated =
              p.reorderQty * p.buyingPrice;

            return `
              <tr>

                <td>
                  <strong>
                    ${escapeHTML(p.name)}
                  </strong>
                </td>

                <td>
                  ${
                    supplier
                      ? escapeHTML(supplier.name)
                      : "—"
                  }
                </td>

                <td>${current}</td>

                <td>${p.reorderLevel}</td>

                <td>${p.reorderQty}</td>

                <td>${money(estimated)}</td>

                <td>
                  <span class="status status-warning">
                    Reorder
                  </span>
                </td>

              </tr>
            `;

          }).join("")}

        </tbody>

      </table>

    </div>
  `;

}


function createPurchaseDraft() {

  const items =
    state.products.filter(
      p => getCurrentStock(p.id) <= p.reorderLevel
    );


  if (!items.length) {

    showToast(
      "There are no items requiring reorder.",
      "warning"
    );

    return;

  }


  const total =
    items.reduce(
      (sum, p) =>
        sum + p.reorderQty * p.buyingPrice,
      0
    );


  showModal(
    "Suggested Purchase Draft",
    `
      <div class="alert alert-info">
        This is a demonstration purchase recommendation.
        No real purchase order is being placed.
      </div>

      <div style="height:13px"></div>

      ${items.map(p => {

        const supplier =
          getSupplier(p.supplierId);

        return `
          <div style="
            padding:10px 0;
            border-bottom:1px solid #e4e8ef;
          ">

            <strong>
              ${escapeHTML(p.name)}
            </strong>

            <div style="
              margin-top:4px;
              color:#667085;
              font-size:10px;
            ">
              Supplier:
              ${
                supplier
                  ? escapeHTML(supplier.name)
                  : "—"
              }
              • Qty:
              ${p.reorderQty}
              • Estimated:
              ${money(p.reorderQty * p.buyingPrice)}
            </div>

          </div>
        `;

      }).join("")}

      <div style="
        margin-top:15px;
        font-weight:800;
        color:#002b5b;
      ">
        Estimated Purchase Value:
        ${money(total)}
      </div>
    `
  );

}


/* =========================================================
   REPORTS
========================================================= */

function renderReports(content) {

  const stockCost =
    state.products.reduce(
      (sum, p) => sum + getStockValue(p.id),
      0
    );

  const retail =
    state.products.reduce(
      (sum, p) => sum + getRetailValue(p.id),
      0
    );

  const totalSales =
    state.sales.reduce(
      (sum, s) =>
        sum + Number(s.quantity) * Number(s.price),
      0
    );

  const totalUnitsSold =
    state.sales.reduce(
      (sum, s) => sum + Number(s.quantity),
      0
    );

  const totalReceived =
    state.receipts.reduce(
      (sum, r) => sum + Number(r.quantity),
      0
    );


  content.innerHTML = `

    <div class="kpi-grid">

      ${kpi(
        "Inventory Cost",
        money(stockCost),
        "Current stock valuation",
        ""
      )}

      ${kpi(
        "Retail Value",
        money(retail),
        "Potential sales value",
        "success"
      )}

      ${kpi(
        "Sales Value",
        money(totalSales),
        "All demo sales",
        ""
      )}

      ${kpi(
        "Units Sold",
        formatNumber(totalUnitsSold),
        "Across recorded transactions",
        ""
      )}

    </div>


    <div class="grid-2">

      <div class="card">

        <div class="card-header">

          <div>
            <h3>Inventory Summary</h3>
            <p>Current inventory position</p>
          </div>

        </div>

        <div class="card-body">

          <div class="table-wrap">

            <table>

              <tbody>

                <tr>
                  <td>Total SKUs</td>
                  <td>
                    <strong>${state.products.length}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Total Units Received</td>
                  <td>
                    <strong>${totalReceived}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Total Units Sold</td>
                  <td>
                    <strong>${totalUnitsSold}</strong>
                  </td>
                </tr>

                <tr>
                  <td>Reorder Items</td>
                  <td>
                    <strong>
                      ${
                        state.products.filter(
                          p =>
                            getCurrentStock(p.id)
                            <= p.reorderLevel
                        ).length
                      }
                    </strong>
                  </td>
                </tr>

                <tr>
                  <td>Out of Stock</td>
                  <td>
                    <strong>
                      ${
                        state.products.filter(
                          p =>
                            getCurrentStock(p.id) <= 0
                        ).length
                      }
                    </strong>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>


      <div class="card">

        <div class="card-header">

          <div>
            <h3>Sales Summary</h3>
            <p>Recorded demonstration sales</p>
          </div>

        </div>

        <div class="card-body">

          ${renderSalesTable(10)}

        </div>

      </div>

    </div>


    <div style="height:17px"></div>


    <div class="card">

      <div class="card-header">

        <div>
          <h3>Management Note</h3>
          <p>How SMARTTEC GO interprets inventory data</p>
        </div>

      </div>

      <div class="card-body">

        <div class="alert alert-info">

          <strong>Core stock formula:</strong>

          Current Stock =
          Opening Stock +
          Goods Received −
          Sales ±
          Adjustments.

          <br><br>

          <strong>Variance formula:</strong>

          Physical Count −
          System Stock.

          <br><br>

          <strong>Reorder trigger:</strong>

          Current Stock ≤ Reorder Level.

        </div>

      </div>

    </div>

  `;

                  }
/* =========================================================
   USER MANAGEMENT
========================================================= */

function renderUsers(content) {

  if (currentRole !== "admin") {

    renderNoAccess(content);

    return;

  }


  content.innerHTML = `

    <div class="toolbar">

      <div>
        <strong>
          System Users
        </strong>
      </div>

      <button
        class="btn btn-primary"
        onclick="showAddUserModal()"
      >
        + Add User
      </button>

    </div>


    <div class="card">

      <div class="card-header">

        <div>
          <h3>User Management</h3>
          <p>Manage demonstration users and roles</p>
        </div>

      </div>

      <div class="card-body">

        <div class="table-wrap">

          <table>

            <thead>

              <tr>
                <th>User</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              ${state.users.map(u => `

                <tr>

                  <td>
                    <strong>
                      ${escapeHTML(u.name)}
                    </strong>
                  </td>

                  <td>
                    ${escapeHTML(u.username)}
                  </td>

                  <td>
                    ${escapeHTML(
                      ROLES[u.role]
                        ? ROLES[u.role].name
                        : u.role
                    )}
                  </td>

                  <td>

                    <span class="status ${
                      u.active
                        ? "status-ok"
                        : "status-danger"
                    }">

                      ${u.active
                        ? "Active"
                        : "Inactive"}

                    </span>

                  </td>

                  <td>

                    <button
                      class="btn btn-secondary"
                      onclick="toggleUser('${u.id}')"
                    >
                      ${
                        u.active
                          ? "Deactivate"
                          : "Activate"
                      }
                    </button>

                  </td>

                </tr>

              `).join("")}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  `;

}


function showAddUserModal() {

  showModal(
    "Add Demonstration User",
    `

      <form id="addUserForm">

        <div class="form-group">

          <label>Full Name</label>

          <input
            id="newUserName"
            required
          >

        </div>


        <div class="form-group" style="margin-top:12px">

          <label>Username</label>

          <input
            id="newUsername"
            required
          >

        </div>


        <div class="form-group" style="margin-top:12px">

          <label>Role</label>

          <select id="newUserRole" required>

            <option value="admin">
              Administrator
            </option>

            <option value="manager">
              Manager
            </option>

            <option value="worker">
              Inventory Worker
            </option>

            <option value="cashier">
              Cashier / Sales
            </option>

            <option value="auditor">
              Auditor
            </option>

          </select>

        </div>


        <div class="form-actions">

          <button
            class="btn btn-primary"
            type="submit"
          >
            Add User
          </button>

        </div>

      </form>

    `
  );


  document
    .getElementById("addUserForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const name =
          document.getElementById("newUserName")
            .value.trim();

        const username =
          document.getElementById("newUsername")
            .value.trim();

        const role =
          document.getElementById("newUserRole")
            .value;


        if (!name || !username) return;


        if (
          state.users.some(
            u =>
              u.username.toLowerCase()
              === username.toLowerCase()
          )
        ) {

          showToast(
            "Username already exists.",
            "error"
          );

          return;

        }


        state.users.push({

          id: nextId("U", state.users),

          name,
          username,
          role,
          active: true

        });


        addAudit(
          "Created user",
          username,
          `${name} added as ${ROLES[role].name}`
        );


        saveState();

        closeModal();

        showToast(
          `${name} added successfully.`,
          "success"
        );


        renderUsers(
          document.getElementById("content")
        );

      }
    );

}


function toggleUser(id) {

  const user =
    state.users.find(
      u => u.id === id
    );

  if (!user) return;


  user.active =
    !user.active;


  addAudit(
    user.active
      ? "Activated user"
      : "Deactivated user",
    user.username,
    user.name
  );


  saveState();


  showToast(
    `${user.name} is now ${
      user.active
        ? "active"
        : "inactive"
    }.`,
    "success"
  );


  renderUsers(
    document.getElementById("content")
  );

}


/* =========================================================
   AUDIT TRAIL
========================================================= */

function renderAudit(content) {

  content.innerHTML = `

    <div class="card">

      <div class="card-header">

        <div>
          <h3>Audit Trail</h3>
          <p>
            Recorded demonstration activity and accountability
          </p>
        </div>

      </div>

      <div class="card-body">

        ${renderAuditTable()}

      </div>

    </div>

  `;

}


function renderAuditTable() {

  if (!state.audit.length) {

    return `
      <div class="empty-state">
        <strong>No audit activity</strong>
      </div>
    `;

  }


  return `
    <div class="table-wrap">

      <table>

        <thead>

          <tr>
            <th>Date / Time</th>
            <th>User</th>
            <th>Role</th>
            <th>Action</th>
            <th>Reference</th>
            <th>Details</th>
          </tr>

        </thead>

        <tbody>

          ${state.audit.map(a => `

            <tr>

              <td>
                ${escapeHTML(a.date)}
              </td>

              <td>
                ${escapeHTML(a.user)}
              </td>

              <td>
                ${escapeHTML(a.role)}
              </td>

              <td>
                <strong>
                  ${escapeHTML(a.action)}
                </strong>
              </td>

              <td>
                ${escapeHTML(a.reference)}
              </td>

              <td>
                ${escapeHTML(a.details)}
              </td>

            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>
  `;

}


function renderRecentAudit(limit) {

  const records =
    state.audit.slice(0, limit);


  if (!records.length) {

    return `
      <div class="empty-state">
        <strong>No activity recorded</strong>
      </div>
    `;

  }


  return `
    <div>

      ${records.map(a => `

        <div style="
          padding:10px 0;
          border-bottom:1px solid #edf0f4;
        ">

          <strong style="
            display:block;
            color:#002b5b;
            font-size:10px;
          ">
            ${escapeHTML(a.action)}
          </strong>

          <span style="
            display:block;
            margin-top:3px;
            color:#667085;
            font-size:9px;
          ">
            ${escapeHTML(a.details)}
          </span>

          <span style="
            display:block;
            margin-top:3px;
            color:#98a2b3;
            font-size:8px;
          ">
            ${escapeHTML(a.user)}
            •
            ${escapeHTML(a.date)}
          </span>

        </div>

      `).join("")}

    </div>
  `;

}


function addAudit(action, reference, details) {

  const now =
    new Date();


  const date =
    now.toLocaleDateString("en-KE") +
    " " +
    now.toLocaleTimeString(
      "en-KE",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );


  state.audit.unshift({

    id: nextId("AUD", state.audit),

    date,

    user:
      currentUser
        ? currentUser.name
        : "System",

    role:
      currentUser && ROLES[currentRole]
        ? ROLES[currentRole].name
        : "System",

    action,

    reference,

    details

  });


  /*
   * Keep the demo manageable.
   */

  if (state.audit.length > 200) {

    state.audit =
      state.audit.slice(0, 200);

  }

}


/* =========================================================
   RECEIPTS TABLE
========================================================= */

function renderReceiptsTable(limit = 10) {

  const receipts =
    state.receipts.slice(0, limit);


  if (!receipts.length) {

    return `
      <div class="empty-state">
        <strong>No receipts recorded</strong>
      </div>
    `;

  }


  return `
    <div class="table-wrap">

      <table>

        <thead>

          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Supplier</th>
          </tr>

        </thead>

        <tbody>

          ${receipts.map(r => {

            const p =
              getProduct(r.productId);

            const s =
              getSupplier(r.supplierId);

            return `
              <tr>

                <td>${formatDate(r.date)}</td>

                <td>
                  ${
                    p
                      ? escapeHTML(p.name)
                      : "Unknown"
                  }
                </td>

                <td>${r.quantity}</td>

                <td>
                  ${
                    s
                      ? escapeHTML(s.name)
                      : "—"
                  }
                </td>

              </tr>
            `;

          }).join("")}

        </tbody>
      </table>

    </div>
  `;

}
/* =========================================================
   SALES TABLE
========================================================= */

function renderSalesTable(limit = 10) {

  const sales =
    state.sales.slice(0, limit);


  if (!sales.length) {

    return `
      <div class="empty-state">
        <strong>No sales recorded</strong>
      </div>
    `;

  }


  return `
    <div class="table-wrap">

      <table>

        <thead>

          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Value</th>
          </tr>

        </thead>

        <tbody>

          ${sales.map(s => {

            const p =
              getProduct(s.productId);

            const value =
              Number(s.quantity) *
              Number(s.price);

            return `
              <tr>

                <td>
                  ${formatDate(s.date)}
                </td>

                <td>
                  ${
                    p
                      ? escapeHTML(p.name)
                      : "Unknown"
                  }
                </td>

                <td>
                  ${s.quantity}
                </td>

                <td>
                  ${money(value)}
                </td>

              </tr>
            `;

          }).join("")}

        </tbody>

      </table>

    </div>
  `;

}


/* =========================================================
   PRODUCT MODALS
========================================================= */

function showAddProductModal() {

  showProductFormModal(
    "Add Product",
    null
  );

}


function showEditProductModal(id) {

  const product =
    getProduct(id);

  if (!product) return;

  showProductFormModal(
    "Edit Product",
    product
  );

}


function showProductFormModal(title, product) {

  const editing =
    Boolean(product);


  showModal(
    title,
    `

      <form id="productForm">

        <div class="form-grid">

          <div class="form-group">

            <label>SKU</label>

            <input
              id="productSKU"
              value="${
                product
                  ? escapeAttribute(product.sku)
                  : ""
              }"
              required
            >

          </div>


          <div class="form-group">

            <label>Product Name</label>

            <input
              id="productName"
              value="${
                product
                  ? escapeAttribute(product.name)
                  : ""
              }"
              required
            >

          </div>


          <div class="form-group">

            <label>Category</label>

            <input
              id="productCategory"
              value="${
                product
                  ? escapeAttribute(product.category)
                  : ""
              }"
              required
            >

          </div>


          <div class="form-group">

            <label>Unit</label>

            <input
              id="productUnit"
              value="${
                product
                  ? escapeAttribute(product.unit)
                  : ""
              }"
              placeholder="Pack / Bottle / Box"
              required
            >

          </div>


          <div class="form-group">

            <label>Buying Price</label>

            <input
              id="productBuy"
              type="number"
              min="0"
              step="0.01"
              value="${
                product
                  ? product.buyingPrice
                  : ""
              }"
              required
            >

          </div>


          <div class="form-group">

            <label>Selling Price</label>

            <input
              id="productSell"
              type="number"
              min="0"
              step="0.01"
              value="${
                product
                  ? product.sellingPrice
                  : ""
              }"
              required
            >

          </div>


          <div class="form-group">

            <label>Opening Stock</label>

            <input
              id="productOpening"
              type="number"
              min="0"
              value="${
                product
                  ? product.openingStock
                  : 0
              }"
              required
            >

          </div>


          <div class="form-group">

            <label>Reorder Level</label>

            <input
              id="productReorder"
              type="number"
              min="0"
              value="${
                product
                  ? product.reorderLevel
                  : 10
              }"
              required
            >

          </div>


          <div class="form-group">

            <label>Reorder Quantity</label>

            <input
              id="productReorderQty"
              type="number"
              min="1"
              value="${
                product
                  ? product.reorderQty
                  : 20
              }"
              required
            >

          </div>


          <div class="form-group">

            <label>Expiry Date</label>

            <input
              id="productExpiry"
              type="date"
              value="${
                product
                  ? product.expiryDate
                  : ""
              }"
            >

          </div>

        </div>


        <div class="form-actions">

          <button
            class="btn btn-primary"
            type="submit"
          >
            ${
              editing
                ? "Save Changes"
                : "Add Product"
            }
          </button>

        </div>

      </form>

    `
  );


  document
    .getElementById("productForm")
    .addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const data = {

          sku:
            document
              .getElementById("productSKU")
              .value.trim(),

          name:
            document
              .getElementById("productName")
              .value.trim(),

          category:
            document
              .getElementById("productCategory")
              .value.trim(),

          unit:
            document
              .getElementById("productUnit")
              .value.trim(),

          buyingPrice:
            Number(
              document
                .getElementById("productBuy")
                .value
            ),

          sellingPrice:
            Number(
              document
                .getElementById("productSell")
                .value
            ),

          openingStock:
            Number(
              document
                .getElementById("productOpening")
                .value
            ),

          reorderLevel:
            Number(
              document
                .getElementById("productReorder")
                .value
            ),

          reorderQty:
            Number(
              document
                .getElementById("productReorderQty")
                .value
            ),

          expiryDate:
            document
              .getElementById("productExpiry")
              .value

        };


        if (
          !data.sku ||
          !data.name ||
          !data.category
        ) {

          showToast(
            "Please complete the required fields.",
            "error"
          );

          return;

        }


        if (editing) {

          Object.assign(
            product,
            data
          );

          addAudit(
            "Updated product",
            product.id,
            product.name
          );

          showToast(
            "Product updated.",
            "success"
          );

        } else {

          const newProduct = {

            id:
              nextId(
                "P",
                state.products
              ),

            supplierId:
              state.suppliers[0]?.id || "",

            ...data

          };


          state.products.push(
            newProduct
          );


          addAudit(
            "Created product",
            newProduct.id,
            newProduct.name
          );


          showToast(
            "Product added.",
            "success"
          );

        }


        saveState();

        closeModal();

        renderProducts(
          document.getElementById("content")
        );

      }
    );

}


function showProductDetails(id) {

  const p =
    getProduct(id);

  if (!p) return;

  const supplier =
    getSupplier(p.supplierId);

  const stock =
    getCurrentStock(id);

  const expiry =
    getExpiryInfo(p);


  showModal(
    "Product Details",
    `

      <div class="grid-2">

        <div>

          <strong>Product</strong>

          <p>
            ${escapeHTML(p.name)}
          </p>

        </div>

        <div>

          <strong>SKU</strong>

          <p>
            ${escapeHTML(p.sku)}
          </p>

        </div>

        <div>

          <strong>Current Stock</strong>

          <p>
            ${stock}
          </p>

        </div>

        <div>

          <strong>Supplier</strong>

          <p>
            ${
              supplier
                ? escapeHTML(supplier.name)
                : "—"
            }
          </p>

        </div>

        <div>

          <strong>Buying Price</strong>

          <p>
            ${money(p.buyingPrice)}
          </p>

        </div>

        <div>

          <strong>Selling Price</strong>

          <p>
            ${money(p.sellingPrice)}
          </p>

        </div>

        <div>

          <strong>Expiry</strong>

          <p>
            ${
              p.expiryDate
                ? formatDate(p.expiryDate)
                : "No expiry"
            }
          </p>

        </div>

        <div>

          <strong>Expiry Status</strong>

          <p>
            <span class="status ${expiry.className}">
              ${expiry.label}
            </span>
          </p>

        </div>

      </div>

    `
  );

}


/* =========================================================
   MODALS
========================================================= */

function showModal(title, body) {

  closeModal();


  const overlay =
    document.createElement("div");

  overlay.className =
    "modal-overlay";

  overlay.id =
    "activeModal";


  overlay.innerHTML = `

    <div class="modal">

      <div class="modal-header">

        <h3>
          ${escapeHTML(title)}
        </h3>

        <button
          class="modal-close"
          type="button"
          onclick="closeModal()"
        >
          ×
        </button>

      </div>

      <div class="modal-body">

        ${body}

      </div>

    </div>

  `;


  overlay.addEventListener(
    "click",
    event => {

      if (
        event.target === overlay
      ) {

        closeModal();

      }

    }
  );


  document.body.appendChild(
    overlay
  );

}


function closeModal() {

  const modal =
    document.getElementById(
      "activeModal"
    );

  if (modal) {

    modal.remove();

  }

}


/* =========================================================
   TOASTS
========================================================= */

function setupToastContainer() {

  if (
    document.getElementById(
      "toastContainer"
    )
  ) return;


  const container =
    document.createElement("div");

  container.id =
    "toastContainer";

  container.className =
    "toast-container";


  document.body.appendChild(
    container
  );

}


function showToast(message, type = "success") {

  let container =
    document.getElementById(
      "toastContainer"
    );


  if (!container) {

    setupToastContainer();

    container =
      document.getElementById(
        "toastContainer"
      );

  }


  const toast =
    document.createElement("div");

  toast.className =
    `toast ${type}`;

  toast.textContent =
    message;


  container.appendChild(
    toast
  );


  setTimeout(() => {

    toast.remove();

  }, 3500);

}


/* =========================================================
   ACCESS CONTROL
========================================================= */

function canAccess(page) {

  if (!currentRole) return false;

  return ROLES[currentRole]
    .pages
    .includes(page);

}


function canModifyProducts() {

  return (
    currentRole === "admin" ||
    currentRole === "manager"
  );

}


function renderNoAccess(content) {

  content.innerHTML = `

    <div class="card">

      <div class="card-body">

        <div class="empty-state">

          <div class="empty-state-icon">
            🔒
          </div>

          <strong>
            Access Restricted
          </strong>

          <p>
            Your demonstration role does not have
            permission to access this section.
          </p>

        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   HELPERS
========================================================= */

function todayISO() {

  const d =
    new Date();

  return (
    d.getFullYear() +
    "-" +
    String(
      d.getMonth() + 1
    ).padStart(2, "0") +
    "-" +
    String(
      d.getDate()
    ).padStart(2, "0")
  );

}


function formatDate(value) {

  if (!value) return "—";

  const d =
    new Date(
      value + "T00:00:00"
    );

  if (
    Number.isNaN(
      d.getTime()
    )
  ) return value;

  return d.toLocaleDateString(
    "en-KE",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );

}


function money(value) {

  return (
    "KES " +
    Number(value || 0)
      .toLocaleString(
        "en-KE",
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }
      )
  );

}


function formatNumber(value) {

  return Number(value || 0)
    .toLocaleString("en-KE");

}


function nextId(prefix, collection) {

  let max = 0;

  collection.forEach(item => {

    const match =
      String(item.id || "")
        .match(
          new RegExp(
            "^" + prefix + "(\\d+)$"
          )
        );

    if (match) {

      max =
        Math.max(
          max,
          Number(match[1])
        );

    }

  });


  return (
    prefix +
    String(max + 1).padStart(3, "0")
  );

}


function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

  return escapeHTML(value);

}


/* =========================================================
   EXPOSE FUNCTIONS USED BY INLINE BUTTONS
========================================================= */

window.navigate =
  navigate;

window.showEditProductModal =
  showEditProductModal;

window.showProductDetails =
  showProductDetails;

window.showAddUserModal =
  showAddUserModal;

window.toggleUser =
  toggleUser;

window.createPurchaseDraft =
  createPurchaseDraft;

window.closeModal =
  closeModal;


/* =========================================================
   END SMARTTEC GO™
========================================================= */
         
       
