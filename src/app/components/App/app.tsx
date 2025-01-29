import Navbar from "@/app/components/Navbar/Navbar";
import ListProducts from "@/app/components/ListProducts/ListProducts";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <div className="mx-auto max-w-7xl px-2 pt-1 pb-6 sm:px-6 lg:px-8">
                    < ListProducts />
                </div>
            </main>
        </>
    );
}
