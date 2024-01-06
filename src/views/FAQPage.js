import React, { useState } from "react";
import "../styles.css";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import { Colors } from "../Colors";

const faqData = [
  {
    question: "What do I need to rent a car?",
    answer: (
      <ul>
        <li>Your voucher / eVoucher, to show that you've paid for the car.</li>
        <li>
          The main driver's credit / debit card, with enough available funds for
          the car's deposit.
        </li>
        <li>
          Each driver's full, valid driving licence, which they've held for at
          least 12 months (often 24).
        </li>
        <li>
          Your passport and any other ID the car hire company needs to see.
        </li>
      </ul>
    ),
  },
  {
    question: "How old do I have to be rent a car?",
    answer: (
      <p>
        For most car rental companies, the age requirement is between 21 and 70
        years old. If you're under 25 or over 70, you might have to pay an
        additional fee.
      </p>
    ),
  },
  {
    question: "Can I book a rental car for someone else?",
    answer: (
      <p>
        Yes, as long as they meet these requirements. Just fill in their details
        while you're making the reservation.
      </p>
    ),
  },
  {
    question: "What should I look for when I'm choosing a car?",
    answer: (
      <ul>
        <li>
          Space: You'll enjoy your rental far more if you choose a car with
          plenty of room for your passengers and luggage.
        </li>
        <li>
          Fuel policy: Not planning on driving much? A Like for like fuel policy
          can save you a lot of money.
        </li>
        <li>
          Location: You can't beat an 'on-airport' pick-up for convenience, but
          an 'off-airport' pick-up with a shuttle bus can be much cheaper.
        </li>
      </ul>
    ),
  },
  {
    question: "Are all fees included in rental price?",
    answer: (
      <p>
        The vast majority of our rentals include Theft Protection, Collision
        Damage Waiver (CDW), local taxes, airport surcharges and any road fees.
        You'll pay for any ‘extras' when you pick your car up, along with any
        young driver, additional driver or one-way fees – but we'll explain any
        additional costs before you book your car (and taking your own child
        seats or GPS can be an easy way to reduce your costs).
      </p>
    ),
  },
];

function FAQPage() {
  return (
    <div className="faqstyling">
      <img src="/sb5.png" alt="Arka Plan" className="background-image" />
      <div
        style={{
          display: "flex",
          width: "30%",
          height: "auto",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          className="slide-in"
          style={{
            marginBottom: "20px",
            position: "relative", // position özelliği z-index ile birlikte kullanılmalı
            zIndex: 2, // Diğer elementlerden yüksek bir z-index değeri
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            marginBottom: "20px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Frequently Asked Questions
        </Typography>

        {faqData.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;
