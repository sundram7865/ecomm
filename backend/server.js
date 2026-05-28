const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const SECRET = "babafly_jwt_secret";
const PORT = process.env.PORT || 3001;

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// ─── Helper: read db ───────────────────────────────────────────────────────
function getDb() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "db.json"), "utf-8"));
}
function saveDb(data) {
  fs.writeFileSync(
    path.join(__dirname, "db.json"),
    JSON.stringify(data, null, 2)
  );
}

// ─── Auth: Register ────────────────────────────────────────────────────────
server.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const db = getDb();
  const exists = db.users.find((u) => u.email === email);
  if (exists) {
    return res.status(409).json({ error: "Email already registered" });
  }
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    password,
    role: "user",
  };
  db.users.push(newUser);
  saveDb(db);
  const token = jwt.sign({ id: newUser.id, email, role: "user" }, SECRET, {
    expiresIn: "7d",
  });
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ token, user: userWithoutPassword });
});

// ─── Auth: Login ───────────────────────────────────────────────────────────
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = getDb();
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: "7d" }
  );
  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

// ─── Auth: Get current user ────────────────────────────────────────────────
server.get("/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    const db = getDb();
    const user = db.users.find((u) => u.id === decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// ─── Protect orders routes ─────────────────────────────────────────────────
server.use("/orders", (req, res, next) => {
  if (req.method === "GET" || req.method === "POST") {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "Authentication required" });
    try {
      const token = authHeader.split(" ")[1];
      req.user = jwt.verify(token, SECRET);
      next();
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  } else {
    next();
  }
});

// ─── POST /orders: attach userId ───────────────────────────────────────────
server.post("/orders", (req, res) => {
  const db = getDb();
  const newOrder = {
    id: db.orders.length + 1,
    userId: req.user.id,
    ...req.body,
    status: "placed",
    createdAt: new Date().toISOString(),
  };
  db.orders.push(newOrder);
  saveDb(db);
  res.status(201).json(newOrder);
});

// ─── GET /orders: only user's own orders ──────────────────────────────────
server.get("/orders", (req, res) => {
  const db = getDb();
  const userOrders = db.orders.filter((o) => o.userId === req.user.id);
  res.json(userOrders);
});

// ─── Use json-server router for everything else ───────────────────────────
server.use(router);

server.listen(PORT, () => {
  console.log(`BabaFly Backend running on http://localhost:${PORT}`);
  console.log(`Demo login → email: demo@babafly.com | password: demo1234`);
});