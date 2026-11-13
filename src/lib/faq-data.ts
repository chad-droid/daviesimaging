// Spec+ FAQ content.
//
// Deliberately NOT inside SpecFaq.tsx. That file is a Client Component, and a
// Server Component importing a plain value across the "use client" boundary
// receives a client reference proxy rather than the array, which broke the
// FAQPage schema build. Shared data lives in its own module so both sides get
// the real value.
export interface FaqItem {
  q: string;
  a: string;
}

export const specFaqs: FaqItem[] = [
  {
    q: "What exactly is included in Spec+?",
    a: "Every Spec+ order includes 25 HDR listing photos, 8 ModelMatch virtually staged images, and 1 wide-format FrameFlow video. Photography is handled on-site by a DIG photographer. Virtual staging and video are produced digitally through digDesk. All three are delivered together within 72 hours of the shoot.",
  },
  {
    q: "How is Spec+ different from just ordering listing photos?",
    a: "Listing photography gets you photos. Spec+ adds ModelMatch staging and a FrameFlow video. The ModelMatch staging uses your builder's own model home photography as the design reference, so every staged image looks on-brand, not generic. The virtual video is built from your photos by our production team. One order, three outputs.",
  },
  {
    q: "What is ModelMatch virtual staging?",
    a: "ModelMatch is virtual staging built from the furniture and decor in your own model homes. We use your approved model home photography as the design reference, so a spec in the listing looks like it belongs in the same community as the model.",
  },
  {
    q: "Do I need to be present at the shoot?",
    a: "No. Provide the address, homesite details, and any access instructions when you place your order. DIG coordinates with your sales team directly and handles the full shoot without requiring you on-site.",
  },
  {
    q: "What if I already have photos and just need staging or video?",
    a: "You can order ModelMatch staging or FrameFlow video by themselves through digDesk. Upload your existing listing photos and our team handles the rest. Spec+ includes the photography, but digDesk digital services are available without a new shoot.",
  },
  {
    q: "How do I receive my finished assets?",
    a: "Finished photos, staged images, and video are delivered directly to your digDesk portal. You will receive an email notification when your order is ready. From there you can preview, download individual files, or use Download All. Each order also includes a shareable delivery link with no login required.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes. Once your order is delivered, a revision request option is available in digDesk. Describe what needs to change, submit the request, and our team will review and return updated assets.",
  },
  {
    q: "How many markets does DIG cover?",
    a: "DIG operates in 27 U.S. markets across four regions: West, Mountain, Central, and East. Offices are in Sacramento and Dallas, with production support in Guadalajara. If you are unsure whether we cover your market, reach out and we will confirm.",
  },
];

