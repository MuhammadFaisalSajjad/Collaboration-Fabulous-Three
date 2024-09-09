import React from "react";

function MainContent() {
  return (
    <React.Fragment>
      <main className="flex-1 bg-gray-100 p-4">
        <section id="about" className="mb-8">
          <h2 className="text-xl font-bold mb-4">About Me</h2>
          <p>
            Hello! I&apos;m a passionate developer with a love for creating beautiful
            web applications.
          </p>
        </section>

        <section id="projects" className="mb-8">
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold mb-2">Project 1</h3>
              <p>Details about project 1.</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold mb-2">Project 2</h3>
              <p>Details about project 2.</p>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-bold mb-2">Project 3</h3>
              <p>Details about project 3.</p>
            </div>
          </div>
        </section>

        <section id="contact">
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <p>
            You can reach me at{" "}
            <a href="mailto:email@example.com" className="text-blue-600">
              email@example.com
            </a>
            .
          </p>
        </section>
      </main>
    </React.Fragment>
  );
}

export default MainContent;
