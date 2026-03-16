import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ReactGA from 'react-ga4';

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 800));
    // GA4 hook point: gtag('event', 'form_submit', { form_name: 'contact' })
    ReactGA.default.event({
        category: 'Form',
        action: 'form_submit',
        label: 'contact',
    });
    console.log(ReactGA);
    console.log('[Analytics] form_submit —', data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="max-w-md mx-auto text-center py-20">
          <div className="w-12 h-12 bg-stone-900 text-white flex items-center justify-center text-xl mx-auto mb-6">
            ✓
          </div>
          <h2 className="font-display text-2xl font-semibold mb-3">Message received</h2>
          <p className="text-stone-500 mb-8 text-sm">
            Thanks for your submission. Check the console for the logged form data.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-outline">
            Submit another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="section-label mb-4">Page 02</p>
      <h1 className="page-title mb-3">Contact Form</h1>
      <p className="text-stone-500 mb-12 max-w-xl">
        A validated form using React Hook Form. On submit, a{' '}
        <code className="font-mono text-xs bg-stone-100 px-1 py-0.5">form_submit</code> event is 
        logged — ready to wire into GA4.
      </p>

      <div className="max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Full name <span className="text-stone-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Jane Smith"
              className={`w-full border px-4 py-3 text-sm bg-white placeholder-stone-300 outline-none focus:border-stone-900 transition-colors ${
                errors.name ? 'border-red-400' : 'border-stone-200'
              }`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email address <span className="text-stone-400">*</span>
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              className={`w-full border px-4 py-3 text-sm bg-white placeholder-stone-300 outline-none focus:border-stone-900 transition-colors ${
                errors.email ? 'border-red-400' : 'border-stone-200'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Subject</label>
            <select
              className="w-full border border-stone-200 px-4 py-3 text-sm bg-white outline-none focus:border-stone-900 transition-colors appearance-none"
              {...register('subject')}
            >
              <option value="">Select a subject</option>
              <option value="general">General enquiry</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Message <span className="text-stone-400">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="Your message..."
              className={`w-full border px-4 py-3 text-sm bg-white placeholder-stone-300 outline-none focus:border-stone-900 transition-colors resize-none ${
                errors.message ? 'border-red-400' : 'border-stone-200'
              }`}
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Minimum 10 characters' },
              })}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="subscribe"
              className="mt-0.5 accent-stone-900"
              {...register('subscribe')}
            />
            <label htmlFor="subscribe" className="text-sm text-stone-600 leading-relaxed">
              Subscribe to newsletter updates
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full justify-center"
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </main>
  );
}
