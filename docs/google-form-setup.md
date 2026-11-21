# Booking enquiries → Google Form → Sales@ and info@

The website posts every "Get your trip customized" / booking enquiry to a Google Form.
A small Apps Script on that form emails each response to **Sales@zigoholidays.com** and **info@zigoholidays.com**.

## 1. Create the form
Create a Google Form (signed in as the account that should own the data) with these **Short answer** questions
(use "Paragraph" for the last one): 

1. Full Name
2. Phone
3. Email
4. Trip (package or destination)
5. Departure City
6. Travel Month
7. Guests
8. Requirements

## 2. Get the form URL and entry IDs
1. Click the ⋮ menu → **Get pre-filled link**. Type any text in every question and click **Get link**.
2. Paste the link somewhere. It looks like
   `https://docs.google.com/forms/d/e/<FORM_ID>/viewform?usp=pp_url&entry.111=...&entry.222=...`
3. The action URL is `https://docs.google.com/forms/d/e/<FORM_ID>/formResponse`.
4. Each `entry.NNN` is the id of the question in the order you typed them.

Fill these into [`src/app/config/contact.config.ts`](../src/app/config/contact.config.ts) (`GOOGLE_FORM`).

## 3. Email both addresses on each response
In the form: ⋮ → **Script editor**, paste, save, then run `setup` once and approve the permissions.

```js
const RECIPIENTS = 'Sales@zigoholidays.com,info@zigoholidays.com';

function setup() {
  ScriptApp.newTrigger('onSubmit')
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();
}

function onSubmit(e) {
  const rows = e.response.getItemResponses()
    .map(r => r.getItem().getTitle() + ': ' + r.getResponse());
  MailApp.sendEmail({
    to: RECIPIENTS,
    subject: 'New trip enquiry - ' + (rows[0] || ''),
    body: rows.join('\n')
  });
}
```

Responses are also kept in the form's **Responses** tab / linked Google Sheet.

Notes: Google Forms does not return a readable response to browser requests, so the site treats a sent request as success.
Until `actionUrl` is filled in, the site still opens WhatsApp / mail links but does not store the lead.
