import { useParams } from "react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { Button } from "~/ui";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">Product #{id}</h1>
        <p className="text-gray-600 mb-6">
          Product detail page. In a real app this would fetch from the API.
        </p>
        <Button>Add to Cart</Button>
      </main>
      <Footer />
    </div>
  );
}
