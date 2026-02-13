export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Medical Disclaimer</h1>
      <div className="prose dark:prose-invert">
        <p><strong>Last updated: {new Date().toLocaleDateString()}</strong></p>

        <p>
          The information provided on HealthBlog is for general informational and educational purposes only.
          It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
        </p>

        <h2>No Medical Advice</h2>
        <p>
          You should not rely on the information on this website as an alternative to medical advice from your doctor
          or other professional healthcare provider. If you have any specific questions about any medical matter,
          you should consult your doctor or other professional healthcare provider.
        </p>

        <p>
          If you think you may be suffering from any medical condition, you should seek immediate medical attention.
          You should never delay seeking medical advice, disregard medical advice, or discontinue medical treatment
          because of information on this website.
        </p>

        <h2>No Warranties</h2>
        <p>
          The medical information on this website is provided &quot;as is&quot; without any representations or warranties, express or implied.
          HealthBlog makes no representations or warranties in relation to the medical information on this website.
        </p>
      </div>
    </div>
  );
}
