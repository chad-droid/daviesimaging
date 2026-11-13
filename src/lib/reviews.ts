// Reviews copied word for word from DIG's Google Business Profile on
// 12 November 2026, when it showed 5.0 from 5 reviews (one is a rating with no
// text). Do not edit the wording. When new reviews come in, add them here and
// update the count: these numbers are shown on the page and must match Google.
export const GOOGLE_PROFILE_URL = "https://share.google/aEECagJCG6GUnhrG0";
export const GOOGLE_RATING = "5.0";
export const GOOGLE_REVIEW_COUNT = 5;

export interface GoogleReview {
  name: string;
  text: string;
}

export const googleReviews: GoogleReview[] = [
  {
    name: "Anne Yarbrough",
    text: "We have had a great experience working with Davies Imaging Group on our inventory home photo processing and digital staging. They have created a user-friendly platform tailored to our needs which makes requesting services seamless and I appreciate the communication we receive throughout the process so nothing gets missed. They have been such an asset to our marketing team.",
  },
  {
    name: "Don Dykstra",
    text: "Davies Imaging Group delivers! You get a true partner in the process—not just another client on their schedule. Scheduling was easy and communication was consistent each step of the way. The photos are rich, dimensional, and full of character - exactly what you want to help bring a home to life! Highly recommend.",
  },
  {
    name: "Danielle Galella",
    text: "I’ve worked with Davies Imaging Group on several HGTV projects and truly can’t recommend them highly enough. From their flexibility during prep, to their positive, collaborative presence on set, all the way through their exceptional editorial process, they consistently deliver at every stage. I’m fully sold and will continue to bring them onto all of my still projects. Couldn’t recommend them more!",
  },
  {
    name: "Alexandra W",
    text: "Working with Davies has been incredible. They do phenomenal work for our company!",
  },
];
