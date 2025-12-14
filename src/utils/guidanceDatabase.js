// Comprehensive guidance database: organized by abuse type and platform
// Each entry contains specific, actionable advice

const guidanceDB = {
  // Abuse type → Platform → Guidance object with sections
  "Cyber flashing": {
    default: {
      immediate: [
        "Block the user immediately on all platforms.",
        "Do not respond or engage with further messages.",
        "Document the content (screenshot with timestamp) before reporting.",
      ],
      platformAction:
        'Report the explicit content to the platform moderation team. Most platforms have dedicated "Sexual Content" or "Harassment" reporting options.',
      evidence:
        "Save screenshots with URLs and timestamps. If images were sent via email or messaging, preserve the headers.",
      support:
        "Contact RAINN (1-800-656-4673) or Crisis Text Line (text HOME to 741741) for emotional support.",
    },
    Facebook: {
      immediate: ["Block the user and report their account."],
      platformAction:
        'On Facebook: Click the photo/post → "Report" → Select "It\'s unwanted sexual content" → Submit. Also report the account.',
      evidence:
        "Screenshot the content with URL bar visible showing timestamp.",
      support: "Use Facebook's Safety Center for additional resources.",
    },
    Instagram: {
      immediate: ["Block the account sending the images."],
      platformAction:
        'Tap the message or post → "Report" → "It\'s sexual content involving me or child" → Submit. Restrict or block the account.',
      evidence: "Take screenshots of DMs and profile information.",
      support: "Visit Instagram's Community Guidelines page for resources.",
    },
    WhatsApp: {
      immediate: [
        "Block the contact immediately. Do not delete the conversation yet.",
      ],
      platformAction:
        'Long-press the message → "Report" → Confirm. Also block the contact.',
      evidence:
        "Export the chat (Settings → Chats → Export Chat) as evidence before deleting.",
      support:
        "WhatsApp offers no dedicated moderation, but law enforcement can request chat records.",
    },
  },

  "Cyber stalking": {
    default: {
      immediate: [
        "Block the person on all platforms (social media, email, phone).",
        "Change privacy settings to private; review followers/friends for duplicate accounts.",
        "Document all contact attempts with timestamps and screenshots.",
      ],
      platformAction:
        "Report the account for stalking/harassment on the platform. Most platforms have dedicated harassment reporting.",
      evidence:
        "Create a timeline: screenshots of messages, posts mentioning you, account creation dates of fake profiles.",
      support:
        "Consider filing a police report. Organizations like CyberTipline.org can help coordinate with law enforcement.",
    },
    Facebook: {
      immediate: ["Block on Facebook and Instagram (same parent company)."],
      platformAction:
        'Report the account → "It\'s harassment" → "They\'re repeatedly contacting me" → Submit.',
      evidence: "Screenshot message threads and timeline of contact.",
      support:
        "Use Facebook's Safety Tools (facebook.com/safety) to block and create support contact lists.",
    },
    Instagram: {
      immediate: ["Restrict the account; make your profile private."],
      platformAction:
        'Go to the account → Menu → "Restrict" or "Block". Report for harassment.',
      evidence: "Export your DM conversations and comment history.",
      support:
        "File a report on Instagram; if escalated, they may involve law enforcement.",
    },
    "X (Twitter)": {
      immediate: ["Mute, block, or report the account."],
      platformAction:
        'Click the account → "..." → "Block @username" and separately "Report @username" for harassment.',
      evidence:
        "Screenshots of tweets, replies, and timestamps. Use Twitter's archive feature.",
      support:
        "X has a specialized harassment reporting team; reports may be expedited for stalking.",
    },
  },

  "Digital voyeurism": {
    default: {
      immediate: [
        "If your camera/device was hacked, change all passwords immediately and run antivirus.",
        "Contact the platform immediately; do not engage with the perpetrator.",
        "Preserve all evidence (logs, messages, device forensics).",
      ],
      platformAction:
        "Report to the platform hosting the content. Also file a complaint with the FBI's Internet Crime Complaint Center (IC3.gov).",
      evidence:
        "Document when you discovered the breach, what was compromised, and any communications from the perpetrator.",
      support:
        "Consider consulting a cybersecurity expert to audit your device. Contact NCMEC (National Center for Missing & Exploited Children) if minors are involved.",
    },
    Email: {
      immediate: ["Change your email password immediately. Enable 2FA."],
      platformAction:
        "Report the sender to your email provider as phishing or hacking.",
      evidence:
        "Forward the suspicious email to abuse@provider.com with full headers.",
      support:
        "Contact law enforcement; this is a serious crime in most jurisdictions.",
    },
    "Cloud storage (Google Drive, Dropbox, etc.)": {
      immediate: ["Revoke access and change password. Review sharing links."],
      platformAction:
        "Report the breach to the cloud provider's security team.",
      evidence: "Document file access logs and timestamps.",
      support:
        "File a CFAA (Computer Fraud and Abuse Act) complaint with law enforcement if in the US.",
    },
  },

  Doxing: {
    default: {
      immediate: [
        "If your address was shared, notify trusted people you live with.",
        "Consider temporary relocation if you feel physically threatened.",
        "Contact local law enforcement if you feel unsafe.",
      ],
      platformAction:
        'Report the post/profile to the platform as "sharing personal information" or "harassment".',
      evidence:
        "Screenshot the doxing content with URLs. Google yourself to find where your info is posted. Document all instances.",
      support:
        "File a police report with the doxing evidence. Contact DeleteMe or similar services to scrub your data from data broker sites.",
    },
    Facebook: {
      immediate: ["If your address/phone is visible, report immediately."],
      platformAction:
        'Report the post/comment → "It\'s harassment" → "Sharing someone\'s personal info" → Submit.',
      evidence: "Screenshot the post and the perpetrator's profile.",
      support:
        "File a report; Facebook's safety team may expedite removal of sensitive info.",
    },
    Instagram: {
      immediate: [
        "Review your tagged photos for location info. Remove tags as needed.",
      ],
      platformAction:
        'Report the post → "It displays sensitive personal information" → Submit.',
      evidence:
        "Screenshots with timestamps and the perpetrator's profile info.",
      support:
        "File a request with Instagram's Private Information Reporting Form.",
    },
    "X (Twitter)": {
      immediate: [
        "Check your tweets for location/address mentions. Delete if present.",
      ],
      platformAction:
        'Report the tweet → "It\'s abusive or harmful" → "It exposes private information" → Submit.',
      evidence: "Screenshot tweets and account information.",
      support: "X's safety team prioritizes doxing reports.",
    },
    TikTok: {
      immediate: [
        "Check your videos for location metadata. Review comments for personal info.",
      ],
      platformAction:
        'Report the account or video → "Abuse or harassment" → Submit.',
      evidence: "Record videos and comments with timestamps.",
      support: "File a report; remove location tags from future videos.",
    },
  },

  "Gender-based hate speech": {
    default: {
      immediate: [
        "Block and mute the account.",
        "Avoid engaging or responding to hate comments.",
        "Consider making your account private or limiting who can comment.",
      ],
      platformAction:
        "Report as hate speech. Most platforms have dedicated reporting for gender-based harassment.",
      evidence:
        "Screenshot the hateful comments and the account profile. Document patterns if repeated.",
      support:
        "Contact organizations like NCMEC, HeartMob, or the Cyber Civil Rights Initiative for support and resources.",
    },
    Facebook: {
      platformAction:
        'On Facebook: Click the post or comment → "Report" → Choose "It\'s hate speech" → Select the affected group (women or men) → Submit. You can also block the account, restrict commenting, and adjust who can see your posts in Settings → Privacy.',
      evidence: "Screenshots of comments and any linked profiles.",
      support:
        "Facebook has Community Standards violation tools; repeated violations may result in account suspension.",
    },
    Instagram: {
      platformAction:
        'On Instagram: Tap the post or comment → "Report" → Choose "Hate speech" or "Harassment" → Follow prompts to indicate the targeted group (women or men). Use "Restrict" or "Block" on the offending account and limit who can comment on your posts via Settings → Privacy.',
      evidence:
        "Take screenshots of the post/comment and the user profile. Record timestamps and profile URLs.",
      support:
        "Instagram provides reporting flows and privacy controls; repeated reports may result in content removal or account restrictions.",
    },
    "X (Twitter)": {
      platformAction:
        'Report the tweet → "It\'s abusive or harmful" → "It\'s expressing intent to harm individuals" → Submit.',
      evidence: "Tweet screenshots and profile information.",
      support:
        "X's Trust & Safety team reviews gender-based harassment reports.",
    },
    TikTok: {
      platformAction:
        'On TikTok: Tap the share arrow on the video or long-press the comment → "Report" → Select "Hate speech" or "Harassment" and follow prompts to indicate the target (women or men). Use privacy settings to limit who can comment or duet your content, and block offending users.',
      evidence: "Record videos and comments.",
      support: "TikTok may remove content and issue warnings or bans.",
    },
    Discord: {
      platformAction:
        'Report the message → "It\'s harmful content" → Submit to Discord Trust & Safety.',
      evidence: "Screenshot the message, username, and server name.",
      support:
        "Leave the server if the community tolerates hate speech. Report to server admins.",
    },
  },

  "Identity theft / Impersonation": {
    default: {
      immediate: [
        "Report the fake account to the platform immediately.",
        'Do NOT interact with the account. Do NOT try to "convince" followers it\'s fake.',
        "Check your credit and bank accounts for fraudulent activity.",
      ],
      platformAction:
        'Report as "Impersonation" or "Pretending to be Me". Include proof of your real account.',
      evidence:
        "Screenshots of the fake account, comparison with your real account, any scams the fake account committed.",
      support:
        "File a report with the FTC (ftc.gov/idtheft) if financial fraud is involved. Contact law enforcement for identity theft.",
    },
    Facebook: {
      platformAction:
        'Report the profile → "It\'s impersonating me" → Verify with government ID if needed.',
      evidence: "Show your real account and the fake one side-by-side.",
      support:
        "Facebook can quickly remove impersonation accounts and may ban the creator.",
    },
    Instagram: {
      platformAction:
        'Report the account → "It\'s impersonating me" → Provide proof (your real account, ID if needed).',
      evidence: "Screenshots of the fake account and your real one.",
      support: "Instagram prioritizes impersonation reports.",
    },
    "X (Twitter)": {
      platformAction:
        'Report @username → "It\'s impersonating me" → Provide proof.',
      evidence: "Link to your real account and screenshots of the fake one.",
      support: "X verifies impersonation claims and removes accounts quickly.",
    },
    Email: {
      immediate: [
        "Check if your email is being used to reset accounts on other platforms.",
      ],
      platformAction:
        "Contact your email provider and file a compromised account report.",
      evidence: "Screenshots of where your email is being used.",
      support:
        "Enable 2FA on all accounts and file an identity theft report with the FTC.",
    },
  },

  "Morphing / Transmogrification": {
    default: {
      immediate: [
        "Do not share the manipulated images further (that spreads them).",
        "Save the original images as evidence.",
        "Contact platforms where the morphed images are posted.",
      ],
      platformAction:
        'Report as "Manipulated media" or "Non-consensual intimate image" depending on the platform.',
      evidence:
        "Screenshots of the morphed images, timestamps, and the original photos for comparison.",
      support:
        "Many jurisdictions have laws against non-consensual image morphing. Consider consulting a lawyer or contacting your local law enforcement.",
    },
    Facebook: {
      platformAction:
        'Report the image → "It\'s non-consensual intimate imagery" or "It\'s misleading" → Submit.',
      evidence: "Images and account information.",
      support:
        "Facebook removes non-consensual intimate images; report the account as well.",
    },
    Instagram: {
      platformAction:
        'Report the post → "It\'s intimate images shared without consent" → Submit.',
      evidence: "Screenshots of the post and perpetrator.",
      support:
        "Instagram has a dedicated team for this; removal is often swift.",
    },
    TikTok: {
      platformAction:
        'Report the video → "Abuse or harassment" or "Sexual content" → Submit.',
      evidence: "Video screenshots.",
      support: "TikTok prohibits manipulated intimate imagery.",
    },
  },

  "Non-consensual dissemination": {
    default: {
      immediate: [
        "Stop sharing or downloading the images immediately.",
        "Do not contact the perpetrator.",
        "Document where the images are posted (screenshots with timestamps).",
      ],
      platformAction:
        'Report as "Non-consensual intimate imagery" on every platform where it appears.',
      evidence: "Screenshots of posts, profile information, timestamps, URLs.",
      support:
        'File a police report immediately. Many jurisdictions have "revenge porn" laws. Contact the Cyber Civil Rights Initiative (cybercivilrights.org) for support.',
    },
    Facebook: {
      platformAction:
        'Report the image → "It\'s non-consensual intimate imagery" → Submit. Block the account.',
      evidence: "Image and profile screenshots.",
      support:
        "Facebook removes non-consensual imagery; account may be banned.",
    },
    Instagram: {
      platformAction:
        'Report the post → "It\'s intimate images shared without consent" → Submit.',
      evidence: "Post and profile screenshots.",
      support:
        "Instagram has legal teams dedicated to this. Removal is usually swift.",
    },
    "X (Twitter)": {
      platformAction:
        'Report the tweet → "It\'s abusive or harmful" → "It\'s non-consensual intimate media" → Submit.',
      evidence: "Tweet and profile info.",
      support: "X has a policy against non-consensual intimate content.",
    },
    Reddit: {
      platformAction:
        'Report to r/admins and report the post → "It\'s involuntary pornography" → Submit.',
      evidence: "Post screenshots and user info.",
      support:
        "Reddit has banned communities dedicated to non-consensual content.",
    },
    WhatsApp: {
      immediate: [
        "Block the contact. Export the chat as evidence before deleting.",
      ],
      platformAction:
        "WhatsApp does not have active moderation, but law enforcement can request chat records.",
      evidence: "Exported chat conversation.",
      support: "File a police report with the evidence.",
    },
  },

  "Online grooming": {
    default: {
      immediate: [
        "Do not respond to further messages.",
        "Do not delete the messages; save them as evidence.",
        "Block the account immediately.",
        "If you are a minor, tell a trusted adult immediately.",
      ],
      platformAction:
        'Report the account to the platform\'s trust & safety team as "Grooming" or "Child Safety Concern".',
      evidence:
        "Screenshots of all conversations, account information, timestamps.",
      support:
        "Contact the National Center for Missing & Exploited Children (NCMEC at CyberTipline.org) or local law enforcement immediately.",
    },
    Facebook: {
      platformAction:
        'Report the conversation → "It\'s something else" → Explain grooming concern. Also report the account.',
      evidence: "Full conversation screenshots.",
      support:
        "Facebook escalates grooming reports to NCMEC and law enforcement.",
    },
    Instagram: {
      platformAction:
        'Report the account → "Suspicious behavior" or "I think my account was hacked" → Mention grooming.',
      evidence: "DM screenshots and profile info.",
      support: "Instagram has dedicated teams for child safety.",
    },
    Discord: {
      platformAction:
        'Report the user → "Grooming" or "Child Safety" → Submit to Discord Trust & Safety.',
      evidence: "Message screenshots and user profile.",
      support:
        "Discord takes grooming very seriously; reports may result in account ban and law enforcement notification.",
    },
    "Gaming platforms": {
      platformAction:
        'Report the player/account → Select "Predatory Behavior" or "Child Safety Concern".',
      evidence: "Chat logs, usernames, server/game info.",
      support:
        "Most gaming platforms have child safety policies and report to authorities.",
    },
  },

  "Online sexual harassment & bullying": {
    default: {
      immediate: [
        "Block the person on all platforms.",
        "Do not respond to harassing messages.",
        "Make your account private; review followers for fake accounts.",
      ],
      platformAction:
        "Report the account/content as harassment or sexual content, depending on the nature.",
      evidence:
        "Screenshots of harassing messages, posts, comments, and profile info. Document the pattern and timeline.",
      support:
        "Contact HeartMob (iheartmob.org) for support from advocates. File a police report if the harassment is severe or threatening.",
    },
    Facebook: {
      platformAction:
        'Report the message/post → "It\'s harassment" → Submit. Block and restrict the account.',
      evidence: "Screenshots of harassing content.",
      support:
        "Use Facebook's block and mute features. Consider reporting the account for repeated violations.",
    },
    Instagram: {
      platformAction:
        'Report the message/comment → "It\'s harassment" → Submit. Block the account.',
      evidence: "DM and comment screenshots.",
      support:
        "Restrict or block the account. Make your profile private if needed.",
    },
    "X (Twitter)": {
      platformAction:
        'Report the tweet → "It\'s abusive or harmful" → "It\'s harassment or bullying" → Submit.',
      evidence: "Tweet and profile screenshots. Screenshot the thread.",
      support:
        "X has anti-harassment policies. Reports may result in account suspension.",
    },
    TikTok: {
      platformAction:
        'Report the comment/account → "Harassment or bullying" → Submit.',
      evidence: "Comment and user profile screenshots.",
      support: "Disable comments on videos if needed. Report users repeatedly.",
    },
    Discord: {
      platformAction:
        'Report the message → "Harassment" → Submit to server mods and Discord Trust & Safety.',
      evidence: "Message and user screenshots.",
      support:
        "Leave the server if harassment continues. Report the server if the community allows it.",
    },
    "Gaming platforms": {
      platformAction:
        'Report the player → "Harassment" or "Hate speech" → Submit.',
      evidence: "Chat logs and usernames.",
      support: "Mute or block the player. Report repeated offenders.",
    },
  },

  "Online threats & blackmail": {
    default: {
      immediate: [
        "Do not engage with or respond to threats.",
        "Preserve all evidence (do not delete).",
        "Contact local law enforcement immediately if you feel physically threatened.",
      ],
      platformAction:
        'Report the account as "Threatening violence" or "Blackmail" to the platform.',
      evidence:
        "Full screenshot of threat/blackmail message, sender profile, timestamps. Consider screen recording.",
      support:
        "File a police report. Many jurisdictions treat online threats as serious crimes. Contact the FBI if threats involve federal crimes (e.g., extortion).",
    },
    Facebook: {
      platformAction:
        'Report the message/post → "It\'s a threat" or "It\'s extortion" → Submit. Block immediately.',
      evidence: "Full message screenshots.",
      support: "Facebook escalates serious threats to law enforcement.",
    },
    "X (Twitter)": {
      platformAction:
        'Report the tweet → "It\'s abusive or harmful" → "It\'s expressing intent to harm" → Submit.',
      evidence: "Tweet screenshots and profile.",
      support:
        "X has specialized teams for threats; reports may result in immediate suspension.",
    },
    Email: {
      immediate: [
        "Do not respond. Mark as spam/phishing. Preserve the email with headers.",
      ],
      platformAction: "Report to your email provider as phishing or threats.",
      evidence: "Full email headers and content.",
      support:
        "Forward to law enforcement (FBI for federal crimes, local police for threats).",
    },
    WhatsApp: {
      immediate: ["Block the contact. Export the conversation as evidence."],
      platformAction:
        "WhatsApp does not have active moderation, but law enforcement can request records.",
      evidence: "Exported chat with full threat messages.",
      support: "File a police report with the exported evidence.",
    },
  },

  Sextortion: {
    default: {
      immediate: [
        "Do NOT pay or respond to demands.",
        "Do NOT send additional images or videos.",
        "Block the account and do not engage further.",
        "File a police report immediately.",
      ],
      platformAction:
        'Report the account as "Sextortion" or "Blackmail" to the platform.',
      evidence:
        "Screenshots of demands, profile information, timestamps. Do NOT share the intimate images unless to law enforcement.",
      support:
        "Contact the FBI Internet Crime Complaint Center (IC3.gov) and local law enforcement immediately. Many sextortionists target multiple victims; your report helps authorities.",
    },
    Facebook: {
      platformAction:
        'Report → "It\'s extortion or blackmail" → Submit. Block the account.',
      evidence: "Threat messages and profile info (not the images themselves).",
      support: "Facebook escalates sextortion to law enforcement.",
    },
    Instagram: {
      platformAction: 'Report the account → "It\'s extortion" → Submit.',
      evidence: "DM screenshots of demands.",
      support: "Instagram works with law enforcement on sextortion cases.",
    },
    Email: {
      immediate: [
        "Do not respond. Mark as spam. Report to your email provider.",
      ],
      platformAction:
        "Forward the extortion email to the FBI (ic3complaint@ic3.gov).",
      evidence: "Full email with headers.",
      support:
        "File a report with IC3.gov and local law enforcement. Many sextortion emails are sent in bulk; you are likely not the target.",
    },
    Discord: {
      platformAction:
        'Report the user → "Grooming" or "Sextortion" → Submit to Discord and law enforcement.',
      evidence: "Message screenshots.",
      support: "Discord cooperates with law enforcement. File a report.",
    },
  },

  Sexploitation: {
    default: {
      immediate: [
        "Do not download or share the exploitative content.",
        "Block the creator/distributor immediately.",
        "Collect all evidence (screenshots, links, timestamps).",
      ],
      platformAction:
        'Report as "Child Sexual Abuse Material" (CSAM) or "Non-consensual intimate imagery" to the platform.',
      evidence:
        "Screenshots of the content (without the explicit material itself), URLs, profile info, timestamps.",
      support:
        "Contact NCMEC (CyberTipline.org) immediately if minors are involved. File a police report. Consult a lawyer if you need advice on your rights.",
    },
    "All platforms": {
      platformAction:
        "Report to the platform as exploitation. Also report to NCMEC if minors are involved.",
      evidence: "Report details and profile information.",
      support:
        "Law enforcement can obtain content from platforms with a warrant.",
    },
  },

  "Zoom bombing": {
    default: {
      immediate: [
        "End the meeting immediately if content is obscene or threatening.",
        "Do not click any links the intruder shares.",
        "Document the username or ID of the intruder if possible.",
      ],
      platformAction:
        "Report to Zoom support with the meeting ID, date/time, and description of the disruption.",
      evidence:
        "Screenshot of the disruptor's username or profile picture. Note the exact time of the incident.",
      support:
        "Enable waiting rooms and require passwords for future meetings. Zoom may investigate and ban repeat offenders.",
    },
    Zoom: {
      immediate: [
        "Remove the disruptor from the meeting. Lock the meeting if more intruders arrive.",
      ],
      platformAction:
        'Report to Zoom → Support portal → "Report Abuse" with meeting ID and timestamp.',
      evidence: "Disruptor's username/ID and meeting password (if applicable).",
      support:
        "Use waiting rooms, password-protect meetings, and limit screen sharing permissions.",
    },
    "Google Meet": {
      immediate: ["Remove the participant. End the meeting if needed."],
      platformAction: "Report to Google via the meeting safety features.",
      evidence: "Participant information and timestamps.",
      support:
        "Enable security features: require sign-in and limit meeting access.",
    },
    "Microsoft Teams": {
      immediate: ["Remove the user from the meeting. Lock the meeting."],
      platformAction: "Report to Microsoft Teams admin and security team.",
      evidence: "Participant name and timestamps.",
      support:
        "Use password-protected or private meetings; lock calls when all participants are present.",
    },
  },

  Other: {
    default: {
      immediate: [
        "Document what happened as clearly as possible.",
        "Block the user if applicable.",
        "Preserve all evidence (screenshots, messages, URLs).",
      ],
      platformAction:
        'Report to the platform using their general "Abuse" or "Inappropriate Content" option. Describe the incident in detail.',
      evidence:
        "Screenshots with timestamps, URLs, usernames, and profile information.",
      support:
        "If the incident involves threats or illegal activity, file a police report. Consider consulting legal advice if you believe a crime was committed.",
    },
  },
};

