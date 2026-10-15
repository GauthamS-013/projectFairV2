import React from "react";
import Navbar from "../components/Navbar";
import profilepic from "../assets/Gautham.jpg";

function Developer() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
        <section className="text-center">
          <p className="text-sm text-indigo-400 font-medium mb-4">About Me</p>
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-[#0d0d0d]">
            <img
              src={profilepic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-6">
            Gautham
          </h1>
          <p className="text-zinc-500 mt-2">Developer · Cyclist · Learner</p>

          <div className="flex justify-center gap-3 mt-6">
            <a
              href="https://github.com/GauthamS-013"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/gauthams013/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm text-indigo-400 font-medium mb-2">
            A little about me
          </p>
          <h2 className="text-2xl font-semibold">Beyond the code</h2>
          <div className="mt-5 border border-zinc-800 bg-[#0d0d0d] rounded-2xl p-6 md:p-8">
            <p className="text-zinc-400 leading-7">
              I'm a developer who enjoys building things, learning new
              technologies, and turning random ideas into something that
              actually works.
            </p>
            <p className="text-zinc-400 leading-7 mt-4">
              But coding isn't the only thing I enjoy. When I'm away from the
              keyboard, you'll probably find me out on a bike, playing a video
              game, watching a movie, listening to music, or simply exploring
              something I've never tried before.
            </p>
            <p className="text-zinc-400 leading-7 mt-4">
              I like learning by doing, whether that's building a web
              application, trying a new technology, taking a longer cycling
              route, or figuring out how something works just because I'm
              curious about it.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-sm text-indigo-400 font-medium mb-2">
            Outside the keyboard
          </p>
          <h2 className="text-2xl font-semibold">Things I enjoy</h2>
          <p className="text-zinc-500 mt-2">
            A few things that keep me busy when I'm not coding.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="group border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                <i className="fa-solid fa-person-biking text-indigo-400"></i>
              </div>
              <h3 className="text-sm font-medium mt-4">Cycling</h3>
              <p className="text-xs text-zinc-500 leading-5 mt-2">
                Long rides, new roads, climbs and the occasional race. There's
                something about being on a bike for hours that never gets old.
              </p>
            </div>

            <div className="group border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                <i className="fa-solid fa-gamepad text-indigo-400"></i>
              </div>
              <h3 className="text-sm font-medium mt-4">Video Games</h3>
              <p className="text-xs text-zinc-500 leading-5 mt-2">
                Sometimes competitive, sometimes completely casual. Gaming is
                one of my favourite ways to switch off.
              </p>
            </div>

            <div className="group border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                <i className="fa-solid fa-film text-indigo-400"></i>
              </div>
              <h3 className="text-sm font-medium mt-4">Movies</h3>
              <p className="text-xs text-zinc-500 leading-5 mt-2">
                Good stories, interesting characters and movies that stay in
                your head long after the credits.
              </p>
            </div>

            <div className="group border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                <i className="fa-solid fa-music text-indigo-400"></i>
              </div>
              <h3 className="text-sm font-medium mt-4">Music</h3>
              <p className="text-xs text-zinc-500 leading-5 mt-2">
                There is almost always something playing while I'm coding,
                travelling or working on something.
              </p>
            </div>

            <div className="group border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                <i className="fa-solid fa-microchip text-indigo-400"></i>
              </div>
              <h3 className="text-sm font-medium mt-4">Technology</h3>
              <p className="text-xs text-zinc-500 leading-5 mt-2">
                I enjoy discovering new tools, frameworks and ideas and then
                inevitably trying to build something with them.
              </p>
            </div>

            <div className="group border border-zinc-800 bg-[#0d0d0d] rounded-xl p-5 hover:border-zinc-700 transition">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                <i className="fa-solid fa-compass text-indigo-400"></i>
              </div>
              <h3 className="text-sm font-medium mt-4">Exploring</h3>
              <p className="text-xs text-zinc-500 leading-5 mt-2">
                New places, new ideas and random things that somehow turn into
                another rabbit hole.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-sm text-indigo-400 font-medium mb-2">Right now</p>
          <h2 className="text-2xl font-semibold">Currently into</h2>
          <div className="mt-5 border border-zinc-800 bg-[#0d0d0d] rounded-2xl p-6">
            <div className="flex gap-4">
              <div className="w-1 rounded-full bg-indigo-500 shrink-0"></div>
              <div>
                <p className="text-zinc-300 leading-6">
                  Building projects, learning new things and getting better at
                  what I do.
                </p>
                <p className="text-sm text-zinc-500 leading-6 mt-2">
                  Currently spending a lot of time around web development, AI
                  and experimenting with different ideas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-sm text-indigo-400 font-medium mb-2">
            Random stuff
          </p>
          <h2 className="text-2xl font-semibold">A few things about me</h2>
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-4 border border-zinc-800 bg-[#0d0d0d] rounded-xl p-4">
              <span className="text-xl">🚴</span>
              <p className="text-sm text-zinc-400">
                I'd rather take the longer route if it's a good cycling road.
              </p>
            </div>

            <div className="flex items-center gap-4 border border-zinc-800 bg-[#0d0d0d] rounded-xl p-4">
              <span className="text-xl">🎮</span>
              <p className="text-sm text-zinc-400">
                A gaming session can very easily turn into a "one more game"
                situation.
              </p>
            </div>

            <div className="flex items-center gap-4 border border-zinc-800 bg-[#0d0d0d] rounded-xl p-4">
              <span className="text-xl">💻</span>
              <p className="text-sm text-zinc-400">
                I have a habit of starting projects because I suddenly get an
                idea.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 mb-10 text-center border border-zinc-800 bg-[#0d0d0d] rounded-2xl p-8">
          <h2 className="text-xl font-semibold">Want to connect?</h2>
          <p className="text-sm text-zinc-500 mt-2">
            Find me around the internet.
          </p>
          <div className="flex justify-center gap-3 mt-5">
            <a
              href="https://github.com/GauthamS-013"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition"
            >
              <i className="fa-brands fa-github mr-2"></i>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gauthams013/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition"
            >
              <i className="fa-brands fa-linkedin mr-2"></i>
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Developer;
