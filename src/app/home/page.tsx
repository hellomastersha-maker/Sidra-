import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-miac-white text-miac-green">
      <header className="bg-miac-green text-miac-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Kalaveeryam Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold ml-4">Kalaveeryam Arts Fest</h1>
        </div>
        <nav>
          <Link href="/results" className="mx-2 hover:text-miac-gold">Results</Link>
          <Link href="/teams" className="mx-2 hover:text-miac-gold">Teams</Link>
          <Link href="/admin" className="mx-2 hover:text-miac-gold">Admin</Link>
          <Link href="/about" className="mx-2 hover:text-miac-gold">About</Link>
        </nav>
      </header>

      <main className="p-8">
        <section className="text-center mb-12">
          <Image
            src="/logo.jpg"
            alt="Kalaveeryam Arts Fest Main Logo"
            width={400}
            height={400}
            priority
            className="mx-auto mb-8 rounded-lg"
          />
          <h2 className="text-4xl font-bold mb-4">Event Highlights</h2>
          <p className="text-lg">
            Join us for a celebration of art, culture, and talent at Maunathul Islam Arabic College.
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Live Results</h3>
            <p className="mb-4">Check out the latest results and scores from all the events.</p>
            <Link href="/results" className="bg-miac-gold text-miac-green font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105">
              View Results
            </Link>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Team Dashboards</h3>
            <p className="mb-4">Follow your favorite team's progress and see the leaderboards.</p>
            <Link href="/teams" className="bg-miac-gold text-miac-green font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105">
              See Teams
            </Link>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Admin Portal</h3>
            <p className="mb-4">Admins can manage events, candidates, and results.</p>
            <Link href="/admin" className="bg-miac-gold text-miac-green font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105">
              Admin Login
            </Link>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">About the Fest</h3>
            <p className="mb-4">Learn more about Kalaveeryam and its organizers.</p>
            <Link href="/about" className="bg-miac-gold text-miac-green font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105">
              Learn More
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-miac-green text-miac-white text-center p-4 mt-12">
        <p>&copy; 2024 Kalaveeryam Arts Fest. Conducted by SIDRA, MIAC Puthuponnani.</p>
      </footer>
    </div>
  );
}