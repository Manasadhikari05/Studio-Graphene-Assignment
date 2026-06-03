function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            GitHub Repo Explorer
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-600 text-center">
          Search for a GitHub user to explore their repositories.
        </p>
      </main>
    </div>
  );
}

export default App;
