/**
 * Required on every medical page (disease detail, blog post) per guide §8 guardrail 9.
 * Not rendered on the Home page — it belongs on content pages once they exist.
 */
export default function Disclaimer() {
  return (
    <div className="rounded-2xl border border-leaf-200 bg-leaf-100 p-4 text-sm text-ink/80">
      The information on this page is for general education and is not a substitute for
      professional medical advice, diagnosis or treatment. Please consult a qualified doctor
      about your health. Results vary from person to person.
    </div>
  );
}
