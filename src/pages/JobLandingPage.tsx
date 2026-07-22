import React, { useEffect } from 'react';
import { MapPin, Briefcase, ShieldCheck, CheckCircle2, ArrowRight, Award } from 'lucide-react';

const APPLY_URL = "https://www.effectivecpmnetwork.com/uu88f6t9n?key=c9a795386f45c57fb43923bdf46f5af2";

export default function JobLandingPage() {
  useEffect(() => {
    // Dynamic Meta Tags & SEO Setup
    document.title = "Certified Home Care Assistant | Job Opening in Los Angeles, CA";

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    setMetaTag('description', 'Apply for the Certified Home Care Assistant position in Los Angeles, California, USA. Full-time permanent role with paid training, flexible schedule, and competitive pay.');
    setMetaTag('keywords', 'Home Care Assistant, Caregiver Jobs Los Angeles, Healthcare Assistant, USA Jobs, Full Time Caregiver');
    setMetaTag('robots', 'index, follow');

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://job.unigrade.site/';

    // Open Graph Tags
    setMetaTag('og:title', 'Certified Home Care Assistant | Job Opening - Los Angeles, CA', true);
    setMetaTag('og:description', 'We are hiring a Certified Home Care Assistant in Los Angeles, CA. Full-time, permanent position offering paid training and growth opportunities.', true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', 'https://job.unigrade.site/', true);

    // Twitter Tags
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:title', 'Certified Home Care Assistant - Los Angeles, CA', true);
    setMetaTag('twitter:description', 'Full-time Certified Home Care Assistant job opening in Los Angeles, CA. Apply now!', true);

    // JSON-LD Structured Data
    const jsonLdData = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": "Certified Home Care Assistant",
      "description": "We are currently seeking compassionate and dependable individuals to join our team as a Certified Home Care Assistant. In this role, you will provide daily non-medical support to seniors and individuals who require assistance in their homes. Responsibilities include assisting with personal care, mobility support, meal preparation, light housekeeping, and companionship while maintaining a safe, comfortable, and respectful living environment.",
      "identifier": {
        "@type": "PropertyValue",
        "name": "Home Care Services",
        "value": "HCA-LA-2026"
      },
      "datePosted": "2026-07-22",
      "validThrough": "2026-12-31",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Home Care Services USA"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "addressCountry": "US"
        }
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "US"
      },
      "jobBenefits": "Paid Training, Flexible Schedule, Full-Time Position, Career Growth Opportunities, Supportive Work Environment, Weekly Pay",
      "directApply": true
    };

    let scriptTag = document.getElementById('job-posting-schema') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'job-posting-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(jsonLdData);

    return () => {
      // Clean up JSON-LD on unmount if needed
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  const requirements = [
    "Must be at least 18 years old",
    "Must be a legal resident of the United States",
    "Authorized to work in the USA",
    "Strong communication skills",
    "Caring, reliable, and responsible",
    "Previous caregiving experience is preferred but not required"
  ];

  const benefits = [
    "Paid Training",
    "Flexible Schedule",
    "Full-Time Position",
    "Career Growth Opportunities",
    "Supportive Work Environment",
    "Weekly Pay (where applicable)"
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <main className="w-full max-w-[820px] bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100 p-6 sm:p-10 transition-all">
        {/* Job Header */}
        <header className="border-b border-slate-100 pb-6 mb-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 w-fit px-2.5 py-1 rounded-md">
            <Award className="w-3.5 h-3.5" /> Urgent Hiring • USA
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Certified Home Care Assistant
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Los Angeles, California, USA</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">
              <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full-Time • Permanent</span>
            </div>
          </div>
        </header>

        {/* Eligibility Notice Banner */}
        <section className="mb-6 bg-blue-50/80 border border-blue-100 rounded-xl p-4 flex items-start gap-3.5" aria-label="Eligibility Notice">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-0.5">Eligibility Notice</h2>
            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed font-medium">
              Applicants must be legal residents of the United States and authorized to work in the USA.
            </p>
          </div>
        </section>

        {/* Job Description */}
        <section className="mb-8" aria-labelledby="job-description-heading">
          <h2 id="job-description-heading" className="text-lg font-bold text-slate-900 mb-2.5">
            Job Description
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are currently seeking compassionate and dependable individuals to join our team as a Certified Home Care Assistant. In this role, you will provide daily non-medical support to seniors and individuals who require assistance in their homes. Responsibilities include assisting with personal care, mobility support, meal preparation, light housekeeping, and companionship while maintaining a safe, comfortable, and respectful living environment.
          </p>
        </section>

        {/* Requirements */}
        <section className="mb-8" aria-labelledby="requirements-heading">
          <h2 id="requirements-heading" className="text-lg font-bold text-slate-900 mb-3">
            Requirements
          </h2>
          <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base">
            {requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Benefits */}
        <section className="mb-8" aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="text-lg font-bold text-slate-900 mb-3">
            Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-700 text-sm sm:text-base">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-lg p-2.5 sm:p-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800 leading-tight">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Call to Action Button */}
        <section className="mt-8 pt-2">
          <a
            href={APPLY_URL || '#'}
            onClick={(e) => {
              if (APPLY_URL) {
                e.preventDefault();
                window.location.href = APPLY_URL;
              }
            }}
            className="w-full py-4 px-8 rounded-xl font-bold text-base sm:text-lg text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all text-center flex items-center justify-center gap-2 tracking-wide cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-600/30"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-3 text-center text-xs text-slate-400">
            This page is for job application purposes only. Eligibility requirements apply.
          </p>
        </section>
      </main>
    </div>
  );
}