import amLocale from "../locales/am.json";

// Helper function to get personalized guidance
export function getPersonalizedGuidance(categories, platform, lang = "en") {
  const result = {
    abusesAffected: [],
    sections: {},
    platformHelp: null,
  };

  // If no categories selected, show generic guidance
  if (!categories || categories.length === 0) {
    result.abusesAffected.push("General Guidance");
    const generic = guidanceDB["Other"].default;
    result.sections.generic = {
      immediate: generic.immediate,
      platformAction: generic.platformAction,
      evidence: generic.evidence,
      support: generic.support,
    };
    return result;
  }

  // For each selected category, fetch guidance
  categories.forEach((category) => {
    const categoryData = guidanceDB[category];
    if (categoryData) {
      result.abusesAffected.push(category);

      // If Amharic requested and available, use translations from amLocale.guidance
      if (
        lang === "am" &&
        amLocale &&
        amLocale.guidance &&
        amLocale.guidance[category]
      ) {
        const amCat = amLocale.guidance[category];
        // prefer platform-specific in Amharic, otherwise default
        const platformSpecific = amCat[platform] || amCat.default || amCat;
        result.sections[category] = platformSpecific;
      } else {
        // Get platform-specific guidance if available, otherwise use default (English)
        const platformSpecific = categoryData[platform] || categoryData.default;
        result.sections[category] = platformSpecific;
      }
    }
  });

  // If no guidance found for categories, return generic
  if (result.abusesAffected.length === 0) {
    result.abusesAffected.push("General Guidance");
    const generic = guidanceDB["Other"].default;
    result.sections.generic = {
      immediate: generic.immediate,
      platformAction: generic.platformAction,
      evidence: generic.evidence,
      support: generic.support,
    };
  }

  // Attach platform-level guidance if available (localized if possible)
  if (platform) {
    let p = platformGuidance[platform] || platformGuidance["Other"];
    if (
      lang === "am" &&
      amLocale &&
      amLocale.platformGuidance &&
      amLocale.platformGuidance[platform]
    ) {
      p = amLocale.platformGuidance[platform];
    }
    result.platformHelp = p;
  }

  return result;
}

