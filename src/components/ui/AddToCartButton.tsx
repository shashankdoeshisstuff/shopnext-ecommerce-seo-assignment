"use client";

export default function AddToCartButton({
  productId,
  className,
}: {
  productId: number;
  className?: string;
}) {
  const handleAdd = () => {
    alert(`Product #${productId} added to cart (demo)`);
  };

  return (
    <button
      onClick={handleAdd}
      className={`bg-black hover:bg-gray-800 text-white py-2 px-4 text-sm font-medium transition-colors ${className}`}
    >
      Add to Cart
    </button>
  );
}