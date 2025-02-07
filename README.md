# Lavalab Dev Challenge

A web application for managing t-shirt inventory with real-time filtering, sorting, and quantity management capabilities.

## Features

- 📦 Inventory Management
- 🔍 Real-time Search
- 🏷️ Color and Size Filtering
- ↕️ Sorting by Name and Quantity
- ➕ Add New Products
- 📊 Quantity Tracking with Visual Feedback

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- Lucide Icons

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/VishnuK1947/lavalab-dev-challenge.git
cd lavalab-dev-challenge
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
lavalab-dev-challenge/
├── app/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── product-list.tsx
│   ├── sidebar.tsx
│   └── t-shirt-icon.tsx
├── types/
│   └── inventory.ts
└── public/
```

## Key Components

- `ProductList`: Main component for displaying and managing inventory
- `Sidebar`: Navigation component with material categories
- `TShirtIcon`: Custom SVG component for t-shirt visualization

## Features in Detail

### Inventory Management

- View all t-shirts with their colors, sizes, and quantities
- Real-time quantity updates with visual feedback
- Add new t-shirts with customizable properties

### Filtering System

- Search by product name
- Filter by color (Red, Black, White, Green, Blue)
- Filter by size (XS, S, M, L, XL)
- Combine multiple filters

### Sorting Options

- Sort by product name
- Sort by quantity
- Toggle ascending/descending order

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
