/**
 * Central contact + lead-capture configuration.
 * See docs/google-form-setup.md for how to create the Google Form and fill in the IDs below.
 */
export const CONTACT = {
  salesEmail: 'Sales@zigoholidays.com',
  infoEmail: 'info@zigoholidays.com',
  phoneDisplay: '+91 8970034810',
  phoneTel: '+918970034810',
  whatsappNumber: '918970034810'
};

export const GOOGLE_FORM = {
  /** e.g. https://docs.google.com/forms/d/e/<FORM_ID>/formResponse (leave empty until the form exists) */
  actionUrl: '',
  /** Google Form question ids, e.g. 'entry.1234567890' */
  entries: {
    fullName: '',
    phone: '',
    email: '',
    trip: '',
    departureCity: '',
    travelMonth: '',
    guests: '',
    requirements: ''
  }
};
