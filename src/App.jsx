function App({ children }) {
  const x = 23;
  return (
    <div>
      {children} {x}
    </div>
  );
}

export default App;