// Platform-level guidance (general features & quick steps each platform provides)
export const platformGuidance = {
  Facebook: {
    name: "Facebook",
    steps: [
      'Use the three-dot menu on posts or comments to "Report" and follow the prompts for harassment or hate speech.',
      'Block or Unfriend the account; use "Restrict" to limit interactions without notifying the other person.',
      "Adjust who can comment or see your posts via Settings → Privacy; consider making your account private.",
    ],
    note: "Facebook also provides a Safety Center with step-by-step help and escalation for repeated violations.",
  },
  Instagram: {
    name: "Instagram",
    steps: [
      'Tap the post or comment → "Report" → choose the reason (harassment, hate speech, non-consensual content).',
      'Use "Restrict" or "Block" on accounts that harass you.',
      "Set your profile to private and limit who can comment via Settings → Privacy.",
    ],
    note: "Instagram supports reporting DMs and has specialized flows for non-consensual intimate imagery.",
  },
  WhatsApp: {
    name: "WhatsApp",
    steps: [
      'Long-press the message → "Report" and then block the contact.',
      "Export chats (Settings → Chats → Export Chat) if you need to preserve evidence for law enforcement.",
      "Enable privacy settings for profile photo, last seen, and about to limit who can see your info.",
    ],
    note: "WhatsApp moderation is limited; for serious threats involve local law enforcement.",
  },
  "X (Twitter)": {
    name: "X (Twitter)",
    steps: [
      'Click the "..." menu on a Tweet → "Report Tweet" → choose the relevant reason and follow prompts.',
      "Use block and mute to stop further contact.",
      "Collect permalinks and screenshots as evidence.",
    ],
    note: "X has specialized trust & safety teams for harassment and doxing reports.",
  },
  Discord: {
    name: "Discord",
    steps: [
      "Report users or messages to Trust & Safety via the report flow (you may need message links and server IDs).",
      "Leave or mute servers that allow harassment; contact server admins if safe to do so.",
      "Screenshot messages and capture server/time details.",
    ],
    note: "Discord support can act on servers that tolerate violent or sexual harassment.",
  },
  Email: {
    name: "Email",
    steps: [
      "Preserve full email headers and content; forward evidence to your provider's abuse address (abuse@provider.com) if applicable.",
      "Mark phishing or threats and do not reply.",
      "Consider changing passwords and enabling 2FA if you suspect a breach.",
    ],
    note: "Email providers have abuse teams that can investigate phishing and compromised accounts.",
  },
  "Gaming platform": {
    name: "Gaming platform",
    steps: [
      "Use in-game report features to flag abusive players or messages.",
      "Collect player IDs, server names, or match details as evidence.",
      "Use block/mute features and adjust chat/privacy settings.",
    ],
    note: "Game publishers often have conduct teams that will ban repeat offenders.",
  },
  "Dating app": {
    name: "Dating app",
    steps: [
      "Report and block profiles that harass or threaten you.",
      "Do not share personal contact details; move conversations to the app-only until you trust someone.",
      "Take screenshots of threats and profile information.",
    ],
    note: "Dating apps usually have clear reporting flows and privacy controls; use them early.",
  },
  TikTok: {
    name: "TikTok",
    steps: [
      'Tap the share icon on a video or long-press a comment → "Report" → choose the reason (harassment, hate speech, non-consensual content).',
      "Use privacy settings (who can comment/duet) and block offending users.",
      "Record video timestamps and usernames for evidence.",
    ],
    note: "TikTok has reporting flows and moderation for harassment and non-consensual content.",
  },
  Other: {
    name: "Other",
    steps: [
      'Use the platform\'s general "Report" or "Abuse" flow and document what you select.',
      "Use privacy and block/mute controls where available.",
      "Preserve screenshots, permalinks, and timestamps.",
    ],
    note: "If unsure, escalate to law enforcement for threats or illegal content.",
  },
};

export default guidanceDB;
