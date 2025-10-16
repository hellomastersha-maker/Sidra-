import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
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
          <Link href="/home" className="mx-2 hover:text-miac-gold">Home</Link>
          <Link href="/results" className="mx-2 hover:text-miac-gold">Results</Link>
          <Link href="/teams" className="mx-2 hover:text-miac-gold">Teams</Link>
          <Link href="/admin" className="mx-2 hover:text-miac-gold">Admin</Link>
        </nav>
      </header>

      <main className="p-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">About Kalaveeryam</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Kalaveeryam is the annual arts festival of Maunathul Islam Arabic College, Puthuponnani, organized by the class union SIDRA under the guidance of class teacher KP Salman Hudawi. It's a vibrant platform for students to showcase their artistic talents and compete in a spirit of healthy rivalry.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">The Organizers</h3>
          <div className="flex justify-center">
            <div className="text-center">
              <p className="text-xl font-semibold">SIDRA (Class Union)</p>
              <p className="text-md">Official Conductors of Kalaveeryam</p>
              <p className="text-md mt-2">Under the supervision of</p>
              <p className="text-xl font-semibold">KP Salman Hudawi</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-bold text-center mb-8">Competing Teams</h3>
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-2xl font-bold mb-2">MAMLUK</h4>
              <p className="font-semibold">Leaders:</p>
              <p>Muhammed Sinan V</p>
              <p>Mehabin</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-2xl font-bold mb-2">SELJUK</h4>
              <p className="font-semibold">Leaders:</p>
              <p>Huwais</p>
              <p>Suhan</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-miac-green text-miac-white text-center p-4 mt-12">
        <p>&copy; 2024 Kalaveeryam Arts Fest. All Rights Reserved.</p>
      </footer>
    </div>
  );
}