
import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Sonic Headphones", category: "Electronics", price: 2499, stock: 25, emoji: "🎧", color: "from-violet-500 to-indigo-600" },
  { id: 2, name: "Smart Watch Pro", category: "Wearables", price: 4999, stock: 12, emoji: "⌚", color: "from-cyan-500 to-blue-600" },
  { id: 3, name: "Urban Backpack", category: "Accessories", price: 1299, stock: 40, emoji: "🎒", color: "from-orange-400 to-rose-500" },
  { id: 4, name: "Wireless Speaker", category: "Electronics", price: 1899, stock: 0, emoji: "🔊", color: "from-emerald-400 to-teal-600" },
];

const emptyProduct = {
  name: "",
  category: "Electronics",
  price: "",
  stock: "",
};

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const selectedProduct = products.find(
    (product) => product.id === selectedId
  );

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleEdit(product) {
    setSelectedId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    });
    setMessage("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!selectedId) {
      setMessage("Please select a product to edit.");
      return;
    }

    if (
      !form.name.trim() ||
      form.price === "" ||
      form.stock === "" ||
      Number(form.price) <= 0 ||
      Number(form.stock) < 0 ||
      !Number.isFinite(Number(form.price)) ||
      !Number.isInteger(Number(form.stock))
    ) {
      setMessage("Enter a name, a valid price, and a whole-number stock quantity of zero or more.");
      return;
    }

    setProducts((previous) =>
      previous.map((product) =>
        product.id === selectedId
          ? {
              ...product,
              name: form.name.trim(),
              category: form.category,
              price: Number(form.price),
              stock: Number(form.stock),
            }
          : product
      )
    );

    setMessage("Product updated successfully!");
    setSelectedId(null);
    setForm(emptyProduct);
  }

  function handleCancel() {
    setSelectedId(null);
    setForm(emptyProduct);
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-r from-violet-950 via-slate-900 to-cyan-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-7 md:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500 text-3xl shadow-lg shadow-violet-500/30">
              ◈
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-300">
                INVENTORY MANAGEMENT
              </p>
              <h1 className="mt-1 text-2xl font-black md:text-3xl">
                NEXUS<span className="text-violet-400">.</span>
              </h1>
            </div>
          </div>

          <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            ● System Online
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-10">
        {/* Intro */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-violet-400">
            DASHBOARD / PRODUCTS / UPDATE
          </p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Product <span className="text-violet-400">Studio</span>
          </h2>
          <p className="mt-2 text-slate-400">
            Select a product, edit its details, and save your changes.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Products",
              value: products.length,
              icon: "📦",
              color: "text-violet-300",
            },
            {
              label: "Categories",
              value: new Set(products.map((p) => p.category)).size,
              icon: "◈",
              color: "text-cyan-300",
            },
            {
              label: "Units In Stock",
              value: products.reduce((sum, p) => sum + p.stock, 0),
              icon: "✓",
              color: "text-emerald-300",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-violet-400/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{item.label}</p>
                <span className={`text-2xl ${item.color}`}>
                  {item.icon}
                </span>
              </div>
              <p className="mt-3 text-3xl font-black">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Product list */}
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold">Product Inventory</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Choose a card to edit its information.
                </p>
              </div>
              <span className="rounded-lg bg-violet-500/15 px-3 py-2 text-xs font-bold text-violet-300">
                {filteredProducts.length} PRODUCTS
              </span>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name or category..."
              className="mb-5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className={`overflow-hidden rounded-2xl border bg-slate-900 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/30 ${
                    selectedId === product.id
                      ? "border-violet-400 ring-2 ring-violet-500/20"
                      : "border-white/10"
                  }`}
                >
                  <div
                    className={`flex h-28 items-center justify-center bg-gradient-to-br ${product.color}`}
                  >
                    <span className="text-6xl drop-shadow-lg">
                      {product.emoji}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-violet-300">
                          {product.category}
                        </p>
                        <h4 className="mt-1 font-bold">{product.name}</h4>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                          product.stock > 0
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-rose-400/10 text-rose-300"
                        }`}
                      >
                        {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                      </span>
                    </div>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-slate-500">Price</p>
                        <p className="mt-1 text-xl font-black">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {product.stock} units available
                        </p>
                      </div>

                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-xl bg-violet-500/15 px-4 py-2.5 text-sm font-bold text-violet-300 transition hover:bg-violet-500 hover:text-white"
                      >
                        ✎ Edit
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {filteredProducts.length === 0 && (
                <div className="rounded-2xl border border-white/10 p-8 text-center text-slate-400 sm:col-span-2">
                  No matching products found.
                </div>
              )}
            </div>
          </section>

          {/* Update form */}
          <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl shadow-black/20 md:p-7">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl text-violet-300">
                ✎
              </div>
              <div>
                <h3 className="text-xl font-black">Update Details</h3>
                <p className="text-sm text-slate-400">
                  {selectedProduct
                    ? `Editing: ${selectedProduct.name}`
                    : "Select a product to begin"}
                </p>
              </div>
            </div>

            {!selectedProduct && (
              <div className="mb-5 rounded-xl border border-dashed border-violet-400/30 bg-violet-500/5 p-4 text-sm text-slate-400">
                <span className="mr-2 text-xl">👈</span>
                Click the <strong className="text-violet-300">Edit</strong>{" "}
                button on any product card. Its current details will appear here.
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Product Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!selectedProduct}
                  placeholder="Enter product name"
                  className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  disabled={!selectedProduct}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 outline-none focus:border-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option>Electronics</option>
                  <option>Wearables</option>
                  <option>Accessories</option>
                  <option>Home & Living</option>
                  <option>Fashion</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Price (₹)
                  </label>
                  <input
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    disabled={!selectedProduct}
                    placeholder="2499"
                    className="w-full min-w-0 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-3 outline-none focus:border-violet-400 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Stock
                  </label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={handleChange}
                    disabled={!selectedProduct}
                    placeholder="25"
                    className="w-full min-w-0 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-3 outline-none focus:border-violet-400 disabled:opacity-50"
                  />
                </div>
              </div>

              {message && (
                <div
                  role="status"
                  className={`rounded-xl border p-3 text-sm font-medium ${
                    message.includes("successfully")
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                      : "border-rose-400/20 bg-rose-400/10 text-rose-300"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedProduct}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 font-bold shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ✓ Save Updated Product
              </button>

              {selectedProduct && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full rounded-xl border border-white/10 py-3 font-semibold text-slate-300 transition hover:bg-white/5"
                >
                  Cancel Editing
                </button>
              )}
            </form>

            <p className="mt-6 text-center text-xs text-slate-500">
              NEXUS Inventory • React State Management
            </p>
          </section>
        </div>

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-xs text-slate-500">
          PRACTICAL 08 · UPDATE OPERATION · BUILT WITH REACT + TAILWIND CSS
        </footer>
      </main>
    </div>
  );
}
