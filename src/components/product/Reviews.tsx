import type { Review } from "@/types";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-neutral-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold font-serif">Customer Reviews</h3>
      {reviews.map((r, i) => (
        <div key={i} className="bg-white p-4 border border-neutral-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">{r.reviewerName}</span>
            <span className="text-yellow-500">{'★'.repeat(r.rating)}</span>
            <span className="text-sm text-neutral-400">{new Date(r.date).toLocaleDateString()}</span>
          </div>
          <p className="text-neutral-600">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}