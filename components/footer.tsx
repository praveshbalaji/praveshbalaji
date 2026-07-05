export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1160px] justify-between border-t border-[#17324a] px-6 py-8 font-mono text-[0.75rem] text-[#5D7592] md:px-16">
      <p>Balaji Manokaran — Chennai, IN — built with Claude</p>
      <p>© {new Date().getFullYear()}</p>
    </footer>
  );
}
