// Where product enquiries are sent. Replace with the real address.
export const ENQUIRY_EMAIL = "enquiries@example.com";

// Each piece's photographs: the first is the cover, the rest show other views.
// Add more paths to a piece's images list and they appear in its gallery.
export type Product = {
  id: number;
  name: string;
  original: number;
  sale: number;
  images: string[];
  pieceNo: string;
  provenance: string;
};

// 1. Divinity
export const divinityProducts: Product[] = [
  {
    id: 1,
    name: "Ornate Silver Ganesha",
    original: 45000,
    sale: 22500,
    images: ["/images/products/silver-ganesha.jpg", "/images/artifacts/silver-ganesha.jpg"],
    pieceNo: "DIV-01",
    provenance: "Calcutta Assay • 925 Sterling"
  },
  {
    id: 2,
    name: "Silver Mandir with Glass Panels",
    original: 60000,
    sale: 30000,
    images: ["/images/products/silver-mandir.jpg", "/images/artifacts/silver-mandir.jpg"],
    pieceNo: "DIV-02",
    provenance: "Victorian Engraved Border"
  },
  {
    id: 101,
    name: "Radha Krishna Idol",
    original: 75000,
    sale: 37500,
    images: ["/images/products/radha-krishna.jpg", "/images/artifacts/radha-krishna.jpg"],
    pieceNo: "DIV-03",
    provenance: "Chased Solid Bullion"
  },
  {
    id: 102,
    name: "Antique Silver Ganesha",
    original: 55000,
    sale: 27500,
    images: ["/images/products/silver-ganesha-antique.jpg"],
    pieceNo: "DIV-04",
    provenance: "Hand-Burnished Archive Piece"
  },
];

// 2. Art and Home Decor
export const decorProducts: Product[] = [
  {
    id: 3,
    name: "Victorian Silver Vase",
    original: 85000,
    sale: 42500,
    images: ["/images/products/silver-vase.jpg"],
    pieceNo: "DEC-01",
    provenance: "London Hallmarked Masterwork"
  },
  {
    id: 4,
    name: "Horseshoe Photo Frame & Desk Clock",
    original: 120000,
    sale: 60000,
    images: ["/images/products/horseshoe-frame.jpg", "/images/artifacts/horseshoe-frame.jpg"],
    pieceNo: "DEC-02",
    provenance: "Five-Light Ornate Casting"
  },
  {
    id: 104,
    name: "Engraved Polo Trophy",
    original: 32000,
    sale: 16000,
    images: ["/images/products/polo-trophy.jpg", "/images/artifacts/polo-trophy.jpg"],
    pieceNo: "DEC-04",
    provenance: "Velvet Backed Sterling Mount"
  },
  {
    id: 113,
    name: "Engraved Silver Urn",
    original: 98000,
    sale: 49000,
    images: ["/images/products/engraved-urn.jpg"],
    pieceNo: "DEC-05",
    provenance: "Geometric Pierced Border"
  },
];

// 3. Serveware, Bar and Corporate
export const servewareProducts: Product[] = [
  {
    id: 5,
    name: "Royal Tea Service",
    original: 150000,
    sale: 75000,
    images: ["/images/products/tea-service.jpg"],
    pieceNo: "SRV-01",
    provenance: "Three-Piece Hallmarked Set"
  },
  {
    id: 6,
    name: "Gilt-Lined Decanter & Beakers",
    original: 48000,
    sale: 24000,
    images: ["/images/products/decanter-beakers.jpg", "/images/artifacts/silver-barware.jpg"],
    pieceNo: "SRV-02",
    provenance: "Heavy Gauge Mirror Polish"
  },
  {
    id: 105,
    name: "Victorian Spirit Kettle",
    original: 95000,
    sale: 47500,
    images: ["/images/products/spirit-kettle.jpg", "/images/artifacts/silver-kettle.jpg"],
    pieceNo: "SRV-03",
    provenance: "Lion Head Handle Accents"
  },
];

// 4. Personal and Desk Accessories
export const accessoriesProducts: Product[] = [
  {
    id: 7,
    name: "Silver Desk Clock",
    original: 42000,
    sale: 21000,
    images: ["/images/products/desk-clock.jpg"],
    pieceNo: "ACC-01",
    provenance: "Barleycorn Engraved Pattern"
  },
];


// Each category shows a thumbnail of one representative piece in the tab bar
export const categories = [
  { id: "all", label: "All pieces", thumb: "/images/categories/all.jpg" },
  { id: "divinity", label: "Divinity", thumb: "/images/categories/divinity.jpg" },
  { id: "decor", label: "Art & decor", thumb: "/images/categories/decor.jpg" },
  { id: "serveware", label: "Serveware", thumb: "/images/categories/serveware.jpg" },
  { id: "accessories", label: "Accessories", thumb: "/images/categories/accessories.jpg" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const productsByCategory: Record<CategoryId, Product[]> = {
  all: [...divinityProducts, ...decorProducts, ...servewareProducts, ...accessoriesProducts],
  divinity: divinityProducts,
  decor: decorProducts,
  serveware: servewareProducts,
  accessories: accessoriesProducts,
};

export const allProducts = productsByCategory.all;

// Product pages live at /products/<piece number>, e.g. /products/div-01
export const productSlug = (product: Product) => product.pieceNo.toLowerCase();

export const getProduct = (slug: string) => allProducts.find((p) => productSlug(p) === slug);

export const productCategory = (product: Product) =>
  categories.find((c) => c.id !== "all" && productsByCategory[c.id].includes(product))!;

export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export const enquiryLink = (product: Product, quantity = 1) =>
  `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
    `Enquiry: ${product.name} (${product.pieceNo})${quantity > 1 ? ` x ${quantity}` : ""}`
  )}`;
