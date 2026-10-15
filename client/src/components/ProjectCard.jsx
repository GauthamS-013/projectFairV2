import React, { useState } from "react";
import base_url from "../services/base_url";

function ProjectCard({ pro }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const stackList = pro.languages
    ? pro.languages
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <article
        onClick={handleShow}
        className="group w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0d0d] cursor-pointer transition-all duration-300 hover:border-zinc-700 hover:bg-[#111111]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
          <img
            src={`${base_url}/uploaded/${pro.image}`}
            alt={pro.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <i className="fa-solid fa-arrow-up-right-from-square text-xs text-white" />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-base font-medium text-white truncate">
                {pro.title}
              </h3>

              {pro.description && (
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {pro.description}
                </p>
              )}
            </div>
          </div>
          {stackList.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {stackList.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-500"
                >
                  {tech}
                </span>
              ))}
              {stackList.length > 3 && (
                <span className="text-[11px] px-2.5 py-1 text-zinc-600">
                  +{stackList.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </article>

      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6 md:py-10"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0b0b0b] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md text-zinc-400 hover:text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
            <div className="relative w-full aspect-[16/8] bg-zinc-900 overflow-hidden">
              <img
                src={`${base_url}/uploaded/${pro.image}`}
                alt={pro.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent" />
            </div>

            <div className="px-6 sm:px-8 md:px-10 pb-10 -mt-2 relative">
              <div className="mb-7">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-medium mb-3">
                  Project
                </p>
                <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
                  {pro.title}
                </h2>
              </div>
              {pro.description && (
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-medium mb-3">
                    About
                  </h3>

                  <p className="text-zinc-400 leading-relaxed max-w-3xl">
                    {pro.description}
                  </p>
                </div>
              )}
              {stackList.length > 0 && (
                <div className="mb-9">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-medium mb-3">
                    Built with
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stackList.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900 text-sm text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2 border-t border-zinc-900">
                {pro.github && (
                  <a
                    href={pro.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors text-sm font-medium no-underline"
                  >
                    <i className="fa-brands fa-github" />
                    Source Code
                  </a>
                )}
                {pro.demo && (
                  <a
                    href={pro.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-medium no-underline"
                  >
                    Live Demo
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;
