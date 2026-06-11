
const brandConfig = {
  metadata: {
    title: "Almass Estates — Guaranteed Rent for London Landlords",
    description: "Find out in minutes if Almass Estates can guarantee your rent. Join 100+ London landlords with 3–5 year leases and £1.8M+ paid out in 2025.",
    favicon: "/fav.png",
  },
  sitePassword: "almass", 
  fonts: {
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap",
    sans: ['Jost', 'sans-serif'],
    serif: ['"Cormorant Garamond"', 'serif'],
  },
  colors: {
    background: '#0D0D0D',
    card: '#1A1A1A',
    gold: '#C8A96E',
    primary: '#F0EDE8',
    secondary: '#C8C4BC',
    muted: '#888780',
    darkGold: '#a68a64',
    black: '#0D0D0D',
    border: 'rgba(255, 255, 255, 0.08)'
  },
  copy: {
    hero: {
      heading1: "Guaranteed Rent",
      heading2: "Stop Managing.",
      heading3: "Start Collecting.",
      subheading: "Our AI instantly checks if your property qualifies and sends you a result within minutes.",
      ctaButton: "Read Client Stories",
      successHeading: "Checking your property now.",
      successMessage: "You will receive an email with your result within the next few minutes.",
      submitAnother: "Submit another property",
      formHeading: "Property Details",
      gdprText: "I agree to the processing of my data in accordance with the privacy policy.",
      gdprLink: "https://almassestates.co.uk/privacy",
      submitButton: "Check My Property Now",
      submitButtonTopMicro: "Takes 60 seconds",
      submitButtonBottomMicro: "Free assessment. No obligation. No fees."
    },
    trustStrip: {
      items: [
        "£1.8M+ paid in 2025",
        "100+ properties managed",
        "3–5 year leases"
      ]
    },
    painPoints: {
      tag: "Why Landlords Choose Us",
      heading1: "The problems we ",
      headingHighlight: "eliminate.",
      subheading: "Being a landlord shouldn't be a second job. Stop losing time and money to these common headaches.",
      items: [
        { num: "01", title: "Rent that never arrives on time", desc: "Chasing late payments destroys your peace of mind and ruins your cash flow. With us, rent lands on the same date every month. Occupied or empty, it makes no difference to your income." },
        { num: "02", title: "Maintenance calls at all hours", desc: "Coordinating contractors and handling tenant complaints turns a passive investment into a stressful second job. We assume full responsibility for repairs, bills and compliance. You will never receive a 2am call about a broken boiler again." },
        { num: "03", title: "The Renters Rights Bill", desc: "Constantly changing regulations make compliance a minefield and leave you exposed to difficult evictions. Our commercial lease means the Renters Rights Bill does not apply to you. We take on all the risk, not you." },
        { num: "04", title: "Empty properties losing money", desc: "Every week your property sits vacant between tenancies is profit disappearing straight out of your pocket. From the day we sign, your rent is guaranteed whether anyone is in the property or not." }
      ]
    },
    process: {
      tag: "How It Works — 3 Steps",
      heading1: "From submission to ",
      headingHighlight: "guaranteed income.",
      items: [
        {
          id: "01",
          title: "Submit Property Details",
          description: "Submit your property details. Takes less than 60 seconds. Our system instantly checks your property across North West, North, West and Central London.",
          image: "/images/step1.webp",
        },
        {
          id: "02",
          title: "Instant AI Assessment",
          description: "Our AI analyzes your details and emails your result within minutes. Match found we confirm interest and next steps. No match we add you to our priority waiting list.",
          image: "/images/step2.webp",
        },
        {
          id: "03",
          title: "Guaranteed Rent Offer",
          description: "A member of our team visits your property, assesses its value and makes you a guaranteed rent offer within 72 hours. No obligation. Completely free.",
          image: "/images/step3.webp",
        }
      ]
    },
    testimonials: {
      tag: "Testimonials",
      heading1: "Don't take our word for it. ",
      headingHighlight: "Take theirs.",
      subheading: "Every landlord asks the same question. Will they actually pay? Here is what the companies we work with say... in writing.",
      proofStrip: [
        "£0 missed across every property",
        "7+ properties across these references",
        "3 independent landlord companies"
      ],
      riskReversal: {
        text: "No obligation. No fees. No tie-in. If you don't like the offer, you walk away.",
        subtext: "Free assessment · Response within minutes · 3–5 year lease on your terms"
      },
      items: [
        {
          id: 1,
          name: "RGR CAPITAL LTD",
          title: "Regev Farkas — Director",
          text: "Almass Estates has consistently paid rent early or on time and has never missed a single payment. They have achieved exceptional rental returns on our behalf and proven to be a trustworthy and proactive partner in our investment strategy.",
          statBoxText: "£10,700/month guaranteed across 3 properties",
          propertyTags: [
            "23 Manor Park Crescent, HA8 7NH · 2 x 3-bed flats · £2,850/mo each",
            "36 Glengall Road, HA8 8SU · 6-bed house · £5,000/mo"
          ],
          bottomBarLeft: "Zero missed payments since Sep 2024",
          bottomBarRight: "FORMAL LETTER",
          verifiedText: "VERIFIED REFERENCE"
        },
        {
          id: 2,
          name: "PRIME LONDON OPCO LTD",
          title: "Eli Moren — Director",
          text: "All rental payments have been made on time or early, without a single missed payment. Properties kept in excellent condition throughout. We would confidently recommend Almass Estates for any future partnerships.",
          statBoxText: "£8,125/month guaranteed across 2 properties",
          propertyTags: [
            "74 Mount Grove, HA8 9SX · £4,700/mo from Feb 2025",
            "99 Southfield, NW4 4NA · £3,425/mo from Sep 2024"
          ],
          bottomBarLeft: "Zero missed payments",
          bottomBarRight: "FORMAL LETTER",
          verifiedText: "VERIFIED REFERENCE"
        },
        {
          id: 3,
          name: "IMF PROPERTY INVESTMENTS LTD",
          title: "Mohammed Imran — Director",
          text: "Almass Estates has never missed a payment, with all rents paid on or before the due date without exception. The property has been kept in excellent condition with no complaints from neighbours or third parties.",
          statBoxText: "£4,000/month guaranteed since Dec 2024",
          propertyTags: [
            "60 Sturgess Avenue · 5-bed house · £4,000/mo"
          ],
          bottomBarLeft: "Zero missed payments since Dec 2024",
          bottomBarRight: "FORMAL LETTER",
          verifiedText: "VERIFIED REFERENCE"
        }
      ]
    },
    faq: {
      tag: "FAQ — 5 Questions",
      heading1: "Everything you want to know before ",
      headingHighlight: "saying yes.",
      items: [
        {
          id: "Q1",
          question: "What is guaranteed rent and how does it work?",
          answer: "We become your tenant and pay you a fixed monthly rent whether the property is occupied or not. Long-term lease of 3 to 5 years."
        },
        {
          id: "Q2",
          question: "Who pays the bills and maintenance?",
          answer: "We do. All bills, maintenance and repair costs covered by Almass Estates. Zero deductions, zero surprise costs."
        },
        {
          id: "Q3",
          question: "What types of properties do you take on?",
          answer: "All types residential, HMO, social housing, blocks and everything in between. If it is in London, we want to hear from you."
        },
        {
          id: "Q4",
          question: "How quickly can you take on my property?",
          answer: "Agreement in place within 1 to 2 weeks of initial assessment. We move fast so you start receiving guaranteed rent as soon as possible."
        },
        {
          id: "Q5",
          question: "What if my property does not match right now?",
          answer: "Added to our priority waiting list. The moment we are looking for a property matching yours in your area, you will be the first we contact."
        }
      ]
    },
    cta: {
      tag: "Get started",
      headingLine1: "Your property. Our responsibility.",
      headingLine2: "Your guaranteed income.",
      subheading: "Join over 100 London landlords who never chase rent again. Check if your property qualifies in under 60 seconds.",
      buttonText: "Check My Property Now"
    },
    chat: {
      botName: "Aria",
      botAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      greeting: "Hi! I'm Aria, the property assistant for Almass Estates. How can I help?"
    },
    footer: {
      logo: {
        src: "/images/logo.png",
        text: "ALMASS ESTATES"
      },
      links: [
        { label: "Guaranteed Rent", url: "https://almassestates.co.uk/" },
        { label: "Our Portfolio", url: "https://almassestates.co.uk/portfolio" },
        { label: "Contact", url: "https://almassestates.co.uk/contact" },
        { label: "Privacy", url: "https://almassestates.co.uk/privacy" },
        { label: "Terms", url: "https://almassestates.co.uk/terms" }
      ],
      contact: {
        phone: "020 3538 8233",
        email: "estates@almassestate.com",
        location: "London, UK"
      },
      socials: [
        { platform: "Facebook", url: "https://www.facebook.com/profile.php?id=61567827752984&mibextid=wwXIfr&rdid=pD9JOgaQRpoCaNBG&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Dc4Asf4cf%2F%3Fmibextid%3DwwXIfr#", icon: "facebook" },
        { platform: "TikTok", url: "https://www.tiktok.com/@almassestatesltd?_r=1&_t=ZN-96CDtylixaF", icon: "tiktok" },
        { platform: "Instagram", url: "https://www.instagram.com/almassestatesltd?igsh=MXZ1dDNqbG8xb3hjaA%3D%3D", icon: "instagram" },
        { platform: "LinkedIn", url: "https://www.linkedin.com/company/almassestatesltd/", icon: "linkedin" }
      ],
      copyright: `© ${new Date().getFullYear()} Almass Estates Ltd. All Rights Reserved.`,
      poweredBy: "Powered by AK Marketing",
      poweredByUrl: "https://akmarketing.agency/"
    }
  }
};

export default brandConfig;
