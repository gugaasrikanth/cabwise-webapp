import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Welcome to Cabwise</h1>
            <p className="py-6">Your Ride, Your Choice.</p>
            <Link href="/search">
              <button className="btn btn-primary">Book Your Ride</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
