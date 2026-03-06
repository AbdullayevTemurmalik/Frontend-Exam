const products = [
  // CLOTH (5)
  {
    id: 1,
    category: "cloth",
    name: "Classic T-Shirt",
    description: "Soft cotton crew-neck tee",
    price: 19.99,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/057/981/914/small_2x/black-t-shirt-mockup-with-realistic-fabric-texture-and-folds-png.png",
  },
  {
    id: 2,
    category: "cloth",
    name: "Denim Jeans",
    description: "Straight-fit denim jeans",
    price: 49.5,
    discountPrice: 39.6,
    discountPercent: 20,
    image:
      "https://static.vecteezy.com/system/resources/previews/052/389/005/non_2x/slim-fit-jean-jacket-displayed-on-a-transparent-background-for-casual-wardrobe-styling-and-outfit-inspiration-jean-jacket-slim-fit-isolated-on-transparent-background-free-png.png",
  },
  {
    id: 3,
    category: "cloth",
    name: "Leather Jacket",
    description: "Genuine leather biker jacket",
    price: 129.0,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/previews/053/338/348/non_2x/black-leather-jacket-on-transparent-background-free-png.png",
  },
  {
    id: 4,
    category: "cloth",
    name: "Sports Hoodie",
    description: "Warm hoodie for workouts",
    price: 59.99,
    discountPrice: 47.99,
    discountPercent: 20,
    image:
      "https://static.vecteezy.com/system/resources/previews/055/396/301/non_2x/a-3d-mockup-of-a-blank-white-sport-hoodie-displayed-free-png.png",
  },
  {
    id: 5,
    category: "cloth",
    name: "Summer Dress",
    description: "Light knee-length dress",
    price: 39.99,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtiXh7-HtzSa4RJ9k4dUuuWnu8zA71GUo48w&s",
  },

  // DEVICES (5)
  {
    id: 6,
    category: "devices",
    name: "Smartphone X",
    description: "High-end smartphone with OLED",
    price: 699.0,
    discountPrice: 629.1,
    discountPercent: 10,
    image:
      "https://static.vecteezy.com/system/resources/previews/011/809/172/non_2x/smartphone-design-transparent-background-png.png",
  },
  {
    id: 7,
    category: "devices",
    name: 'Laptop Pro 14"',
    description: "Ultra-portable laptop",
    price: 1199.0,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/058/678/707/small_2x/silver-laptop-with-blank-screen-ideal-for-modern-workspace-png.png",
  },
  {
    id: 8,
    category: "devices",
    name: "Wireless Earbuds",
    description: "Noise-cancelling true wireless",
    price: 149.0,
    discountPrice: 119.2,
    discountPercent: 20,
    image:
      "https://static.vecteezy.com/system/resources/previews/046/596/251/non_2x/ear-buds-modern-headphones-transparent-background-cutout-png.png",
  },
  {
    id: 9,
    category: "devices",
    name: "Smart Watch",
    description: "Fitness smartwatch with GPS",
    price: 199.0,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/previews/051/754/125/non_2x/smart-watch-isolated-on-transparent-background-png.png",
  },
  {
    id: 10,
    category: "devices",
    name: "Portable Charger",
    description: "10,000 mAh powerbank",
    price: 39.0,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/previews/054/591/570/non_2x/pink-power-bank-free-png.png",
  },

  // FURNITURE (5)
  {
    id: 11,
    category: "furniture",
    name: "Dining Chair",
    description: "Wooden dining chair",
    price: 79.0,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/previews/046/395/772/non_2x/wooden-dining-chair-isolated-on-transparent-background-png.png",
  },
  {
    id: 12,
    category: "furniture",
    name: "Coffee Table",
    description: "Low coffee table for living room",
    price: 129.99,
    discountPrice: 110.49,
    discountPercent: 15,
    image:
      "https://static.vecteezy.com/system/resources/previews/050/764/123/non_2x/modern-coffee-table-design-isolated-on-transparent-background-png.png",
  },
  {
    id: 13,
    category: "furniture",
    name: "Office Desk",
    description: "Writing desk with two drawers",
    price: 249.0,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/046/797/124/small_2x/wooden-office-desk-with-lamp-table-isolated-on-transparent-background-png.png",
  },
  {
    id: 14,
    category: "furniture",
    name: "Bookshelf",
    description: "Five-shelf open bookshelf",
    price: 189.5,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/previews/049/632/718/non_2x/classic-bookshelf-filled-with-vintage-literature-in-a-library-setting-with-transparent-background-png.png",
  },
  {
    id: 15,
    category: "furniture",
    name: "Armchair Cozy",
    description: "Comfortable upholstered armchair",
    price: 299.0,
    discountPrice: 239.2,
    discountPercent: 20,
    image:
      "https://static.vecteezy.com/system/resources/previews/053/741/839/non_2x/cozy-armchair-with-blanket-on-transparent-background-png.png",
  },

  // TOYS (4)
  {
    id: 16,
    category: "toys",
    name: "Teddy Bear",
    description: "Soft plush teddy bear 30cm",
    price: 24.99,
    discountPrice: null,
    discountPercent: null,
    image:
      "https://static.vecteezy.com/system/resources/previews/068/020/175/non_2x/a-pink-teddy-bear-toy-on-transparent-background-png.png",
  },
];

export default products;