// The full FAQ page (/faq), grouped by what a builder is asking about.
// Spec+ reuses the list above so the Spec+ page and the FAQ never disagree.
export interface FaqGroup {
  id: string;
  label: string;
  heading: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "digdesk",
    label: "digDesk",
    heading: "Ordering through <strong>digDesk</strong>.",
    items: [
      {
        q: "What is digDesk?",
        a: "digDesk is where you work with DIG. You order every service there, track each job, request revisions, manage your ModelMatch brand library, pay, and download your finished assets.",
      },
      {
        q: "How do I get a digDesk account?",
        a: "If your company already works with DIG, log in or reach out and we will activate your account. If you are new, request an account and it is active within one business day. You can also schedule a 15-minute demo and we will walk you through it first.",
      },
      {
        q: "Is there a subscription or a minimum order?",
        a: "No. There is no subscription and no minimum. You order what you need, when you need it.",
      },
      {
        q: "Which services can I order in digDesk?",
        a: "All of them. Premium Photography, Premium Video, Listing Photography and Spec+ are scheduled through digDesk. ModelMatch, PlanMatch, Moments, FrameFlow, CineFlow and ActFlow are ordered there too, and none of those need a shoot.",
      },
      {
        q: "Can my whole team use the same account?",
        a: "Yes. Your coordinators, marketing team and sales team can all work from your company's digDesk, so every order and every finished asset is in one place.",
      },
      {
        q: "Does digDesk work on my phone?",
        a: "digDesk is built for a desktop or laptop. You can open a delivery link on your phone, but ordering is easier at your desk.",
      },
    ],
  },
  {
    id: "production",
    label: "Photography and video",
    heading: "Photography and video, <strong>on site</strong>.",
    items: [
      {
        q: "What does Premium Photography cover?",
        a: "Premium Photography is three kinds of shoot, each ordered by itself: model home photography, amenity photography, and lifestyle photography with talent. You order the ones your community needs.",
      },
      {
        q: "How is Listing Photography different from Premium?",
        a: "Listing Photography is HDR photography for spec homes and active inventory. It is fast and MLS-ready. Premium is a slower, full-setup shoot for model homes, amenities and lifestyle, where the styling and the light get more time.",
      },
      {
        q: "What is Premium Video?",
        a: "Premium Video is filmed on site by a DIG crew. Builders use it for community walkthroughs, amenity films, lifestyle video with talent, and brand films.",
      },
      {
        q: "Do you shoot lifestyle with real talent?",
        a: "Yes. Our production team handles the casting, styling and art direction for lifestyle photography and lifestyle video.",
      },
      {
        q: "Do you offer Matterport 3D tours?",
        a: "Yes. Matterport is available as part of a Premium or Listing Photography shoot. Ask for it when you order.",
      },
      {
        q: "Do you offer Zillow 3D Home tours?",
        a: "Yes. We offer Zillow 3D Home tours. Ask for one when you order your shoot.",
      },
      {
        q: "Do you film video of spec homes?",
        a: "Not with a camera crew. For a spec or listing home, FrameFlow makes the video from your listing photos, so there is nothing more to schedule.",
      },
    ],
  },
  {
    id: "match",
    label: "ModelMatch, PlanMatch, Moments",
    heading: "ModelMatch, PlanMatch and <strong>Moments</strong>.",
    items: [
      {
        q: "What is ModelMatch virtual staging?",
        a: "ModelMatch is virtual staging built from the furniture and decor in your own model homes. We use your approved model home photography as the design reference, so a spec in the listing looks like it belongs in the same community as the model.",
      },
      {
        q: "What is PlanMatch?",
        a: "PlanMatch gives you photorealistic images of your homes before they are built. We start with your construction plans or CAD files, and you can have images of your model home plans and your unmodeled plans in days, not months.",
      },
      {
        q: "What is Moments?",
        a: "Moments are vertical close ups of your best features, made for social. They come from the images you already have, so you get fresh perspectives without another shoot.",
      },
      {
        q: "Do I need a new shoot for any of these?",
        a: "No. ModelMatch and Moments work from photos you already have. PlanMatch works from your plans.",
      },
    ],
  },
  {
    id: "flow",
    label: "FrameFlow, CineFlow, ActFlow",
    heading: "FrameFlow, CineFlow and <strong>ActFlow</strong>.",
    items: [
      {
        q: "What is FrameFlow?",
        a: "FrameFlow turns your existing images into lifelike video. It is how most builders get video for a spec or listing home, because it needs no crew and no shoot.",
      },
      {
        q: "What is CineFlow?",
        a: "CineFlow creates cinematic video from your existing images. Your spaces can be relit and shown from fresh perspectives, without another shoot.",
      },
      {
        q: "What is ActFlow?",
        a: "ActFlow places virtual talent in your spaces, so your models and amenities feel lived in without casting or a lifestyle shoot.",
      },
      {
        q: "Which photos can I use?",
        a: "Your own listing or model home photography. Upload the images in digDesk when you order. If DIG photographed the home, we already have them.",
      },
    ],
  },
  {
    id: "spec-plus",
    label: "Spec+",
    heading: "Spec+, for homes that need to <strong>sell</strong>.",
    items: specFaqs.filter((f) => /Spec\+/.test(f.q) || f.q.startsWith("Do I need to be present")),
  },
  {
    id: "delivery",
    label: "Delivery and markets",
    heading: "Delivery, revisions and <strong>markets</strong>.",
    items: [
      ...specFaqs.filter((f) => /receive my finished|revisions|How many markets/.test(f.q)),
      {
        q: "What if you do not have a photographer in my market?",
        a: "Tell us where you build. If it is a smaller market we do not cover yet, we will onboard a qualified photographer trained on our standards in weeks.",
      },
      {
        q: "What if I am not happy with the work?",
        a: "Your satisfaction is guaranteed. Request a revision in digDesk or reach out, and we will make it right.",
      },
    ],
  },
];

export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items);
